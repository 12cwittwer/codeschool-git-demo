var tiles = document.querySelectorAll(".tile");
var textInput = documnet.querySelector("#text-input");

tiles.forEach(function(tile) {
    tile.onclick = function() {
        console.log(tile.innerHTML);
        tile.innerHTML = textInput.value;

        if (tile.classList.contains("red")) {
            tile.classList.remove("red");
        }

        else {
            tile.classList.add("red");
        }
    }
})