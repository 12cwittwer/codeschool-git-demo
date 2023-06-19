Vue.createApp({
    data() {
        return {
        message: "Hello",
        items: [
            {text: "Item 1" , show: true, color: "#3aa"},
            {text: "Item 2" , show: true, color: "#8af"},
            {text: "Item 3" , show: true, color: "#98f"},
            {text: "Item 4" , show: true, color: "#3cc"},
        ],
        showText: true
    }},
    methods: {
        toggleColor: function (item) {
            console.log(item);
            item.show = !item.show;
        },
        appendText: function (item) {
            item.text += "b";
        },
        toggleText: function () {
            this.showText = !this.showText;
        },
    }
}).mount("#app");