Vue.createApp({
    data() {
        return {
            kilobytes: "",
            bytes: "",
            displayBytes: null,
            displayMegabits: null,
        }
    },
    methods : {
        convertToB: function() {
            let answer = this.kilobytes * 1000;
            this.displayBytes = answer;
        },
        convertToMb: function() {
            let answer = (this.bytes * 0.000008).toFixed(5);
            this.displayMegabits = answer;
        },
        numValid: function(num) {
            console.log(num.length > 0 && !isNaN(num));
            return (num.length > 0 && !isNaN(num));
        },
    },
    created : function() {
    }
}).mount("#app");