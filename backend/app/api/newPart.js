const { Router } = require("express");
const NewPartTable = require("../tables/newPartTable");

const router = new Router();

router.get("/getBylD/:id", (req, res, next) => {
  const { id } = req.params;

  NewPartTable.getBylD({ id })
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

module.exports = router;
