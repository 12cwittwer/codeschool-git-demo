const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.DB_LINK);

const port = 8080;

const myBooks = [{
    title: "Harry Potter",
    author: "JK Rowling",
    rating: "3",
}, {
    title: "The Wolf",
    author: "Leo Carew",
    rating: "5",
}, {
    title: "The Republic",
    author: "Plato",
    rating: "5",
}
];

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
    return errors
}

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: false }));

app.get("/books" , function(req, res) {
    res.send(JSON.stringify(myBooks));
});

app.get("/books/:bookId", function(req, res) {
    var index = req.params.bookId;

    if (index >= 0 && index < myBooks.length) {
        if (myBooks[index]) {
            res.send(JSON.stringify(myBooks[index]));
        }
        else {
            res.status(404).send("Book not Found");
        }
    }
    else {
        res.status(404).send("Book Not Found.");
    }
});

app.post("/books", function(req, res) {
    var new_book = {
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
    }

    var errors = bookValidator(new_book);

    if (errors.length == 0) {
        myBooks.push(new_book);
        res.status(201).send("Book Added");
    }
    else {
        res.status(422).send(errors);
    }
});

app.put("/books/:bookId", function(req,res) {
    var index = req.params.bookId;

    if (index >= 0 && index < myBooks.length) {
        if (myBooks[index]) {
        var updated_book = {
            title: req.body.title,
            author: req.body.author,
            rating: req.body.rating,
        }

        var errors = bookValidator(updated_book);

        if(errors == 0) {
            myBooks[index] = updated_book;
            res.status(204).send("Book Updated");
        }
        else {
            res.status(422).send(errors);
        }
    }
        else {
            res.status(404).send("Book Not Found");
        }}

    else {
        res.status(404).send("Book Not Found");
    }
});

app.delete("/books/:bookId", function(req, res) {
    var index = req.params.bookId

    if (index >= 0 && index < myBooks.length) {
        if (myBooks[index]) {
            myBooks[index] = null;
            res.status(204).send("Book Deleted");
        }
        else {
            res.status(404).send("Book not Found")
        }
    }
    else {
        res.status(404).send("Book not Found");
    }
})



app.listen(port, function() {
    console.log("Server Started Locally on Port",port);
});