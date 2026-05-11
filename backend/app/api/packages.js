const { Router } = require("express");
const PackagesTable = require("../tables/packagesTable");

const router = new Router();

router.post("/insert", (req, res, next) => {
  const {
    account_id,
    package_category,
    addition,
    package_name,
    bundle_sort,
    total_piece,
    weight_tn,
    weight_kg,
    weight_metr,
    come_from,
    go_to,
    loaded_place,
    pinned_file,
  } = req.body;

  PackagesTable.insert({
    account_id,
    package_category,
    addition,
    package_name,
    bundle_sort,
    total_piece,
    weight_tn,
    weight_kg,
    weight_metr,
    come_from,
    go_to,
    loaded_place,
    pinned_file,
  })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.post("/update", (req, res, next) => {
  const {
    id,
    package_category,
    addition,
    package_name,
    bundle_sort,
    total_piece,
    weight_tn,
    weight_kg,
    weight_metr,
    come_from,
    go_to,
    loaded_place,
    pinned_file,
    status_id,
  } = req.body;

  PackagesTable.update({
    id,
    package_category,
    addition,
    package_name,
    bundle_sort,
    total_piece,
    weight_tn,
    weight_kg,
    weight_metr,
    come_from,
    go_to,
    loaded_place,
    pinned_file,
    status_id,
  })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.get("/free/getAll", (req, res, next) => {
  PackagesTable.getFreeAll()
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/byStatusID/:statusID/getAll", (req, res, next) => {
  const { statusID } = req.params;

  PackagesTable.getAllByStatusID({ statusID })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get(
  "/byCargoAdminID/:cargoAdminID/byStatusID/:statusID/getAll",
  (req, res, next) => {
    const { cargoAdminID, statusID } = req.params;

    PackagesTable.getAllByCargoAdminID_StatusID({ cargoAdminID, statusID })
      .then((response) => res.json(response))
      .catch((error) => next(error));
  }
);

router.get("/approved/getAll", (req, res, next) => {
  PackagesTable.getApprovedAll()
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get(
  "/byCargoAdminID/:cargoAdminID/approved/getAll",
  (req, res, next) => {
    const { cargoAdminID } = req.params;

    PackagesTable.getApprovedAllByCargoAdminID({ cargoAdminID })
      .then((response) => res.json(response))
      .catch((error) => next(error));
  }
);

router.get("/byAccID/:accountID/free/getAll", (req, res, next) => {
  const { accountID } = req.params;

  PackagesTable.getFreeByAccountID({ accountID })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/byAccID/:accountID/requested/getAll", (req, res, next) => {
  const { accountID } = req.params;

  PackagesTable.getRequestedByAccountID({ accountID })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/isFree/:id", (req, res, next) => {
  const { id } = req.params;

  PackagesTable.getFreeByID({ id })
    .then((response) => {
      if (
        response?.transport_id === null ||
        response?.transport_id === "null"
      ) {
        res.json(true);
      } else {
        res.json(false);
      }
    })
    .catch((error) => next(error));
});

router.get("/free/getByID/:id", (req, res, next) => {
  const { id } = req.params;

  PackagesTable.getFreeByID({ id })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.get("/getByID/:id", (req, res, next) => {
  const { id } = req.params;

  PackagesTable.getByID({ id })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.post("/sendRequest", (req, res, next) => {
  const { packageID, transportID } = req.body;

  PackagesTable.sendRequest({ packageID, transportID })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.get("/getStatuses", (req, res, next) => {
  PackagesTable.getStatuses()
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

router.post("/changeStatus", (req, res, next) => {
  const { packageID, statusID } = req.body;

  PackagesTable.changeStatus({ packageID, statusID })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  PackagesTable.delete({ id })
    .then(({ message }) => res.json({ message }))
    .catch((error) => next(error));
});

module.exports = router;
