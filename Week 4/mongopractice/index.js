const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.set("strictQuery", false);
mongoose.connect("");

const JournalEntrySchema = Schema({
    description: String,
    amount: Number,
    category: String
});

JournalEntrySchema.findOne

