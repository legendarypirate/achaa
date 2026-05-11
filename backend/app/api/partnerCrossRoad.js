const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const { URL } = require("../url");
const { hash } = require("./accountsHelper");

const AccountsTable = require("../tables/accountsTable");
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

    insurance,
    head_number,
    ass_number,
    trans_mark,
    tonnage,
    storage,
    ass_length,
    ass_width,
    start_zone,
    passed_zone,
    end_zone,
    addition,
  } = req.body;

  const password = hash(aPhone_number);

  let transIMG = null;
  if (req.file) {
    transIMG = URL + "/static/" + req.file.filename;
  }

  PartnerCrossRoadTable.addCargoAdmin({
    aFirstname,
    aLastname,
    aPhone_number,
    aEmail,
    password,
  })
    .then(({ adminID }) => {
      PartnerCrossRoadTable.insert({
        adminID,
        insurance,
        head_number,
        ass_number,
        trans_mark,
        storage,
        ass_length,
        ass_width,
        start_zone,
        passed_zone,
        end_zone,
        transIMG,
        addition,
        trans_type: JSON.parse(req.body.trans_type)[0],
        tonnage,
      })
        .then(() => {
          PartnerRateTable.insert({
            adminID,
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
                `Байгууллага нэмэгдэхэд алдаа гарсан тул Админийг устгалаа! \n\t[${error}]`
              );
            })
            .catch((error) => next(error));
        });
    })
    .catch((error) => next(error));
});

router.post("/update", upload.single("imageFile"), (req, res, next) => {
  const {
    cargo_admin_id,
    firstname,
    lastname,
    phone_number,
    admin_email,

    id,
    insurance,
    head_number,
    ass_number,
    trans_mark,
    storage,
    ass_length,
    ass_width,
    start_zone,
    passed_zone,
    end_zone,
    addition,
    trans_type,
    trans_image,
    tonnage,
  } = req.body;

  let transIMG = null;
  if (req.file) {
    transIMG = URL + "/static/" + req.file.filename;
  } else {
    transIMG = trans_image === "0" ? null : trans_image;
  }

  PartnerCrossRoadTable.updateCargoAdmin({
    admin_id: cargo_admin_id,
    firstname,
    lastname,
    phone_number,
    admin_email,
  })
    .then(({ message }) => {
      if (message === "success") {
        PartnerCrossRoadTable.update({
          id,
          insurance,
          head_number,
          ass_number,
          trans_mark,
          storage,
          ass_length,
          ass_width,
          start_zone,
          passed_zone,
          end_zone,
          addition,
          trans_type,
          transIMG,
          tonnage,
        })
          .then(({ message }) => {
            if (message) {
              res.json({ message });
            } else {
              next("ERROR [Update info]");
            }
          })
          .catch((error) => next(error));
      } else {
        next("ERROR [Update admin]");
      }
    })
    .catch((error) => next(error));
});

router.get("/requested/getAll", (req, res, next) => {
  PartnerCrossRoadTable.getRequestedAll()
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/confirmed/getAll", (req, res, next) => {
  PartnerCrossRoadTable.getConfirmedAll()
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getByID/:id", (req, res, next) => {
  const { id } = req.params;

  PartnerCrossRoadTable.getByID({ id })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getByAdminID/:adminID", (req, res, next) => {
  const { adminID } = req.params;

  PartnerCrossRoadTable.getByAdminID({ adminID })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.post("/partnerConfirm", (req, res, next) => {
  const { id } = req.body;

  PartnerCrossRoadTable.partnerConfirm({ id })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  PartnerCrossRoadTable.getByID({ id })
    .then((infos) => {
      const adminID = infos.cargo_admin_id;

      TransportTable.getAllByAdminID_CR({ adminID })
        .then((transData) => {
          if (transData.length > 0) {
            res.json({ message: "ERROR [Have a transport]" });
            next("ERROR [Have a transport]");
          } else {
            PartnerCrossRoadTable.delete({ id })
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
                  res.json({ message: "ERROR [delete info]" });
                  next("ERROR [delete info]");
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
