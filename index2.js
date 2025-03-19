const searchButton = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const errorMessage = document.getElementById("error-message");

const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const descriptionElement = document.getElementById("description");
const cityElement = document.getElementById("city-name");
const weatherIconElement = document.getElementById("weather-icon");

const apiKey = "YOUR_OPENWEATHER_API_KEY"; // Replace with your API key

// Fetch weather data from OpenWeather API
function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                errorMessage.style.display = "block";
                return;
            }

            errorMessage.style.display = "none";

            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
            const cityName = data.name;

            // Display the data
            temperatureElement.textContent = temperature.toFixed(1);
            humidityElement.textContent = humidity;
            descriptionElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
            cityElement.textContent = cityName;
            weatherIconElement.src = iconUrl;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            errorMessage.style.display = "block";
        });
}

// Event listener for the search button
searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city.");
    }
});

// Optional: Add functionality for pressing "Enter" to search
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});
