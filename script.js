//Global variables

const lookUpCity = document.querySelector('.lookup-city');
const logo = document.querySelector('.logo');
const placeSearch = document.querySelector('.search-bar');
const main = document.querySelector('main');
const header = document.querySelector('header');
let inputField = document.querySelector('input');

//Global arrays to use

const threeCapitals = [
  {
    name: "London",
    country: "United Kingdom",
    longitude: -0.1257,
    latitude: 51.5085,
    timezone: "auto"
  },
  {
    name: "Brussels",
    country: "Belgium",
    longitude: 4.3488,
    latitude: 50.8505,
    timezone: "auto"
  },
  {
    name: "New York",
    country: "United States",
    longitude: -74.006,
    latitude: 40.7143,
    timezone: "auto"
  }
];

//Functions

function getWeatherImage(code) {
  const weatherImages = {
    "0": "https://openweathermap.org/img/wn/01d@2x.png",
    "1": "https://openweathermap.org/img/wn/01d@2x.png",
    "2": "https://openweathermap.org/img/wn/02d@2x.png",
    "3": "https://openweathermap.org/img/wn/04d@2x.png",
    "45": "https://openweathermap.org/img/wn/50d@2x.png",
    "48": "https://openweathermap.org/img/wn/50d@2x.png",
    "51": "https://openweathermap.org/img/wn/09d@2x.png",
    "53": "https://openweathermap.org/img/wn/09d@2x.png",
    "55": "https://openweathermap.org/img/wn/09d@2x.png",
    "56": "https://openweathermap.org/img/wn/13d@2x.png",
    "57": "https://openweathermap.org/img/wn/13d@2x.png",
    "61": "https://openweathermap.org/img/wn/10d@2x.png",
    "63": "https://openweathermap.org/img/wn/10d@2x.png",
    "65": "https://openweathermap.org/img/wn/10d@2x.png",
    "66": "https://openweathermap.org/img/wn/13d@2x.png",
    "67": "https://openweathermap.org/img/wn/13d@2x.png",
    "71": "https://openweathermap.org/img/wn/13d@2x.png",
    "73": "https://openweathermap.org/img/wn/13d@2x.png",
    "75": "https://openweathermap.org/img/wn/13d@2x.png",
    "77": "https://openweathermap.org/img/wn/13d@2x.png",
    "80": "https://openweathermap.org/img/wn/09d@2x.png",
    "81": "https://openweathermap.org/img/wn/09d@2x.png",
    "82": "https://openweathermap.org/img/wn/09d@2x.png",
    "85": "https://openweathermap.org/img/wn/13d@2x.png",
    "86": "https://openweathermap.org/img/wn/13d@2x.png",
    "95": "https://openweathermap.org/img/wn/11d@2x.png",
    "96": "https://openweathermap.org/img/wn/11d@2x.png",
    "99": "https://openweathermap.org/img/wn/11d@2x.png"
  };

  return weatherImages[code] || "Unknown weather code";
}

function getWeatherDescription(code) {
    const weatherDescriptions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snowfall",
        73: "Moderate snowfall",
        75: "Heavy snowfall",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Slight thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };

    return weatherDescriptions[code] || "Unknown weather code";
}

function convertDateFormat(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const formattedDate = `${day} ${month}`;
  return formattedDate;
}

function getDateAndTime(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const formattedDateTime = `${day} ${month} ${year} - ${hours}:${minutes}`;
  return formattedDateTime; 
}

function getTime(dateString) {
const date = new Date(dateString);
const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');
const formattedTime = `${hours}:${minutes}`;
return formattedTime;
}

//Select all toggle

document.getElementById('select-all').addEventListener('change', function() {
  const allCheckboxes = document.querySelectorAll('.check-box-container');
  const selectAllChecked = this.checked;

  allCheckboxes.forEach(checkbox => {
    checkbox.checked = selectAllChecked;
  });
});


//Collapsible window for advanced search filter table

