const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();


mongoose.connect(process.env.DB_LINK);

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Animal Must Have a Name"]
    },
    email: {
        type: String,
        unique: true,
    },
    weight: Number,
    species: String,
    birthday: Date,
});

//sets up for our code
const Animal = mongoose.model("Animal" , animalSchema);

const newAnimal = new Animal({
    name: "Marty",
    email: "move@it.com",
    weight: 24,
    species: "Penguin",
    birthday: new Date("June 20, 1950"),
})

// console.log(newHippo);

newAnimal.save().then(
    console.log("Done")).catch(function(errors) {(console.log(errors.errors))});

// finding animals:
// Animal.find({"species": "Hippo"}).then(function(animals) {
//     console.log(animals);
// });

// Animal.findOne().then(function(animal) {
//     if (animal) {
//         console.log(animal);
//     }
//     else {
//         console.log("No Animal")
//     }
// });

