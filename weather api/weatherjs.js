const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const weatherIconElement = document.getElementById('weather-icon');
const weatherDescriptionElement = document.getElementById('weather-description');

// Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap (crucial!)
const apiKey = 'YOUR_API_KEY';

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    locationElement.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const areaName = data.name;
      const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
      const weather = data.weather[0].main;
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      locationElement.innerHTML = `Location: ${areaName}`;
      temperatureElement.innerHTML = `${temperature}°C`; // Display temperature with degree symbol
      weatherIconElement.src = iconUrl;
      weatherDescriptionElement.innerHTML = `Weather: ${weather}`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      locationElement.innerHTML = "Error fetching location!";
    });
}

getLocation(); // Initiate the location retrieval process
