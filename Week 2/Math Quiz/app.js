var place_a = document.querySelector("#a");
var place_b = document.querySelector("#b");
var operator = document.querySelector("#operator");
var submit_button = document.querySelector("#submit-button");
var input = document.querySelector("#user-answer");
var feedback = document.querySelector("#display-feedback");
var percent_disp = document.querySelector("#percent-display");

const operator_list = ["+","*"];
var attempt_list = []
var attempt_correct = []

function write_question () {
    var num_a = Math.floor(Math.random() * 15);
    place_a.innerHTML = num_a;
    var num_b = Math.floor(Math.random() * 15);
    place_b.innerHTML = num_b;
    var operator_select = operator_list[Math.floor(Math.random() * 1.99)];
    operator.innerHTML = operator_select;

    if (operator_select == "+") {
        return num_a + num_b;
    }
    else {
        return num_a * num_b;
    }
};

function percentage() {
    percent = (attempt_correct.length / attempt_list.length) * 100;
    percent_disp.innerHTML = percent + "%";
}

var correct_answer = write_question()

submit_button.onclick = function() {
    input_answer = input.value;

    if (input_answer == correct_answer) {
        feedback.innerHTML = "Correct";
        feedback.classList.remove("incorrect");
        feedback.classList.add("correct");
        attempt_list.push(true);
        attempt_correct.push(true);
        write_question();

        correct_answer = write_question();
        percentage();
    }

    else {
        feedback.innerHTML = "Wrong!";
        feedback.classList.remove("correct");
        feedback.classList.add("incorrect");
        attempt_list.push(true);
        percentage();
    }
}





//question
//a
//operator
//b
//user-answer
//submit-button
//display-feedback