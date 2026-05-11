const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const { URL } = require("../url");
const introBannerTable = require("../tables/introBannerTable");

const router = new Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../assets"));
  },
  filename: function (req, file, cb) {
    cb(null, "introBanner-" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: { fieldSize: 2 * 1024 * 1024 },
});

router.post("/insert", upload.single("file"), (req, res, next) => {
  const { type } = req.body;

  let file_url = null;
  if (req.file) {
    file_url = URL + "/static/" + req.file.filename;
  } else {
    file_url = req.body.fileURL;
  }

  introBannerTable
    .insert({ type, file_url })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.post("/update", upload.single("file"), (req, res, next) => {
  const { type } = req.body;

  let file_url = null;
  if (req.file) {
    file_url = URL + "/static/" + req.file.filename;
  } else {
    file_url = req.body.fileURL;
  }

  introBannerTable
    .update({ type, file_url })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.get("/getByType/:type", (req, res, next) => {
  const { type } = req.params;

  introBannerTable
    .getByType({ type })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  introBannerTable
    .delete({ id })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

module.exports = router;
