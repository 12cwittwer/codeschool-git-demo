const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
mongoose.connect(process.env.DB_LINK);

const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, "There must be a description."]
    },
    amount: {
        type: Number,
        required: [true, "There must be an amount."]
    },
    category: {
        type: String,
        required: [true, "There must be a category."]
    },
},
{ timestamps: true }
);

const Expense = mongoose.model("Expense" , expenseSchema);

module.exports = {
    Expense: Expense,
}