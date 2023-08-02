Vue.createApp({
    data() {
        return {
            newColor: {
                red: 0,
                green: 0,
                blue: 0,
            },

            colorPalette: [],
            checkColor: false,
        }
    },
    methods : {
        addColor: function() {
            var index = this.colorPalette.indexOf(this.rgbString);
            if (index < 0) {
            this.colorPalette.push(this.rgbString);
            }
        },
        complimentColor: function() {
            for (color in this.newColor) {
                this.newColor[color] = 255 - this.newColor[color];
            }
        },
        changeRed: function(index) {
            this.newColor.red = (index-1);
        },
    },
    created : function() {
        console.log(this.rgbComp)
    },
    computed: {
        rgbString() {
            return "rgb(" + this.newColor.red + "," + this.newColor.green + "," + this.newColor.blue + ")";
        },
        rgbComp() {
            return "rgb(" + (255 - this.newColor.red) + "," + (255 - this.newColor.green) + "," + (255 - this.newColor.blue) + ")";
        }
    },
    watch: {
        rgbString: function() {
            document.body.style.backgroundColor = this.rgbComp;
        }
    },
}).mount("#app");