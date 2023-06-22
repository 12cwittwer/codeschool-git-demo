const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
mongoose.connect(process.env.DB_LINK);

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Book Must Have a Title"]
    },
    author: {
        type: String,
        required: [true, "Book Must Have an Author"]
    },
    rating: {
        type: Number,
        required: [true, "Book Must be Rated"]
    },
});

const Book = mongoose.model("Book" , bookSchema);

module.exports = {
    Book: Book,
}