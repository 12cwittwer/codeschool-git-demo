const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));

const port = 8080;

var reminders = ["Make Dinner" , "Take out the Trash" , "Sleep"]

app.get("/reminders", function(req, res) {
    res.send(JSON.stringify(reminders));
})

app.get("/reminders/:reminderId", function(req, res) {
    var index = req.params.reminderId;
    
    if (index >= 0 && index < reminders.length) {
        //valid index
        res.send(JSON.stringify(reminders[index]))
    }

    else {
        //invalid index
        res.status(404).send("Reminder not Found")
    }
})

app.post("/reminders" , function(req, res) {
    var reminder = req.body.reminder;
    if (reminder) {
        reminders.push(reminder);
        res.status(201).send("New reminder created");
    }
    else {
        res.status(422).send("Invalid request (no empty reminders please!)");
    }


})

app.put("/reminders/:reminderId" , function(req , res) {
    var index = req.params.reminderId;

    if (index >= 0 && index < reminders.length) {
        var updated_reminder = req.body.reminder;
        if (updated_reminder) {
            reminders[index] = updated_reminder
            res.status(204).send("Reminder Updated Successfully")
        }
        else {
            res.status(422).send("Invalid request (no empty reminder updates!)")
        }
    }

    else {
        res.status(404).send("Reminder not Found")
    }
})

app.listen(port, function() {
    console.log("Server started locally on port", port)
})