document.addEventListener('DOMContentLoaded', function() {
  const collapsibleTitle = document.querySelector('.collapsible-title');
  const collapsibleContent = document.querySelector('.collapsible-content');

  collapsibleContent.style.display = 'none'; 

  collapsibleTitle.addEventListener('click', function() {
      if (collapsibleContent.style.display === 'none' || collapsibleContent.style.display === '') {
          collapsibleContent.style.display = 'flex';
          collapsibleTitle.textContent = 'Advanced Search ⬇️'; 
      } else {
          collapsibleContent.style.display = 'none';
          collapsibleTitle.textContent = 'Advanced Search ➡️'; 
      }
  });
});


// Function to fetch weather data and create the panel
function fetchWeatherData(capital) {
  const { timezone, latitude, longitude, country, name } = capital;

  fetch(`httpss://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=${timezone}`)
    .then(response => response.json())
    .then(weatherData => {
      const capitalsPanel = document.querySelector('.capitals');
      const singlePanel = document.createElement('div');
      singlePanel.className = 'single-panel';
      
      const capitalName = document.createElement('h1');
      capitalName.className = 'city-name';
      capitalName.innerText = name;

      const capitalCountry = document.createElement('h2');
      capitalCountry.className = 'country-name';
      capitalCountry.innerText = country;

      const dateTime = document.createElement('p');
      dateTime.className = 'date-time';
      dateTime.innerHTML = getDateAndTime(weatherData.current.time);

      const weatherImage = document.createElement('img');
      weatherImage.src = getWeatherImage(weatherData.current.weather_code);
      weatherImage.alt = getWeatherDescription(weatherData.current.weather_code);
      weatherImage.className = 'weather-image-card';

      const temperature = document.createElement('p');
      temperature.className = 'temperature';
      temperature.innerHTML = `${Math.floor(weatherData.current.temperature_2m)}°C`;

      const weatherCode = document.createElement('p');
      weatherCode.className = 'weather-code';
      weatherCode.innerHTML = getWeatherDescription(weatherData.current.weather_code);

      const humidityPanel = document.createElement('div');
      humidityPanel.className = 'humidity-show';
      
      const humidityIcon = document.createElement('img');
      humidityIcon.src = './assets/humidity.png';
      humidityIcon.alt = 'humidity and percentage symbols';
      humidityIcon.className = 'humidity-symbol';
      
      const humidity = document.createElement('p');
      humidity.className = 'humidity';
      humidity.innerHTML = `${weatherData.current.relative_humidity_2m}%`;
      humidityPanel.appendChild(humidityIcon);
      humidityPanel.appendChild(humidity);

      capitalsPanel.appendChild(singlePanel);
      singlePanel.appendChild(capitalName);
      singlePanel.appendChild(capitalCountry);
      singlePanel.appendChild(dateTime);
      singlePanel.appendChild(weatherImage);
      singlePanel.appendChild(temperature);
      singlePanel.appendChild(weatherCode);
      singlePanel.appendChild(humidityPanel);
    });
}

threeCapitals.forEach(fetchWeatherData);

lookUpCity.addEventListener('submit', (event) => {
  event.preventDefault();
  handleEvent();
  const logo = document.querySelector('#logo');
  logo.style.height = '12rem';
});

