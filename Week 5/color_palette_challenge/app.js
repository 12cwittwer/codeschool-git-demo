Vue.createApp({
    data() {
        return {
            newColor: {
                red: 0,
                green: 0,
                blue: 0,
            },
            rgbString: '',
        }
    },
    methods : {
        colorString: function() {
            return "rgb(" + this.newColor.red + "," + this.newColor.green + "," + this.newColor.blue + ")";
        },
    },
    created : function() {
        this.colorString()
    }
}).mount("#app");