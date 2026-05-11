const { Router } = require("express");
const partnerRateTable = require("../tables/partnerRateTable");

const router = new Router();

router.post("/insert", (req, res, next) => {
  const { adminID, rate, total_rate, total_people } = req.body;

  partnerRateTable
    .insert({ adminID, rate, total_rate, total_people })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.post("/toRate", (req, res, next) => {
  const { id, adminID, rate, total_rate, total_people } = req.body;

  const newRate = total_rate + rate;
  const newPeople = total_people + 1;
  rate = newRate / newPeople;

  partnerRateTable
    .toRate({
      id,
      adminID,
      rate,
      total_rate,
      total_people,
      newRate,
      newPeople,
    })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.get("/getAll", (req, res, next) => {
  partnerRateTable
    .getAll()
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getByID/:id", (req, res, next) => {
  const { id } = req.params;

  partnerRateTable
    .getByID({ id })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  partnerRateTable
    .delete({ id })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

module.exports = router;