function handleEvent() {

  const inputValue = inputField.value.trim();

  if (!inputValue) return;

  const defaultCapitals = document.querySelector(".capitals");
  defaultCapitals.style.display = 'none';

  clearPreviousResults();

  const apiGeoEndcode = `httpss://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=1&language=en&format=json`;

  console.log(apiGeoEndcode);

  fetch(apiGeoEndcode)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const cityName = document.createElement('h1');
      cityName.className = 'city-name';

      if (data.results && data.results.length > 0) {
        let longitude = data.results[0].longitude;
        let latitude = data.results[0].latitude;
        let timezone = data.results[0].timezone;
        let country = data.results[0].country;
        let city = data.results[0].name;
        let admin1 = data.results[0].admin1;
        console.log('Longitude:', longitude, 'Latitude:', latitude);

        cityName.innerText = `${city}`;

        const adminCountry = document.createElement('h2');
        adminCountry.className = 'admin-country';
        adminCountry.innerText = `${admin1}, ${country}`;


        const apiWeatherEncode = `httpss://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=${timezone}`;
        console.log(apiWeatherEncode);
        
        fetch(apiWeatherEncode)
          .then(response => response.json())
          .then(weatherData => {
            console.log(weatherData);

            const dateTime = document.createElement('p');
            dateTime.className = 'date-time';
            dateTime.innerHTML = getDateAndTime(weatherData.current.time);

            const sunsetSunriseLeft = document.createElement('div');
            sunsetSunriseLeft.className = 'sunset-sunrise';
            
            const sunIconLeft = document.createElement('img');
            sunIconLeft.src = './assets/sun-morning.png';
            sunIconLeft.alt = 'sun';
            sunIconLeft.className = 'sun';
            sunsetSunriseLeft.appendChild(sunIconLeft);

            const sunriseLeft = document.createElement('p');
            sunriseLeft.className = 'time';
            sunriseLeft.innerText = getTime(weatherData.daily.sunrise[0]);
            sunsetSunriseLeft.appendChild(sunriseLeft);

            const moonIconLeft = document.createElement('img');
            moonIconLeft.src = './assets/moon-evening.png';
            moonIconLeft.alt = 'moon';
            moonIconLeft.className = 'moon';
            sunsetSunriseLeft.appendChild(moonIconLeft);

            const sunsetLeft = document.createElement('p');
            sunsetLeft.className = 'time';
            sunsetLeft.innerText = getTime(weatherData.daily.sunset[0]);
            sunsetSunriseLeft.appendChild(sunsetLeft);
          
            const temperature = document.createElement('p');
            temperature.className = 'temperature';
            temperature.innerHTML = `${Math.floor(weatherData.current.temperature_2m)}°C`;

            const weatherCode = document.createElement('p');
            weatherCode.className = 'weather-code';
            weatherCode.innerHTML = getWeatherDescription(weatherData.current.weather_code);

            const humidityPanel = document.createElement('div');
            humidityPanel.className = 'humidity-show';
            
            const humidityIcon = document.createElement('img');
            humidityIcon.src = './assets/humidity.png';
            humidityIcon.alt = 'humidity and percentage symbols';
            humidityIcon.className = 'humidity-symbol';
            
            const humidity = document.createElement('p');
            humidity.className = 'humidity';
            humidity.innerHTML = `${weatherData.current.relative_humidity_2m}%`;
            humidityPanel.appendChild(humidityIcon);
            humidityPanel.appendChild(humidity);

            const weatherCodeImage = document.createElement('img');
            weatherCodeImage.src = getWeatherImage(weatherData.current.weather_code);
            weatherCodeImage.alt = getWeatherDescription(weatherData.current.weather_code);

          
            header.style.alignSelf = 'baseline';

            const weatherBoard = document.createElement('div');
            weatherBoard.className = 'weather-board';
            main.appendChild(weatherBoard);

            const leftPanel = document.createElement('div');
            leftPanel.className = 'left-panel';
            weatherBoard.appendChild(leftPanel);
            leftPanel.appendChild(cityName);
            leftPanel.appendChild(adminCountry);
            leftPanel.appendChild(dateTime);
            leftPanel.appendChild(sunsetSunriseLeft);
            leftPanel.appendChild(weatherCodeImage);
            leftPanel.appendChild(temperature);
            leftPanel.appendChild(weatherCode);
            leftPanel.appendChild(humidityPanel);
            

            const rightPanel = document.createElement('div');
            rightPanel.className = 'right-panel';
            weatherBoard.appendChild(rightPanel);

            const timeArray = weatherData.daily.time;
            const slicedArray = timeArray.slice(1);

            console.log('Original array:', timeArray);
            console.log('Array after slice(1):', slicedArray);

            slicedArray.forEach((date, index) => {
                const nextDay = document.createElement('div');
                nextDay.className = 'next-day';
                rightPanel.appendChild(nextDay);

                const dayMonth = document.createElement('p');
                dayMonth.className = 'day-month';
                dayMonth.innerText = convertDateFormat(timeArray[index + 1]);
                nextDay.appendChild(dayMonth);

                const sunsetSunriseRight = document.createElement('div');
                sunsetSunriseRight.className = 'sunset-sunrise';
            
                const sunIconRight = document.createElement('img');
                sunIconRight.src = './assets/sun-morning.png';
                sunIconRight.alt = 'sun';
                sunIconRight.className = 'sun';
                sunsetSunriseRight.appendChild(sunIconRight);

                const sunriseRight = document.createElement('p');
                sunriseRight.className = 'time';
                sunriseRight.innerText = getTime(weatherData.daily.sunrise[index + 1]);
                sunsetSunriseRight.appendChild(sunriseRight);

                const moonIconRight = document.createElement('img');
                moonIconRight.src = './assets/moon-evening.png';
                moonIconRight.alt = 'moon';
                moonIconRight.className = 'moon';
                sunsetSunriseRight.appendChild(moonIconRight);

                const sunsetRight = document.createElement('p');
                sunsetRight.className = 'time';
                sunsetRight.innerText = getTime(weatherData.daily.sunset[index + 1]);
                sunsetSunriseRight.appendChild(sunsetRight);
                nextDay.appendChild(sunsetSunriseRight);


                const weatherCodeRight = document.createElement('p');
                weatherCodeRight.className = 'weather-code';
                weatherCodeRight.innerHTML = getWeatherDescription(weatherData.daily.weather_code[index +1]);
                nextDay.appendChild(weatherCodeRight);

                const nextDayImage = document.createElement('img');
                nextDayImage.src = getWeatherImage(weatherData.current.weather_code);
                nextDayImage.alt = getWeatherDescription(weatherData.current.weather_code);
                nextDay.appendChild(nextDayImage);


                const maxMinTemp = document.createElement('p');
                maxMinTemp.className = 'max-min-temp';
                maxMinTemp.innerText = `${Math.floor(weatherData.daily.temperature_2m_max[index + 1])}°C / ${Math.floor(weatherData.daily.temperature_2m_min[index + 1])}°C`;
                nextDay.appendChild(maxMinTemp);






            console.log(`Processing date: ${date} (original index: ${index + 1})`);
});
          })

          .catch(error => console.error('Error fetching weather data:', error));
          
      } else {
        cityName.innerText = "Name not recognised";
        cityName.style.fontSize = "2rem";

        main.removeChild(placeSearch);
        header.appendChild(placeSearch);
        // header.style.alignSelf = 'baseline';

        const weatherBoard = document.createElement('div');
        weatherBoard.className = 'weather-board';
        main.appendChild(weatherBoard);

        const leftPanel = document.createElement('div');
        leftPanel.className = 'left-panel';
        weatherBoard.appendChild(leftPanel);
        leftPanel.appendChild(cityName);

        const rightPanel = document.createElement('div');
        rightPanel.className = 'right-panel';
        weatherBoard.appendChild(rightPanel);
      }
    })
    .catch(error => console.error('Error fetching geocoding data:', error));

  
  inputField.value = '';
  inputField.focus();
}

