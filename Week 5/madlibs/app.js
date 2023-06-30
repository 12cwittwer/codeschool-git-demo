const URL = "https://code.mollyshewchuk.com/madlibs"
Vue.createApp({
    data() {
        return {
            madlib: {
                words: [],
                id: -1
            },
            currentIndex: 0,
            answers: [],
            currentPrompt: "",
            completed: false,
            completedMadlib: "",
        }
    },
    methods : {
        savePrompt: function() {
            if (this.currentPrompt == "") return;

            this.answers.push(this.currentPrompt)
            this.currentIndex++;
            this.currentPrompt = "";

            if (this.currentIndex == this.madlib.words.length) {
                this.completed = true
                this.generateMadlib()
            }
        },
        generateMadlib: function() {
            var params = new URLSearchParams();
            params.append("answers", JSON.stringify(this.answers))
            params.append("id", JSON.stringify(this.madlib.id));
            var encodedData = params.toString()

            var requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                body: encodedData
            }
            
            fetch(URL, requestOptions)
            .then(response => response.text())
            .then(data => {
                this.completedMadlib = data;
            })
        }
    },
    created : function() {
        fetch("https://code.mollyshewchuk.com/madlibs")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.madlib.words = data.words;
            this.madlib.id = data.id

        }).catch(error => {
            console.error(error);
        })
    },
    computed: {
        prompt() {
            return this.madlib.words[this.currentIndex];
        }
    }
}).mount("#app");