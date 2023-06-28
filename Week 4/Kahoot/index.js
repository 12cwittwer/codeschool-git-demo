const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const bcrypt = require("bcrypt");


app.use(cors({
    credentials: true,
    origin: function(origin, callback) {
        callback(null, origin);
    }
}));

app.use(express.json());
app.use(session({
    secret: "jao84028jhf9ja8he03089j920j00nv0hg8halpmzx",
    saveUninitialized: true,
    resave: false,
}));

function AuthMiddleware(req, res, next) {
    if (req.session && req.session.userId) {
        model.User.findOne({"_id" : req.session.userId}).then(user => {
            if (user) {
                req.user = user;
                next(); //proceed to next process
            }
            else {
                res.status(401).send("Unauthenticated")//user doesn't exist
            }
        })
    }
    else {
        res.status(401).send("Unauthenticated");//no session to authroize
    }
};


const model = require("./model.js");
const { MongoUnexpectedServerResponseError } = require("mongodb");

const port = 8080;

//Quizzes
app.get("/quizzes", function(req, res) {
    model.Quiz.find().populate("questions").then(function(quiz) {
        res.send(quiz);
    })
})

app.get("/quizzes/:quizId" , function(req, res) {
    model.Quiz.findOne({"_id" : req.params.quizId}).populate("questions").then(function(quiz) {
        if (quiz) {
            res.send(quiz);
        }
        else {
            res.status(404).send("Quiz not Found");
        }
    }).catch(function(errors) {
        res.status(422).send("Not a Valid Request")
    })
});

app.post("/quizzes", AuthMiddleware, function(req, res) {
    var newQuiz = new model.Quiz({
        title: req.body.title,
        description: req.body.description,
        questions: req.body.questions,
    })

    newQuiz.save().then(function() {
        res.status(200).send("Quiz Saved")
    }).catch(function(errors) {
        res.status(400).send("Quiz Was not Able to Save")
    })
});

app.put("/quizzes/:quizId" , AuthMiddleware , function(req, res) {
    var quizId = req.params.quizId;

    model.Quiz.findOne({"_id" : quizId}).then(quiz => {
            quiz.title = req.body.title;
            quiz.description = req.body.description;
            quiz.questions = req.body.questions;
            console.log(quiz);
            model.Quiz.findOneAndUpdate({"_id" : quizId} , quiz , {new:true, runValidators:true}).then(result => {
                res.status(200).send("Quiz Updated")
            }).catch(function() {
                res.status(400).send("Quiz Could not Update")
            })
        }).catch(errors => {
            res.status(400).send("Quiz not Found")
        })
});

app.delete("/quizzes/:quizId" , AuthMiddleware ,function(req, res) {
    var quizId = req.params.quizId;

    model.Quiz.findOne({"_id" : quizId}).then(quiz => {
        if (quiz) {
            model.Quiz.deleteOne({"_id" : quizId}).then(result => {
                res.status(204).send("Quiz Deleted");
            })
        }
    }).catch(errors => {
        res.status(400).send("Quiz not Found or Could not Delete")
    })

})


//Questions
app.get("/questions" , function(req, res) {
    model.Question.find().then(function(question) {
        res.send(question);
    })
})

app.get("/questions/:questionId" , function(req, res) {
    model.Question.findOne({"_id" : req.params.questionId}).then(function(question) {
        if (question) {
            res.send(question);
        }
        else {
            res.status(404).send("Question not Found");
        }
    }).catch(function(errors) {
        res.status(422).send("Not a Valid Request")
    })
});

app.post("/questions" , AuthMiddleware , function(req, res) {
    var newQuestion = new model.Question({
        text: req.body.text,
        answers: req.body.answers,
    })

    console.log(newQuestion);

    newQuestion.save().then(function() {
        res.status(200).send("Question Saved")
    }).catch(function(errors) {
        console.log(errors);
        res.status(400).send("Question Was not Able to Save")
    })
});