function clearPreviousResults() {
  const existingWeatherBoard = document.querySelector('.weather-board');
  if (existingWeatherBoard) {
    existingWeatherBoard.remove();
  }
}

function clearPrevDetailedResults() {
  const existingDetailedBoard = document.querySelector('.detailed-results');
  if (existingDetailedBoard) {
    existingDetailedBoard.remove();
  }
}


// Advanced Search functions


document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.querySelector("#filter-list");
  

  filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleDetailedSearch();

    const logo = document.querySelector('#logo');
    logo.style.height = '12rem';
  });
});

function handleDetailedSearch() {
  const detailedInput = document.querySelector("#detailed-city-name"); 
  const inputValue = detailedInput.value.trim();

  if (!inputValue) return;

  const defaultCapitals = document.querySelector(".capitals");
  defaultCapitals.style.display = 'none';
  
  clearPreviousResults();
  clearPrevDetailedResults();

  // Step 1: First API call to get city coordinates
  const apiGeoEndcode = `httpss://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=1&language=en&format=json`;

  fetch(apiGeoEndcode)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.results && data.results.length > 0) {
        let longitude = data.results[0].longitude;
        let latitude = data.results[0].latitude;
        let country = data.results[0].country;
        let city = data.results[0].name;
        let admin1 = data.results[0].admin1;

        // Display city information
        const weatherContainer = document.createElement('div');
        weatherContainer.className = 'detailed-results';
        weatherContainer.innerHTML = '';
        document.querySelector('main').appendChild(weatherContainer);

        const cityName = document.createElement('h1');
        cityName.className = 'city-name';
        cityName.innerText = `${city}`;

        const adminCountry = document.createElement('h2');
        adminCountry.className = 'admin-country';
        adminCountry.innerText = `${admin1}, ${country}`;

        weatherContainer.appendChild(cityName);
        weatherContainer.appendChild(adminCountry);
        

        // Step 2: Get the checked filters from the checkboxes
        const dailyCheckBoxes = document.querySelectorAll(".daily-filters > .filters input:checked");
        const currentCheckBoxes = document.querySelectorAll(".current-filters > .filters input:checked");

        const getCheckedFilters = (checkboxes) => {
          return Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        };

        let dailyFilters = getCheckedFilters(dailyCheckBoxes);
        let currentFilters = getCheckedFilters(currentCheckBoxes);

        console.log('Daily Filters:', dailyFilters);
        console.log('Current Filters:', currentFilters);

        // Step 3: Build the API URL
        let apiWeatherEncode = `httpss://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`;

        if (dailyFilters.length > 0) {
          apiWeatherEncode += `&daily=${dailyFilters.join(',')}`;
        }
        if (currentFilters.length > 0) {
          apiWeatherEncode += `&current=${currentFilters.join(',')}`;
        }

        apiWeatherEncode += `&timezone=auto`;

        console.log("Final API URL:", apiWeatherEncode);

        // Step 4: Make the second API call to get weather data
        fetch(apiWeatherEncode)
          .then(response => {
            if (!response.ok) {
              throw new Error('Weather API response was not ok');
            }
            return response.json();
          })
          .then(weatherData => {
            console.log('Weather data:', weatherData);
            const dateTime = document.createElement('p');
            dateTime.className = 'date-time';
            dateTime.innerHTML = getDateAndTime(weatherData.current.time);
            weatherContainer.appendChild(dateTime);
            displayWeatherData(dailyFilters, currentFilters, weatherData, weatherContainer);
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });
      }
    })
    .catch(error => {
      console.error('Error fetching city data:', error);
    });
}

