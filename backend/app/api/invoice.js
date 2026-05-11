const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const { URL } = require("../url");
const invoiceTable = require("../tables/invoiceTable");

const router = new Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../assets"));
  },
  filename: function (req, file, cb) {
    cb(null, "invoice-" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: { fieldSize: 2 * 1024 * 1024 },
});

router.post("/insert", upload.single("imageFile"), (req, res, next) => {
  const { cargo_admin_id, user_code, package_id, text } = req.body;

  let image = null;
  if (req.file) {
    image = URL + "/static/" + req.file.filename;
  }

  invoiceTable
    .insert({ cargo_admin_id, user_code, package_id, text, image })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.post("/update", upload.single("imageFile"), (req, res, next) => {
  const { id, text } = req.body;

  let image = null;
  if (req.file) {
    image = URL + "/static/" + req.file.filename;
  } else {
    image = req.body.image;
  }

  invoiceTable
    .update({ id, text, image })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.get("/byUserCode/:userCode/getAll", (req, res, next) => {
  const { userCode } = req.params;

  invoiceTable
    .getAllByUserCode({ userCode })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getByPackageID/:packageID", (req, res, next) => {
  const { packageID } = req.params;

  invoiceTable
    .getByPackageID({ packageID })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getByID/:id", (req, res, next) => {
  const { id } = req.params;

  invoiceTable
    .getByID({ id })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  invoiceTable
    .delete({ id })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

module.exports = router;
