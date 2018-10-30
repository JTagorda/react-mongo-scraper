const router = require("express").Router();
const noteController = require("../../controllers/noteController");

// "/api/notes/"
router
    .route("/")
    .get(noteController.findAll);

router
    .route("/:id")
    .get(noteController.findById)
    .delete(noteController.remove);

module.exports = router;