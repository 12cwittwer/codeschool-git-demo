Vue.createApp({
    data() {
        return {
            jokes: [],
            search: "",
            displayedJoke: "",
            filteredJokes: [],
        }
    },
    methods : {
        getJokes: function() {
            fetch('https://code.mollyshewchuk.com/jokes').then(response => response.json()).then((data) => {
                this.jokes = data;
                this.getDisplayJoke();
            })
            
            console.log(this.displayedJoke);
        },
        getDisplayJoke: function() {
            index = Math.floor(Math.random() * this.jokes.length);
            this.displayedJoke = this.jokes[index];
        }
},
    created : function() {
        this.getJokes()
    },
    watch : {
        search (newSearch, oldSearch) {
            this.filteredJokes = this.jokes.filter((joke) => {
                return joke.toLowerCase().includes(newSearch.toLowerCase())
            })
        }
    }
}).mount("#app");