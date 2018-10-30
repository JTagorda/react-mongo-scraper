const express = require("express");
const router = express.Router();
const articleRoutes = require("./articles");
const noteRoutes = require("./notes");


router.use("/articles", articleRoutes);
router.use("/notes", noteRoutes);

module.exports = router;
