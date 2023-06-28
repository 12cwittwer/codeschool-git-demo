Vue.createApp({
    data() {
        return {
            expenses: [],
            // balance: 0,
            search: "",
            filteredExpenses: [],
            sortOrder: "",
            modalOpen: false,
            modal: {
                index: -1,
                description: "",
                amount: "",
                category: "",
            },
        }
    },
    methods : {
        getExpenses: function() {
            fetch("http://localhost:8080/expenses").then(response => response.json()).then((data) => {
                this.expenses = data;
            })
        },
        resetSearch: function() {
            this.search = '';
        },
        sortExpenses: function() {
            if (this.sortOrder == "asc") {
            function compare(a, b) {
                if (a.amount > b.amount) return -1; 
                if (a.amount < b.amount) return 1;
                return 0;
            }
            this.sortOrder = 'desc';
        }
        else {
            function compare(a, b) {
                if (a.amount < b.amount) return -1; 
                if (a.amount > b.amount) return 1;
                return 0;
            }
            this.sortOrder = "asc"
        }
            this.expenses.sort(compare);
        },
        toggleModal: function(index = null) {
            //console.log(index);
            this.modalOpen = !this.modalOpen;
            if (index !== null) {
            this.modal.index = index;
            let exp = this.expenses[index];
            this.modal.description = exp.description;
            this.modal.amount = exp.amount;
            this.modal.category = exp.category;}
        },
        updateExpense: function() {
            this.expenses[this.modal.index].description = this.modal.description;
            this.expenses[this.modal.index].amount = parseFloat(this.modal.amount);
            this.expenses[this.modal.index].category = this.modal.category;
            this.toggleModal()
            //this.modalOpen = false
        },
        toggleFilteredModal: function(oldIndex) {
            let index = this.expenses.indexOf(this.filteredExpenses[oldIndex]);
            this.toggleModal(index);
        } 
    },
    created : function() {
        this.getExpenses();
    },
    watch:  {
        search(newSearch, oldSearch) {
            //console.log(newSearch);
            this.filteredExpenses = this.expenses.filter((expense) => {
                return expense.description.toLowerCase().includes(newSearch.toLowerCase());
            })
        }
    },
    // watch: {
    //     expenses(newExp, oldExp) {
    //         this.expenses.forEach(e => {
    //             this.balance += e.amount;
    //         });
    //     }
    // },
    computed: {
        balance() {
            if (this.filteredExpenses.length > 0 && this.search) {
                return this.filteredExpenses.reduce((total, expense) => total + expense.amount , 0);
            }
            else {
                return this.expenses.reduce((total, expense) => total + expense.amount , 0);
            }}
    }
}).mount("#app");