const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const { URL } = require("../url");
const { hash } = require("./accountsHelper");

const AccountsTable = require("../tables/accountsTable");
const PartnerTable = require("../tables/partnerTable");
const PartnerCrossRoadTable = require("../tables/partnerCrossRoadTable");
const PartnerRateTable = require("../tables/partnerRateTable");
const TransportTable = require("../tables/transportTable");

const router = new Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../assets"));
  },
  filename: function (req, file, cb) {
    cb(null, "partner-" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: { fieldSize: 2 * 1024 * 1024 },
});

router.post("/insert", upload.single("imageFile"), (req, res, next) => {
  const {
    aFirstname,
    aLastname,
    aPhone_number,
    aEmail,

    company_register,
    address,
    certificate_date,
    trans_number,
    start_zone,
    passed_zone,
    end_zone,
    online_storage,
    online_activity,
    air_pack_type,
    admin_position,
    air_trans_company,
    trans_type,
    suggest_service,

    express_type_id,
    name,
    email,
    phone,
    web,
    addition,
  } = req.body;

  const password = hash(aPhone_number);

  let cerIMG = null;
  let transIMG = null;

  let image = null;
  if (req.file) {
    image = URL + "/static/" + req.file.filename;
  }

  if (express_type_id === "1") {
    cerIMG = image;
  } else {
    transIMG = image;
  }

  PartnerTable.addCargoAdmin({
    aFirstname,
    aLastname,
    aPhone_number,
    aEmail,
    password,
  })
    .then(({ adminID }) => {
      PartnerTable.insertSub({
        company_register,
        address,
        certificate_date,
        cerIMG,
        trans_number,
        transIMG,
        start_zone,
        passed_zone,
        end_zone,
        online_storage,
        online_activity,
        air_pack_type,
        admin_position,
        air_trans_company,
        trans_type,
        suggest_service,
      })
        .then(({ subInfoID }) => {
          PartnerTable.insert({
            adminID,
            subInfoID,
            express_type_id,
            name,
            email,
            phone,
            web,
            addition,
          })
            .then(() => {
              PartnerRateTable.insert({
                adminID,
                rate: 0,
                total_rate: 0,
                total_people: 0,
              })
                .then(({ message }) => {
                  res.json({ message });
                })
                .catch((error) => next(error));
            })
            .catch((error) => {
              AccountsTable.delete({ id: adminID })
                .then(() => {
                  next(
                    `Байгууллага нэмэгдэхэд алдаа гарсан тул Админийг устгалаа!(mainInfo) \n\t[${error}]`
                  );
                })
                .catch((error) => next(error));

              PartnerTable.deleteSubInfo({ subInfoID }).then(() => {
                next(
                  `Байгууллага нэмэгдэхэд алдаа гарсан тул Нэмэлт мэдээллийг устгалаа! \n\t[${error}]`
                );
              });
            });
        })
        .catch((error) => {
          AccountsTable.delete({ id: adminID })
            .then(() => {
              next(
                `Байгууллага нэмэгдэхэд алдаа гарсан тул Админийг устгалаа!(subInfo) \n\t[${error}]`
              );
            })
            .catch((error) => next(error));
        });
    })
    .catch((error) => next(error));
});

router.post("/update", upload.single("imageFile"), (req, res, next) => {
  const {
    main_id,
    cargo_admin_id,
    sub_info_id,
    express_type_id,

    firstname,
    lastname,
    phone_number,
    admin_email,

    company_register,
    address,
    certificate_date,
    certificate_image,
    trans_image,
    trans_number,
    start_zone,
    passed_zone,
    end_zone,
    online_storage,
    online_activity,
    air_pack_type,
    admin_position,
    air_trans_company,
    trans_type,
    suggest_service,

    name,
    email,
    phone,
    web,
    addition,
  } = req.body;

  let cerDate = null;
  if (certificate_date === "0") {
    cerDate = null;
  } else {
    cerDate = certificate_date;
  }

  let cerIMG = null;
  let transIMG = null;

  let imgFile = null;
  if (req.file) {
    imgFile = URL + "/static/" + req.file.filename;
  }

  if (express_type_id === "1") {
    if (imgFile) {
      cerIMG = imgFile;
    } else {
      cerIMG = certificate_image === "0" ? null : certificate_image;
    }
  } else {
    if (imgFile) {
      transIMG = imgFile;
    } else {
      transIMG = trans_image === "0" ? null : trans_image;
    }
  }

  PartnerTable.updateCargoAdmin({
    admin_id: cargo_admin_id,
    firstname,
    lastname,
    phone_number,
    admin_email,
  })
    .then(({ message }) => {
      if (message === "success") {
        PartnerTable.updateSub({
          sub_info_id,
          company_register,
          address,
          certificate_date: cerDate,
          cerIMG,
          trans_number,
          transIMG,
          start_zone,
          passed_zone,
          end_zone,
          online_storage,
          online_activity,
          air_pack_type,
          admin_position,
          air_trans_company,
          trans_type,
          suggest_service,
        })
          .then(({ message }) => {
            if (message === "success") {
              PartnerTable.update({
                id: main_id,
                name,
                email,
                phone,
                web,
                addition,
              })
                .then(({ message }) => {
                  if (message) {
                    res.json({ message });
                  } else {
                    next("ERROR [Update main info]");
                  }
                })
                .catch((error) => next(error));
            } else {
              next("ERROR [Update subinfo]");
            }
          })
          .catch((error) => next(error));
      } else {
        next("ERROR [Update admin]");
      }
    })
    .catch((error) => next(error));
});

