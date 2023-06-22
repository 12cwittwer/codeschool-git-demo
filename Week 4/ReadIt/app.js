Vue.createApp({ 
    
    data: function() {
    return {
        sorting: false,
        bookName: "",
        bookAuthor: "",
        bookRating: null,
        books: []
    };
    },

    methods: {
        addBook: function() {
            var data = "title="+encodeURIComponent(this.bookName);
            data += "&author=" + encodeURIComponent(this.bookAuthor);
            data += "&rating=" + encodeURIComponent(this.bookRating);

            fetch("http://localhost:8080/books", {
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then( response => {
                if (response.status == 201) {
                    this.getBooksFromServer();
                }
            });
        },

        getBooksFromServer: function() {
            fetch("http://localhost:8080/books").then( response => {
                response.json().then( data => {
                    console.log("loaded books from server:", data);
                    this.books = data;
                });
            });
        },

        sortBooksAuthor: function() {
            console.log();
            function compare(a, b) {
                if (a.author < b.author) return -1;
                if (a.author > b.author) return 1;
                return 0;
            }
            this.books.sort(compare);
            this.sorting = !this.sorting;
        },

        sortBooksTitle: function() {
            console.log();
            function compare(a, b) {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            }
            this.books.sort(compare);
            this.sorting = !this.sorting;
        },

        sortBooksRating: function() {
            console.log();
            function compare(a, b) {
                if (a.rating > b.rating) return -1;
                if (a.rating < b.rating) return 1;
                return 0;
            }
            this.books.sort(compare);
            this.sorting = !this.sorting;
        },

        toggleSort: function() {
            this.sorting = !this.sorting
        }
    },

    computed: {
        heading: function() {
            if (this.books.length == 1) {
                return `${this.books.length} Book`;
            }
            else {
                return `${this.books.length} Books`;
            }
        }
    },

    created: function() {
        this.getBooksFromServer();
    }



}).mount("#app");
// mounts app to the div with id "#app"
