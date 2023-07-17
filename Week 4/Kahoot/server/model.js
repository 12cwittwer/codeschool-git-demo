const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

dotenv.config();
mongoose.connect(process.env.DB_LINK);


const QuestionSchema = new mongoose.Schema ({
    text: {
        type: String,
        required: [true, "This is not a valid question"]
    },
    answers: [{
        answerText: {
            type: String,
            required: [true, "Answer must have text"]
        },
        isTrue: {
            type: Boolean,
            required: true
        }
    }]
});

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Quiz must have a title"]
    },
    description: String,
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: "Question"}],
});


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "You must enter a name"]
    },
    lastName: {
        type: String,
        required: [true, "You must enter a last name"]
    },
    email: {
        type: String,
        required: [true, "E-Mail address is reqired"],
        unique: true,
    },
    password: {
        type: String,
        required: [true , "Password Required"]
    }
});

UserSchema.methods.setPassword = function(plainPassword) {
    var promise = new Promise((resolve, reject) => {
        bcrypt.hash(plainPassword, 12).then(hashedPassword => {
            this.password = hashedPassword;
            resolve();
        }).catch(() => {
            reject();
        });
    });

    return promise;

};

UserSchema.methods.verifyPassword = function(plainPassword) {
    var promise = new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, this.password).then(result => {
            resolve(result);
        }).catch(() => {
            reject();
        });
    });
    return promise;
};

const Quiz = mongoose.model("Quiz" , QuizSchema);
const Question = mongoose.model("Question" , QuestionSchema);
const User = mongoose.model("User" , UserSchema);
const RedactedUser = mongoose.model("RedactedUser" , UserSchema);

User.createCollection()

// RedactedUser.createCollection({
//     viewOn: "users",
//     pipeline: [{
//         $set: {
//             name: "$name",
//             email: "$email",
//             password: "***"
//         }
//     }]
// })

module.exports = {
    Quiz : Quiz,
    Question : Question,
    User : User,
    RedactedUser: RedactedUser,
};