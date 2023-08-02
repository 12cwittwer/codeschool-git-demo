const express = require("express");
const app = express();
const path = require("path")
app.use(express.static("public"));

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

app.get("/upload", (req, res) => {
    res.render("upload");
})

app.post("/upload" , upload.single('image') , (req, res) => {
    res.send("Image Uploaded")
})

app.listen(8000);
