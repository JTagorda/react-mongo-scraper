const express = require("express");
const router = express.Router();
const articleRoutes = require("./articles");
const noteRoutes = require("./notes");
const userRoutes = require("./users");


router.use("/articles", articleRoutes);
router.use("/notes", noteRoutes);
router.use("/users", userRoutes);

module.exports = router;
