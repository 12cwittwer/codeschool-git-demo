const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

const model = require("./model.js")

const port = 8080;


function bookValidator (book) {
    var errors = [];
    if (!book.title) {
        errors.push("Book must have a title");
    }
    if (!book.author) {
        errors.push("Book must have a author");
    }
    if (!book.rating) {
        errors.push("Book must have a rating");
    }
    else if (isNaN(book.rating)) {
        errors.push("Rating Must Be a Number");
    }

    return errors
}





app.get("/books" , function(req, res) {
    model.Book.find().then(function(books) {
        res.send(books);
    })
});

app.get("/books/:bookId", function(req, res) {
    model.Book.findOne({"_id" : req.params.bookId}).then(function(book) {
        if (book) {
            res.send(book);
        }
        else {
            res.status(404).send("Book Not Found");
        }
    }).catch(function(errors) {
        console.log(errors);
        res.status(422).send("Bad Request");
    })
});

app.post("/books", function(req, res) {
    var newBook = new model.Book({
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
    });

    let errors = bookValidator(newBook);

    if(errors.length == 0) {
        newBook.save().then(function() {res.status(200).send("Book Saved")}).catch(function(errors) {
            res.status(400).send(errors)
        })
    }
    else {
        res.status(400).send(errors);
    }
});

app.put("/books/:bookId", function(req,res) {
    var bookId = req.params.bookId;

    model.Book.findOne({"_id" : bookId}).then(book => {
        if (book) {
            var newBook = {
                title: req.body.title,
                author: req.body.author,
                rating: req.body.rating,
            }

            let errorList = bookValidator(newBook);

            if (errorList.length > 0) {
                res.status(422).send("Change could not be made")
            }
            
            else {
                book.title = req.body.title;
                book.author = req.body.author;
                book.rating = req.body.rating;
                model.Book.findOneAndUpdate({"_id": bookId} , book, {new: true, runValidators: true}).then(result => {
                    res.status(200).send("Updated Book");
            })
            }
        }
        else {
            res.status(404).send("Book Not Found")
        }
    }).catch(errors => {
        console.log(errors);
        res.status(400).send("Book not Found");
    })
});

app.delete("/books/:bookId", function(req, res) {
    var bookId = req.params.bookId;

    model.Book.findOne({"_id": bookId}).then(book => {
        if (book) {
            model.Book.deleteOne({"_id" : bookId}).then(result => {
                console.log(result.deletedCount);
                res.status(204).send("Book Deleted");
            })
        }
        else {
            res.status(404).send("Book Not Found");
        }
    }).catch(errors => {
        console.log(errors);
        res.status(400).send("Book not Found/Error Deleting");
    })
})



app.listen(port, function() {
    console.log("Server Started Locally on Port",port);
});