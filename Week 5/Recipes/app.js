Vue.createApp({
    data() {
        return {
            recipes:[],
            search: "",
            direction: true
        }
    },
    methods : {
        getRecipes: function() {
            fetch("https://code.mollyshewchuk.com/recipes")
            .then(response => response.json()).then(data => {
            this.recipes = data;
            this.sortRecipes();
            // console.log(recipes)
            })
        },

        searchRecipes: function() {
            fetch(`https://code.mollyshewchuk.com/recipes?q=${this.search}`)
            .then(response => response.json()).then(data => {
            this.recipes = data;
            this.sortRecipes();
            })
        },

        sortRecipes: function() {
            function compare(a, b) {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0
            }

            this.recipes.sort(compare);
            this.direction = true;
        },
        sortRecipesOpposite: function() {
            function compare(a, b) {
                if (a.title > b.title) return -1;
                if (a.title < b.title) return 1;
                return 0
            }

            this.recipes.sort(compare);
            this.direction = false;
        }
    },
    created : function() {
        this.getRecipes()
    }
}).mount("#app");