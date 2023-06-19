Vue.createApp({
    data() {
        return {
            taskList: [],
            filteredTaskList: [],
            editing: false,
            modal: {
                index: -1,
                description: "",
                category: "",
            },
            search: "",
            description: "",
            category: "",
        }
    },
    methods : {
        addTask: function() {
            this.taskList.push({"description" : this.description, "category" : this.category});
            this.description = "";
            this.category = "";
            console.log(this.taskList);
        },
        removeTask: function(index) {
            this.taskList.splice(index, 1);
        },
        removeFilteredTask: function(index) {
            ind = this.taskList.indexOf(this.filteredTaskList[index]);
            this.removeTask(ind)
        },
        toggleModal: function(index = null) {
            this.editing = !this.editing;
            let task = this.taskList[index];
            this.modal.description = task.description;
            this.modal.category = task.category;
            this.modal.index = index;
        },
        toggleFilteredModal: function(index) {
            ind = this.taskList.indexOf(this.filteredTaskList[index]);
            this.toggleModal(ind)
        },
        saveTaskChange: function() {
            this.taskList[this.modal.index].description = this.modal.description;
            this.taskList[this.modal.index].category = this.modal.category;
            this.toggleModal();
        }
    },
    created : function() {
    },
    watch : {
        search(newSearch, oldSearch) {
            this.filteredTaskList = this.taskList.filter((task) => {
                return task.description.toLowerCase().includes(newSearch.toLowerCase())
            })
        },
        taskList(newTask, oldTask) {
            this.filteredTaskList = this.taskList.filter((task) => {
                return task.description.toLowerCase().includes(newSearch.toLowerCase())
            })
        }
    },
}).mount("#app");