function createWeatherTemplate(filter, data, isDaily = true) {
  const container = document.createElement('div');
  let text;

  if (isDaily) {
    switch (filter) {
      case "weather_code":
        text = `Weather Description: ${data || 'N/A'}`;
        break;
      case "temperature_2m_max":
        text = `Max Temperature: ${data || 'N/A'}`;
        break;
      case "temperature_2m_min":
        text = `Min Temperature: ${data || 'N/A'}°C`;
        break;
      case "apparent_temperature_max":
        text = `Max Apparent Temperature: ${data || 'N/A'}°C`;
        break;
      case "apparent_temperature_min":
        text = `Min Apparent Temperature: ${data || 'N/A'}°C`;
        break;
      case "sunrise":
        text = `Sunrise: ${data || 'N/A'}`;
        break;
      case "sunset":
        text = `Sunset: ${data || 'N/A'}`;
        break;
      case "daylight_duration":
        text = `Daylight Duration: ${data || 'N/A'} hours`;
        break;
      case "uv_index_max":
        text = `UV Index: ${data || 'N/A'}`;
        break;
      case "uv_index_clear_sky_max":
        text = `UV Index Clear Sky: ${data || 'N/A'}`;
        break;
      case "precipitation_sum":
        text = `Precipitation Sum: ${data || 'N/A'} mm`;
        break;
      case "rain_sum":
        text = `Rain Sum: ${data || 'N/A'} mm`;
        break;
      case "showers_sum":
        text = `Showers Sum: ${data || 'N/A'} mm`;
        break;
      case "snowfall_sum":
        text = `Snowfall Sum: ${data || 'N/A'} mm`;
        break;
      case "precipitation_hours":
        text = `Precipitation Hours: ${data || 'N/A'} hours`;
        break;
      case "precipitation_probability_max":
        text = `Precipitation Probability Max: ${data || 'N/A'}%`;
        break;
      case "wind_speed_10m_max":
        text = `Maximum Wind Speed: ${data || 'N/A'} km/h`;
        break;
      case "wind_gusts_10m_max":
        text = `Maximum Wind Gusts: ${data || 'N/A'} km/h`;
        break;
      case "wind_direction_10m_dominant":
        text = `Dominant Wind Direction: ${data || 'N/A'}`;
        break;
      default:
        text = `${weatherParameterNames[filter] || 'Unknown'}: ${data || 'N/A'}`;
        break;
    }
  } else {
    switch (filter) {
      case "temperature_2m":
        text = `Temperature: ${data || 'N/A'}°C`;
        break;
      case "relative_humidity_2m":
        text = `Relative Humidity: ${data || 'N/A'}%`;
        break;
      case "apparent_temperature":
        text = `Apparent Temperature: ${data || 'N/A'}°C`;
        break;
      case "is_day":
        text = `Is Day or Night: ${data ? 'Day' : 'Night'}`;
        break;
      case "precipitation":
        text = `Precipitation: ${data || 'N/A'} mm`;
        break;
      case "rain":
        text = `Rain: ${data || 'N/A'} mm`;
        break;
      case "showers":
        text = `Showers: ${data || 'N/A'} mm`;
        break;
      case "snowfall":
        text = `Snowfall: ${data || 'N/A'} mm`;
        break;
      case "weather_code":
        text = `Weather Description: ${data || 'N/A'}`;
        break;
      case "cloud_cover":
        text = `Cloud Cover Total: ${data || 'N/A'}%`;
        break;
      case "wind_speed_10m":
        text = `Wind Speed: ${data || 'N/A'} km/h`;
        break;
      case "wind_direction_10m":
        text = `Wind Direction: ${data || 'N/A'}`;
        break;
      case "wind_gusts_10m":
        text = `Wind Gusts: ${data || 'N/A'} km/h`;
        break;
      default:
        text = `${weatherParameterNames[filter] || 'Unknown'}: ${data || 'N/A'}`;
        break;
    }
  }

  container.innerText = text;
  return container;
}

