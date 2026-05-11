const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const { URL } = require("../url");
const newsTable = require("../tables/newsTable");

const router = new Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../assets"));
  },
  filename: function (req, file, cb) {
    cb(null, "news-" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: { fieldSize: 2 * 1024 * 1024 },
});

router.post("/insert", upload.single("imageFile"), (req, res, next) => {
  const { title, sort_id, info } = req.body;

  let image = null;
  if (req.file) {
    image = URL + "/static/" + req.file.filename;
  } else {
    image = req.body.image;
  }

  newsTable
    .insert({ title, sort_id, info, image })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.post("/update", upload.single("imageFile"), (req, res, next) => {
  const { id, title, sort_id, info } = req.body;

  let image = null;
  if (req.file) {
    image = URL + "/static/" + req.file.filename;
  } else {
    image = req.body.image;
  }

  newsTable
    .update({ id, title, sort_id, info, image })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.get("/getAll", (req, res, next) => {
  newsTable
    .getAll()
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getByID/:id", (req, res, next) => {
  const { id } = req.params;

  newsTable
    .getByID({ id })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/sort/getAll", (req, res, next) => {
  newsTable
    .sortGetAll()
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getCountBySort/:sortID", (req, res, next) => {
  const sortID = req.params;

  newsTable
    .getCountBySort(sortID)
    .then(({ count }) => res.json({ count }))
    .catch((error) => next(error));
});

router.get(
  "/getBySort/:sortID/offset/:offset/limit/:limit",
  (req, res, next) => {
    const { sortID, offset, limit } = req.params;

    newsTable
      .getBySort({ sortID, offset, limit })
      .then((response) => res.json(response))
      .catch((error) => next(error));
  }
);

router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  newsTable
    .delete({ id })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

module.exports = router;
