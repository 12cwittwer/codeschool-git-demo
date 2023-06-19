Vue.createApp({
    data() {
        return {
            userName: "User",
            newUser: "",
            headerBackground: null,
        }
    },
    methods : {
        changeUser: function() {
            this.userName = this.newUser;
            this.newUser = "";
        },
        changeColorBlue: function() {
            this.headerBackground = "blue";
        },
        changeColorGrey: function() {
            this.headerBackground = "grey";
        },
        changeColorGreen: function() {
            this.headerBackground = "green"
        },
    },
    created : function() {
    }
}).mount("#app");