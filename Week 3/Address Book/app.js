Vue.createApp({
    data() {
        return {
            feedback: "",
            booked: [],
            editing: false,
            editColor: "grey",
        }
    },
    methods : {
        saveInfo: function() {
            console.log(this.name);
            if (this.name == undefined || this.email == undefined) {
            this.feedback = "This is Not Valid Information"
            this.name="";
            this.email="";
            console.log(this.booked)
        }
            else if (this.name.length > 0 && this.email.length > 0) {
                this.booked.push({
                    name: this.name,
                    email: this.email
                });
                this.name = "";
                this.email = "";
                this.feedback = ""
            }
            else {
                this.feedback = "This is Not Valid Information"
                return
            }
        },

        checkEdit: function() {
            return this.editing
        },

        changeEdit: function() {
            this.editing = !this.editing
            if (this.booked.length == 0) {
                this.editing = false;
            }
        },

        removeInfo: function(info) {
            var index = this.booked.indexOf(info);
            this.booked.splice(index, 1)
            if (this.booked.length == 0) {
                this.editing = false;
            }
        },
    },
    created : function() {
    }
}).mount("#app");