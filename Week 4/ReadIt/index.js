// const book = {
//     title: "Harry Potter",
//     author: "JK Rowling",
//     rating: "5",
// };

const port = 8080;

const myBooks = [{
    title: "Harry Potter",
    author: "JK Rowling",
    rating: "5",
}
];

const express = require("express");
app.use(cors());
app.use(express.urlencoded({ extended: false }))

const app = express();
app.use(express.urlencoded({ extended: false }));

app.get("/books", function(req, res) {
    res.send(JSON.stringify(myBooks))
});




app.listen(port, function() {
    console.log("Server Started Locally on Port",port);
});