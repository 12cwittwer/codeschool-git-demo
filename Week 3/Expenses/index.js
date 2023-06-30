const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

const model = require("./model.js")

const port = 8080;

function expenseValidator (expense) {
    var errors = [];
    if (!expense.description) {
        errors.push("There must be a description.");
    }
    if (!expense.category) {
        errors.push("There must be a category.");
    }
    if (!expense.amount) {
        errors.push("There must be an amount.");
    }
    else if (isNaN(expense.amount)) {
        errors.push("Amount must be a number.")
    }

    return errors
}

app.get("/expenses" , function(req, res) {
    model.Expense.find().then(function(expenses) {
        res.send(expenses);
    })
});

app.get("/expenses/:expenseId" , function(req, res) {
    model.Expense.findOne({"_id" : req.params.expenseId}).then(function(book) {
        if (book) {
            res.send(book);
        }
        else {
            res.status(404).send("Expense was not found");
        }
    }).catch(function(errors) {
        res.status(422).send("Bad request")
    })
})

app.post("/expenses", function(req, res) {
    var newExpense = new model.Expense({
        description: req.body.description,
        amount: req.body.amount,
        category: req.body.category,
    });

    errors = expenseValidator(newExpense);

    if(errors.length == 0) {
        newExpense.save()
        .then(function() {res.status(201)
            .send(newExpense)})
            .catch(function(errors) {
            res.status(400).send(errors)
        })
    }
    else {
        res.status(400).send(errors);
    }
})

app.put("/expenses/:expenseId", function(req,res) {
    var expenseId = req.params.expenseId;

    model.Expense.findOne({"_id" : expenseId}).then(expense => {
        if (expense) {
            var newExpense = {
                description: req.body.description,
                amount: req.body.amount,
                category: req.body.category,
            }

            let errorList = expenseValidator(newExpense);

            if (errorList.length > 0) {
                res.status(422).send("Change could not be made")
            }
            
            else {
                expense.description = req.body.description;
                expense.amount = req.body.amount;
                expense.category = req.body.category;
                model.Expense.findOneAndUpdate({"_id": expenseId} , expense, {new: true, runValidators: true}).then(result => {
                    res.status(204).send("Updated Expense");
            })
            }
        }
        else {
            res.status(404).send("Expense Not Found")
        }
    }).catch(errors => {
        console.log(errors);
        res.status(400).send("Expense not Found");
    })
});

app.delete("/expenses/:expenseId", function(req, res) {
    var expenseId = req.params.expenseId;

    model.Expense.findOne({"_id": expenseId}).then(expense => {
        if (expense) {
            model.Expense.deleteOne({"_id" : expenseId}).then(result => {
                console.log(result.deletedCount);
                res.status(204).send("Expense Deleted");
            })
        }
        else {
            res.status(404).send("Expense Not Found");
        }
    }).catch(errors => {
        console.log(errors);
        res.status(400).send("Expense not Found/Error Deleting");
    })
})


app.listen(port, function() {
    console.log("Server Started Locally on Port",port);
});