const router = require("express").Router();
const userController = require("../../controllers/userController");

// "/api/users/saved-article/:id"

router
    .route("/saved-article/:id")
    .get(userController.getSavedArticles)
    .put(userController.addSavedArticle)
router
    .route("/saved-article/remove/:id")
    .put(userController.removeSavedArticle);

module.exports = router;