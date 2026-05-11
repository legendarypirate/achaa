const { Router } = require("express");
const transportTable = require("../tables/transportTable");

const router = new Router();

router.post("/insert", (req, res, next) => {
  const {
    cargo_admin_id,
    container_code,
    transport_type,
    location_from,
    location_to,
    price_metr,
    price_tn,
    date_from,
    date_to,
    capacity_tn,
    capacity_metr,
    tonnage,
    container_size,
    status,
    signed_date,
  } = req.body;

  transportTable
    .insert({
      cargo_admin_id,
      container_code,
      transport_type,
      location_from,
      location_to,
      price_metr,
      price_tn,
      date_from,
      date_to,
      capacity_tn,
      capacity_metr,
      tonnage,
      container_size,
      status,
      signed_date,
    })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.post("/update", (req, res, next) => {
  const {
    id,
    cargo_admin_id,
    container_code,
    transport_type,
    location_from,
    location_to,
    price_tn,
    price_metr,
    date_from,
    date_to,
    status,
    signed_date,
    tonnage,
    container_size,
    capacity_metr,
    capacity_tn,
  } = req.body;

  transportTable
    .update({
      id,
      cargo_admin_id,
      container_code,
      transport_type,
      location_from,
      location_to,
      price_tn,
      price_metr,
      date_from,
      date_to,
      status,
      signed_date,
      tonnage,
      container_size,
      capacity_metr,
      capacity_tn,
    })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.get("/getAll", (req, res, next) => {
  transportTable
    .getAll()
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/CR/:adminID/getAll", (req, res, next) => {
  const { adminID } = req.params;

  transportTable
    .crGetAllByAdminID({ adminID })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/:adminID/getAll", (req, res, next) => {
  const { adminID } = req.params;

  transportTable
    .getAllByAdminID({ adminID })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getByID/:id", (req, res, next) => {
  const { id } = req.params;

  transportTable
    .getByID({ id })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  transportTable
    .delete({ id })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

module.exports = router;
