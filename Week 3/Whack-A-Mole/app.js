Vue.createApp({
    data() {
        return {
            rows: 5,
            columns: 5,
            intervals: 500, //in milliseconds

            moleRow: -1,
            moleCol: -1,

            total: 0,
            score: 0,
        }
    },
    methods : {
        updateMole: function() {
            var updateMoleInt = setInterval(() => {
                this.moleRow = Math.ceil(Math.random() * this.rows);
                this.moleCol = Math.ceil(Math.random() * this.columns);
                this.total++;
                if (this.total >= 10) {
                    setTimeout(() => {
                        this.moleRow = -1;
                        this.moleCol = -1;
                    }, this.intervals);
                    clearInterval(updateMoleInt);
                }
            }, this.intervals);
        },
        hitMole: function() {
            this.score++;
            this.moleRow = -1;
            this.moleCol = -1;
        },
    },
    created : function() {
        this.updateMole();
    }
}).mount("#app");