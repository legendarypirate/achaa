const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const PublicityTable = require("../tables/publicityTable");
const { URL } = require("../url");

const router = new Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../assets"));
  },
  filename: function (req, file, cb) {
    cb(null, "publicity-" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: { fieldSize: 2 * 1024 * 1024 },
});

router.post("/insert", upload.single("imageFile"), (req, res, next) => {
  const { text } = req.body;

  let image = null;
  if (req.file) {
    image = URL + "/static/" + req.file.filename;
  } else {
    image = req.body.image;
  }

  PublicityTable.insert({ text, image })
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

  PublicityTable.update({ id, text, image })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.get("/getAll", (req, res, next) => {
  const { roleID } = req.params;

  PublicityTable.getAll({ roleID })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getByID/:id", (req, res, next) => {
  const { id } = req.params;

  PublicityTable.getByID({ id })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  PublicityTable.delete({ id })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

module.exports = router;
