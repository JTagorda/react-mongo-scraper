const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

// Defining methods for the booksController
module.exports = {
  scrape: function(req, res) {
    axios.get("https://www.reddit.com/r/raspberry_pi/").then(function (response) {
        var $ = cheerio.load(response.data);
        var notInDatabase = 0;
        $("div ._11R7M_VOgKO1RJyRSRErT3").each(function(i, element) {
            var headLine = $(element).find("div ._3wiKjmhpIpoTE2r5KCm2o6").find("h2").text();
            var link = $(element).find("div ._3wiKjmhpIpoTE2r5KCm2o6").find("a").attr("href");

            var summary = $(element).find("div .md").children().text();

            var article = {headLine, summary, link};

            //if this article hasn't already been scraped then add to database
            db.Article.find({})
            .then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].headLine !== headLine) {
                        notInDatabase++;
                    }
                }
                console.log(notInDatabase);
                console.log(data.length);
                if (notInDatabase === data.length) {
                    db.Article.create(article)
                    .then(function(dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
                    notInDatabase = 0;
                } else {
                    notInDatabase = 0;
                }
            })
            .catch(function(err) {
                return res.end(err);
            });
        });
        res.json({message: "Scrape Complete"});
    });
  },
  savedArticles: function(req, res) {
    db.Article.find({saved: true}).sort({created: -1}).limit(20).populate("note")
        .then(function(dbFound) {
            res.json(dbFound);
        })
        .catch(function(error) {
            if(error) {
                console.log(error);
            }
        });
  },
  getArticles: function(req, res) {
    db.Article.find({}).sort({created: -1}).limit(20).populate("note")
      .then(function(dbFound) {
          res.json(dbFound)
      })
      .catch(function(error) {
          if(error) {
              console.log(error);
          }
      });
  },
  getArticlesById: function(req, res) {
    var id = req.params.id;
    db.Article.findOne({_id: id})
        .populate("note")
        .then(function(dbFound) {
            res.json(dbFound);
        })
        .catch(function(error) {
            console.log(error);
        });
  },
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeNote: (req, res) => {
        db.Article.findByIdAndUpdate(req.params.id, {$pull: {note: req.body.noteId}})
            .then(function(edited) {
            res.json(edited);
            })
            .catch(function(error) {
            res.end(error);
            });
  }
};
