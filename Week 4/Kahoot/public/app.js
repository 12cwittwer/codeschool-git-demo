const URL = "http://localhost:8080/"

Vue.createApp({
    data() {
        return {
            page: "auth",
            user: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            },
            quizzes: [],
            newQuiz: {
                title: '',
                description: '',
                questions: [],
            },
            newQuestions: [
                {
                    text: "",
                    answers: [
                        {answerText: "", isTrue: true}
                    ]
                }
            ],
            quizShown: -1,
        }
    },
    methods : {
        signup: function() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var options = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(this.user)
            };

            fetch(URL + "users", options)
            .then((response) => {
                if (response.status === 201) {
                    this.page = "";
                    this.createSession();
                }
                else {
                    alert("Could not Create User")
                }
            })
        },
        createSession: function() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var options = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(this.user),
                credentials: 'include'
            };

            fetch(URL + "session", options)
            .then((response) => {
                if (response.status === 201) {
                    response.text().then(data => {
                        if (data) {
                            data = JSON.parse(data);
                            this.page = "",
                            this.user.firstName = data.firstName
                        }
                        else {
                            alert("Cannot Log In")
                        }
                    })
                }
                else {
                    alert("Could not create session")
                }
            })
        },
        loggedIn: function() {
            var options = {
                credentials: "include"
            };

            fetch(URL + "session", options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data && data.cookie && data.userId) {
                    this.page = "";
                }
                else {
                    this.page = "auth"
                }
            })
        },
        logout: function() {
            var options = {
                method: "DELETE",
                credentials: "include",
            };

            fetch(URL + "session", options).then(response => {
                this.page = "auth";
                this.user = {
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: ""
                };
            })
        },
        getQuizzes: function() {
            fetch(URL + "quizzes")
            .then(response => response.json())
            .then(data => {
                this.quizzes = data;
                console.log(this.quizzes);
            })
        },
        addQuestion: function() {
            this.newQuestions.push({
                questionText: "",
                possibleChoices: [
                    {answerText: "", isCorrect: true}
                ]
            });
        },
        addAnswer: function(index) {
            this.newQuestions[index].answers.push({answerText: "", isTrue: false})
        },
        createQuiz: function() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type" , "application/json");

            this.newQuiz.questions = this.newQuestions;
            console.log(this.newQuiz)

            var options = {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(this.newQuiz),
                headers: myHeaders
            };

            fetch(URL + "quizzes" , options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
        },
        getRandomGradient: function() {
            var color1 = this.generateColor();
            var color2 = this.generateColor();
            var angle = Math.floor(Math.random() * 361);
            const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
            return gradient
        },
        generateColor: function() {
            const letters = "ABCDEF"
            let color = "#";
            for (let i = 0; i<6; i++) {
                color += letters[Math.floor(Math.random() * 6)]
            }
            return color
        },
        displayQuiz: function(index) {
            this.quizShown = index;
            this.page = "displayQuiz"
        }
    },
    created : function() {
        this.loggedIn();
        this.getQuizzes();
    }
}).mount("#app");