app.put("/questions/:questionId" , AuthMiddleware , function(req, res) {
    var questionId = req.params.questionId;

    model.Question.findOne({"_id" : questionId}).then(question => {
                question.text = req.body.text;
                question.answers = req.body.answers;
            model.Question.findOneAndUpdate({"_id" : questionId} , question , {new:true, runValidators:true}).then(result => {
                res.status(200).send("Question Updated")
            }).catch(function() {
                res.status(400).send("Question Could not Update")
            })
        }).catch(errors => {
            res.status(400).send("Question not Found")
        })
});

app.delete("/questions/:questionId" , AuthMiddleware , function(req, res) {
    var questionId = req.params.questionId;

    model.Question.findOne({"_id" : questionId}).then(question => {
        if (question) {
            model.Question.deleteOne({"_id" : questionId}).then(result => {
                res.status(204).send("Question Deleted");
            })
        }
    }).catch(errors => {
        res.status(400).send("Question not Found or Could not Delete")
    })

})

//User
app.get("/users" , AuthMiddleware , function(req, res) {
    model.User.find().then(function(user) {

        for (var i=0; i < user.length; i++) {
            user[i].password = "******"
        }

        res.send(user);
    })
})

app.get("/users/:userId" , function(req, res) {
    model.User.findOne({"_id" : req.params.userId}).then(function(user) {
        if (user) {
            res.send(user);
        }
        else {
            res.status(404).send("User not Found");
        }
    }).catch(function(errors) {
        res.status(422).send("Not a Valid Request")
    })
});

app.post("/users" , function(req, res) {
    var newUser = new model.User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    });

    newUser.setPassword(req.body.password).then(() => {
        newUser.save().then(function() {
            res.status(200).send("User Created")
        }).catch(function(errors) {
            res.status(422).send("Could not save new user")
        })
    })
});

app.put("/users/:userId" , AuthMiddleware , function(req, res) {
    var userId = req.params.userId;

    model.User.findOne({"_id" : userId}).then(user => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.setPassword(req.body.password).then(() => {
                model.User.findOneAndUpdate({"_id" : userId} , user , {new:true, runValidators:true}).then(result => {
                    res.status(200).send("User Info Updated")
            })
            }).catch(function() {
                res.status(400).send("User info could not be Updated")
            })
        }).catch(errors => {
            res.status(400).send("User not Found")
        })
});

app.delete("/users/:userId", AuthMiddleware , function(req, res) {
    var userId = req.params.userId;

    model.User.findOne({"_id" : userId}).then(user => {
        if (user) {
            model.User.deleteOne({"_id" : userId}).then(result => {
                res.status(204).send("User Deleted");
            })
        }
    }).catch(errors => {
        res.status(400).send("User not Found or Could not Delete")
    })

})


//Session
app.get("/session" , function(req, res) {
    console.log(req.session);
    res.send()
})

app.post("/session" , function(req, res) {
    //email
    //password

    model.User.findOne({"email" : req.body.email}).then(user => {
        if (user) {
            //user exists, check password
            user.verifyPassword(req.body.password).then(result => {
                    if (result) {
                        //password matches
                        req.session.userId = user._id;
                        req.session.firstName = user.firstName;
                        res.status(201).send("Session Created")
                    }
                    else {
                        //password doesn't match
                        res.status(401).send("Couldn't authenticate. Check E-Mail and Password")
                    }
            })
        }
        else {
            //user doesn't exist
            res.status(401).send("Couldn't authenticate. Check E-Mail and Password")
        }
    }).catch(errors => {
        //user errors
        res.status(400).send("Couldn't authenticate request")
    })
})

app.delete("/session" , function(req, res) {
    req.session.userId = undefined;
    req.session.name = undefined;

    res.status(204).send("Session Deleted");
})

app.listen(port, function() {
    console.log("Server Started Locally on Port",port);
});