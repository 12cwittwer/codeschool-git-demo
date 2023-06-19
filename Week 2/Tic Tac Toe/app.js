var allTiles = document.querySelectorAll(".tile");
var turnIndicator = document.querySelector("#turn-indicator");
var turnCount = 0;
var winIndicator = document.querySelector("#winner");
var t1 = document.querySelector("#t1");
var t2 = document.querySelector("#t2");
var t3 = document.querySelector("#t3");
var t4 = document.querySelector("#t4");
var t5 = document.querySelector("#t5");
var t6 = document.querySelector("#t6");
var t7 = document.querySelector("#t7");
var t8 = document.querySelector("#t8");
var t9 = document.querySelector("#t9");
var winClass = ["row1", "row2", "row3", "col1", "col2", "col3", "diag1", "diag2"];

var topRow = document.querySelectorAll("." + "row1" + "." + "tile");

function checkWinner (play) {

    var result = false;

    winClass.forEach(function(trio) {
        var testArray = document.querySelectorAll("." + play + "." + trio);
        if (testArray.length == 3) {
            result = true;
        }
    }
)
    return result}

function turn() {
    if (turnCount==0) {
        turnIndicator.innerHTML="O";
    }
    else if (turnCount==1) {
        turnIndicator.innerHTML = "X";
    }
    else {
        turnIndicator.innerHTML="Game Over!";
    }
};

function checkSquare(tile) {
    if (tile.classList.contains("circle")) {
        return false
    }
    else if (tile.classList.contains("cross")) {
        return false
    }
    else {
        return true
    }
};


turn();

allTiles.forEach(function(tile) {
    tile.onclick = function() {
        if (turnCount == 0) {
            if (checkSquare(tile)) {
                tile.innerHTML = "O";
                tile.classList.add("circle");
                if (checkWinner("circle") == true) {
                    winIndicator.innerHTML = "O Wins";
                    turnCount = 3
                }
                else {
                    turnCount = 1
                }
            }
            else {
                return
            }
        }
        else if (turnCount ==1) {
            if (checkSquare(tile)) {
                tile.innerHTML = "X";
                tile.classList.add("cross");
                if (checkWinner("cross") == true) {
                    winIndicator.innerHTML = "X Wins"
                    turnCount = 3
                }
                else {turnCount = 0}
            }
            else {
                return
            }
        };
        turn()
}});