router.get("/requested/:eTypeID/getAll", (req, res, next) => {
  const { eTypeID } = req.params;

  PartnerTable.getRequestedAll({ eTypeID })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/confirmed/getAll", (req, res, next) => {
  PartnerTable.getConfirmedAll()
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getByID/:id", (req, res, next) => {
  const { id } = req.params;

  PartnerTable.getByID({ id })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getByCargoAdminID/:adminID", (req, res, next) => {
  const { adminID } = req.params;

  PartnerCrossRoadTable.getByCargoAdminID({ adminID })
    .then((crossRes) => {
      if (crossRes) {
        res.json(crossRes);
      } else {
        PartnerTable.getByCargoAdminID({ adminID })
          .then((response) => res.json(response))
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
});

router.get("/getExpressType", (req, res, next) => {
  PartnerTable.getExpressType()
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.post("/partnerConfirm", (req, res, next) => {
  const { id } = req.body;

  PartnerTable.partnerConfirm({ id })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.post("/uploadCompanyPDF", upload.single("pdfFile"), (req, res, next) => {
  const { adminID, profile } = req.body;

  let pdf = null;
  if (req.file) {
    pdf = URL + "/static/" + req.file.filename;
  } else {
    pdf = profile;
  }

  PartnerTable.uploadCompanyPDF({ adminID, pdf })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});
router.post("/removeCompanyPDF", (req, res, next) => {
  const { adminID } = req.body;

  PartnerTable.removeCompanyPDF({ adminID })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

router.post(
  "/cr/uploadCompanyPDF",
  upload.single("pdfFile"),
  (req, res, next) => {
    const { adminID, profile } = req.body;

    let pdf = null;
    if (req.file) {
      pdf = URL + "/static/" + req.file.filename;
    } else {
      pdf = profile;
    }

    PartnerCrossRoadTable.uploadCompanyPDF({ adminID, pdf })
      .then(({ message }) => {
        res.json({ message });
      })
      .catch((error) => next(error));
  }
);
router.post("/cr/removeCompanyPDF/", (req, res, next) => {
  const { adminID } = req.body;

  PartnerCrossRoadTable.removeCompanyPDF({ adminID })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  PartnerTable.getByID({ id })
    .then((infos) => {
      const adminID = infos.cargo_admin_id;
      const subInfoID = infos.sub_info_id;

      TransportTable.getAllByAdminID({ adminID })
        .then((transData) => {
          if (transData.length > 0) {
            res.json({ message: "ERROR [Have a transport]" });
            next("ERROR [Have a transport]");
          } else {
            PartnerTable.delete({ id })
              .then(({ message }) => {
                if (message === "success") {
                  PartnerTable.deleteSubInfo({ subInfoID })
                    .then(({ message }) => {
                      if (message === "success") {
                        PartnerRateTable.deleteByAdminID({ adminID })
                          .then(({ message }) => {
                            if (message) {
                              AccountsTable.delete({ id: adminID })
                                .then(({ message }) => res.json({ message }))
                                .catch((error) => next(error));
                            } else {
                              res.json({ message: "ERROR [delete rate]" });
                              next("ERROR [delete rate]");
                            }
                          })
                          .catch((error) => next(error));
                      } else {
                        res.json({ message: "ERROR [delete subinfo]" });
                        next("ERROR [delete subinfo]");
                      }
                    })
                    .catch((error) => next(error));
                } else {
                  res.json({ message: "ERROR [delete main info]" });
                  next("ERROR [delete main info]");
                }
              })
              .catch((error) => next(error));
          }
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

module.exports = router;