function displayWeatherData(currentWeather, dailyFilters, weatherData, weatherContainer, currentFilters) {
  const timeLabels = weatherData.daily.time.map(time => new Date(time).toLocaleDateString());

  const dailyCheckBoxes = document.querySelectorAll(".daily-filters > .filters input:checked");
        const currentCheckBoxes = document.querySelectorAll(".current-filters > .filters input:checked");
  
  const getCheckedFilters = (checkboxes) => {
    return Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
  };

  dailyFilters = getCheckedFilters(dailyCheckBoxes);
  currentFilters = getCheckedFilters(currentCheckBoxes);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function createChart(containerId, categoryName, labels, datasets) {
    const canvas = document.createElement('canvas');
    canvas.id = containerId;

    canvas.removeAttribute('width');
    canvas.removeAttribute('height');


    weatherContainer.appendChild(canvas);


    new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${categoryName} Data`,
            font: {
              size: 20,
              family: '"Fredoka", sans-serif'
            }
          },
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 20,
                family: '"Fredoka", sans-serif'
              }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date',
              font: {
                size: 20,
                family: '"Fredoka", sans-serif',
              }
            },
            ticks: {
              font: {
                size: 20,
                family: '"Fredoka", sans-serif' 
              }
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Value',
              font: {
                size: 20, 
                family: '"Fredoka", sans-serif', 
              }
            },
            ticks: {
              font: {
                size: 20,
                family: '"Fredoka", sans-serif' 
              }
            }
          }
        }
      }
    });

  }

  // Function to display current weather data (with filters)
  function displayCurrentWeather(currentWeatherData, currentFilters) {
    if (currentFilters.length > 0) {
      const currentDetailed = document.createElement('div');
      currentDetailed.className = 'daily-detailed-flex';
      weatherContainer.appendChild(currentDetailed);

      const currentTitle = document.createElement('h3');
      currentTitle.innerText = 'Current Weather';
      currentDetailed.appendChild(currentTitle);
      const currentWeatherData = weatherData.current;

      currentFilters.forEach(filter => {
        const currentData = currentWeatherData[filter]; 
        const currentElement = document.createElement('div');
        if (filter === 'weather_code') {
          currentElement.innerText = `${weatherParameterNames[filter]}: ${getWeatherDescription(currentData)}`;
        } else {
          currentElement.innerText = `${weatherParameterNames[filter]}: ${currentData} ${weatherData.current_units[filter]}`;
        }
        currentDetailed.appendChild(currentElement);
      });
    }
  }

  // Display the current weather data based on currentFilters
  displayCurrentWeather(currentWeather, currentFilters);

  // Group daily filters and create charts

  const temperatureGroup = ['temperature_2m_max', 'temperature_2m_min', 'apparent_temperature_max', 'apparent_temperature_min'];
  const precipitationGroup = ['precipitation_sum', 'rain_sum', 'showers_sum', 'snowfall_sum', 'precipitation_hours'];
  const sunAndWindGroup = ['wind_speed_10m_max', 'wind_gusts_10m_max', 'uv_index_max', 'uv_index_clear_sky_max'];

  const dailyDetailed = document.createElement('div');
  dailyDetailed.className = 'daily-detailed-flex';
  weatherContainer.appendChild(dailyDetailed);
  
  const dailyTitle = document.createElement('h3');
  dailyTitle.innerText = 'Daily Forecast';
  dailyDetailed.appendChild(dailyTitle);

  
  const temperatureDatasets = temperatureGroup.map(filter => ({
    label: weatherParameterNames[filter],
    data: weatherData.daily[filter],
    borderColor: getRandomColor(),
    fill: false,
    tension: 0.1
  }));

  createChart('temperatureChart', 'Temperature', timeLabels, temperatureDatasets);

  const precipitationDatasets = precipitationGroup.map(filter => ({
    label: weatherParameterNames[filter],
    data: weatherData.daily[filter],
    borderColor: getRandomColor(),
    fill: false,
    tension: 0.1
  }));

  createChart('precipitationChart', 'Precipitation', timeLabels, precipitationDatasets);

  const sunAndWindDatasets = sunAndWindGroup.map(filter => ({
    label: weatherParameterNames[filter],
    data: weatherData.daily[filter],
    borderColor: getRandomColor(),
    fill: false,
    tension: 0.1
  }));

  createChart('sunAndWindChart', 'Sunshine & Wind', timeLabels, sunAndWindDatasets);
}

const weatherParameterNames = {
  // Daily Weather Predictions
  "weather_code": "Weather Description",
  "temperature_2m_max": "Max Temperature",
  "temperature_2m_min": "Min Temperature",
  "apparent_temperature_max": "Max Apparent Temp.",
  "apparent_temperature_min": "Min Apparent Temp.",
  "sunrise": "Sunrise",
  "sunset": "Sunset",
  "daylight_duration": "Daylight Duration",
  "uv_index_max": "UV Index",
  "uv_index_clear_sky_max": "UV Index Clear Sky",
  "precipitation_sum": "Precipitation Sum",
  "rain_sum": "Rain Sum",
  "showers_sum": "Showers Sum",
  "snowfall_sum": "Snowfall Sum",
  "precipitation_hours": "Precipitation Hours",
  "precipitation_probability_max": "Precipitation Prob Max",
  "wind_speed_10m_max": "Maximum Wind Speed",
  "wind_gusts_10m_max": "Maximum Wind Gusts",
  "wind_direction_10m_dominant": "Dominant Wind Direction",

  // Current Weather
  "temperature_2m": "Temperature",
  "relative_humidity_2m": "Relative Humidity",
  "apparent_temperature": "Apparent Temperature",
  "is_day": "Is Day or Night",
  "precipitation": "Precipitation",
  "rain": "Rain",
  "showers": "Showers",
  "snowfall": "Snowfall",
  "weather_code": "Weather Description",
  "cloud_cover": "Cloud Cover Total",
  "wind_speed_10m": "Wind Speed",
  "wind_direction_10m": "Wind Direction",
  "wind_gusts_10m": "Wind Gusts"
};




        
