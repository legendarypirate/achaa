const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const AcademyTable = require("../tables/academyTable");
const { URL } = require("../url");

const router = new Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../assets"));
  },
  filename: function (req, file, cb) {
    cb(null, "academy-" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: { fieldSize: 2 * 1024 * 1024 },
});

router.post("/insert", upload.single("imageFile"), (req, res, next) => {
  const { title, sort, information } = req.body;

  let image = null;

  if (req.file) {
    image = URL + "/static/" + req.file.filename;
  } else {
    image = req.body.image;
  }

  AcademyTable.insert({
    title,
    sort,
    information,
    image,
  })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.post("/update", upload.single("imageFile"), (req, res, next) => {
  const { id, title, sort, information } = req.body;

  let image = null;
  if (req.file) {
    image = URL + "/static/" + req.file.filename;
  } else {
    image = req.body.image;
  }

  AcademyTable.update({
    id,
    title,
    sort,
    information,
    image,
  })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.get("/getAll", (req, res, next) => {
  const { roleID } = req.params;

  AcademyTable.getAll({ roleID })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getByID/:id", (req, res, next) => {
  const { id } = req.params;

  AcademyTable.getByID({ id })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  AcademyTable.delete({ id })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

module.exports = router;
