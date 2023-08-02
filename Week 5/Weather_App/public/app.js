URL = "https://api.open-meteo.com/v1/gfs?latitude=37.1041&longitude=-113.5841&current_weather=true&hourly=temperature_2m,cloudcover,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_mean&timezone=America/Boise"

Vue.createApp({
    data() {
        return {
            weatherInfo: {},
            hourForecast: [],
            weekForecast: [],
            sumToday: {},
            modal: false,
        }
    },
    methods : {
        getWeatherInfo: function() {
            fetch(URL)
            .then(response => response.json())
            .then(data => {
                this.weatherInfo = data;
                console.log("Weather Successfully Imported");
                this.hourlyWeather();
                this.weeklyWeather();
                this.summaryToday();
                console.log(data);
            })
        },
        hourlyWeather: function() {
            var time = this.weatherInfo.current_weather.time
            var index = this.weatherInfo.hourly.time.indexOf(time);
            for (var i = 1; i < 11; i++) {
                index += 1
                this.hourForecast.push({
                    temp: this.weatherInfo.hourly.temperature_2m[index],
                    precip: this.weatherInfo.hourly.precipitation[index],
                    hour: this.weatherInfo.hourly.time[index].substr(11,5)
                })
            };
        },
        weeklyWeather: function() {
            for (var i = 1; i < 7; i++) {
                this.weekForecast.push({
                    temp_max: this.weatherInfo.daily.temperature_2m_max[i],
                    temp_min: this.weatherInfo.daily.temperature_2m_min[i],
                    precip: this.weatherInfo.daily.precipitation_probability_mean[i],
                })
            }
        },
        summaryToday: function() {
            this.sumToday = {
                temp_max: this.weatherInfo.daily.temperature_2m_max[0],
                temp_min: this.weatherInfo.daily.temperature_2m_min[0],
                precip: this.weatherInfo.daily.precipitation_probability_mean[0],
            }
        },
        toggleModal: function() {
            this.modal = !this.modal
        }
    },
    created : function() {
        this.getWeatherInfo()
    },
    computed : {
        codeInt() {
            var code = this.weatherInfo.current_weather.weathercode
            

            if (code == 0) {
                return "Clear"
            }
            else if (code < 4) {
                return "Slightly Cloudy"
            }
            else if (code < 10) {
                return "Smokey/Dusty"
            }
            else if (code < 13) {
                return "Foggy"
            }
            else if (code < 20) {
                return "Cloudy"
            }
            else if (code < 30) {
                return "Precipitation"
            }
            else if (code , 40) {
                return "Stormy"
            }
        }
    }
}).mount("#app");