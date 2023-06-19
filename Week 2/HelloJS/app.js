console.log("Hello, JS!");

var my_array = ["Hello", "Words"]
var my_object = {
    name: "Jack",
    class_name: "Code School",
}

var text_input = document.querySelector("#text-input");
console.log("Text Input: ");
console.log(text_input);
var submit_button = document.querySelector("#print-button");
console.log("Submit Button: ");
console.log(submit_button);
var display_text = document.querySelector("#display-text");
console.log("Display Text Tag: ");
console.log(display_text);

var display_list = document.querySelector("#my-list");
console.log(display_list);

function reload_list() {
    display_list.innerHTML = "";
    my_array.forEach(function(item) {
        console.log(item);
        var new_li = document.createElement("li");
        new_li.innerHTML = item;

        display_list.appendChild(new_li);
})};

submit_button.oneclick = function() {
    console.log("Button Clicked!");
    var user_input = text_input.value;
    console.log(user_input);

    my_array.push(user_input);
    console.log(my_array);

    display_text.innerHTML = user_input;

    reload_list();
};

reload_list();


//print-button
//display-text