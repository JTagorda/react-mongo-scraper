const router = require("express").Router();
const articleController = require("../../controllers/articleController");
const noteController = require("../../controllers/noteController");

// "/api/articles/scrape"
router
    .route("/scrape")
    .get(articleController.scrape);

router
    .route("/saved-articles")
    .get(articleController.savedArticles);

// "/api/articles/"
router
    .route("/")
    .get(articleController.getArticles);

// "/api/articles/:id"
router
    .route("/:id")
    .get(articleController.getArticlesById)
    .post(noteController.create)
    .delete(articleController.remove);

// "/api/articles/notes/:id"
router
    .route("/notes/:id")
    .put(articleController.removeNote);

module.exports = router;


