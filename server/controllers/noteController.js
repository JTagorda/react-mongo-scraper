const db = require("../models");

module.exports = {
    findAll: (req, res) => {
        db.Note
            .find(req.query)
            .limit(20)
            .then(dbNote => res.json(dbNote))
            .catch(err => res.status(422).json(err));
    },
    findById: (req, res) => {
        db.Note
            .findById(req.params.id)
            .then(dbNote => res.json(dbNote))
            .catch(err => res.status(422).json(err));
    },
    create: (req, res) => {
        var id = req.params.id;
        db.Note.create({title: req.body.title, body: req.body.body})
        .then(function(dbNote) {
            var noteId = dbNote._id;
            db.Article.findOneAndUpdate({_id: id}, {$push: {note: noteId}})
            .then(function(edited) {
                res.json({message: edited});
            })
            .catch(function(error) {
                res.end(error);
            });
        })
        .catch(function(err) {
            console.log(err);
            res.end(err);
        });
    }
}