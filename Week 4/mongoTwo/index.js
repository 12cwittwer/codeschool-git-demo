const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();


mongoose.connect(process.env.DB_LINK);

const animalSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    species: String,
    birthday: Date,
});

//sets up for our code
const Animal = mongoose.model("Animal" , animalSchema);

// const newHippo = new Animal({
//     name: "Skipper",
//     weight: 24,
//     species: "Penguin",
//     birthday: new Date("June 20, 1950"),
// })

// console.log(newHippo);

// newHippo.save().then(console.log("Done"));

// finding animals:
// Animal.find({"species": "Hippo"}).then(function(animals) {
//     console.log(animals);
// });

Animal.findOne({"_id": "6493210b22c2ba4dc3f88adc"}).then(function(animal) {
    if (animal) {
        console.log(animal);
    }
    else {
        console.log("No Animal")
    }
})