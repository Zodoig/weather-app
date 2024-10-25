//Imports
import { clearPreviousResults, clearPrevDetailedResults } from './clearResults.js';
import { convertDateFormat, getDateAndTime, getTime } from './dateFunctions.js';
import { displayWeatherData } from './displayWeatherData.js';
import { threeCapitals } from './threeCaps.js';
import { getWeatherImage, getWeatherDescription } from './weatherCodes.js';

//Global variables

const lookUpCity = document.querySelector('.lookup-city');
// const logo = document.querySelector('.logo');
const placeSearch = document.querySelector('.search-bar');
const main = document.querySelector('main');
const header = document.querySelector('header');
let inputField = document.querySelector('input');


// Select all toggle
document.getElementById('select-all').addEventListener('change', function() {
  const allCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]');
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

  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=${timezone}`)
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
//Show default 3 capitals on pageload
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
  clearPrevDetailedResults();
  const collapsibleContent = document.querySelector('.collapsible-content');
  collapsibleContent.style.display = 'none';

  const apiGeoEndcode = `https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=1&language=en&format=json`;

  // console.log(apiGeoEndcode);
  fetch(apiGeoEndcode)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // console.log(data);
      const cityName = document.createElement('h1');
      cityName.className = 'city-name';

      if (data.results && data.results.length > 0) {
        let longitude = data.results[0].longitude;
        let latitude = data.results[0].latitude;
        let timezone = data.results[0].timezone;
        let country = data.results[0].country;
        let city = data.results[0].name;
        let admin1 = data.results[0].admin1;
        // console.log('Longitude:', longitude, 'Latitude:', latitude);

        cityName.innerText = `${city}`;

        const adminCountry = document.createElement('h2');
        adminCountry.className = 'admin-country';
        adminCountry.innerText = `${admin1}, ${country}`;


        const apiWeatherEncode = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=${timezone}`;
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

// Advanced Search function
document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.querySelector("#filter-list");
  
  filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleDetailedSearch();

    const logo = document.querySelector('#logo');
    logo.style.height = '12rem';
  });
});

async function handleDetailedSearch() {
  const detailedInput = document.querySelector("#detailed-city-name"); 
  const inputValue = detailedInput.value.trim();

  if (!inputValue) return;

  const defaultCapitals = document.querySelector(".capitals");
  defaultCapitals.style.display = 'none';
  
  clearPreviousResults();
  clearPrevDetailedResults();
  const collapsibleContent = document.querySelector('.collapsible-content');
  collapsibleContent.style.display = 'none';

  // API call to get city coordinates
  const apiGeoEndcode = `https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=1&language=en&format=json`;

  try {
    const geoResponse = await fetch(apiGeoEndcode);
    if (!geoResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const geoData = await geoResponse.json();
    if (geoData.results && geoData.results.length > 0) {
      let longitude = geoData.results[0].longitude;
      let latitude = geoData.results[0].latitude;
      let country = geoData.results[0].country;
      let city = geoData.results[0].name;
      let admin1 = geoData.results[0].admin1;

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

      // Get the checked filters from the checkboxes
      const dailyCheckBoxes = document.querySelectorAll(".daily-filters .filters input:checked");
      const currentCheckBoxes = document.querySelectorAll(".current-filters .filters input:checked");

      const getCheckedFilters = (checkboxes) => {
        return Array.from(checkboxes)
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.value);
      };

      let dailyFilters = getCheckedFilters(dailyCheckBoxes);
      let currentFilters = getCheckedFilters(currentCheckBoxes);

      console.log('Daily Filters:', dailyFilters);
      console.log('Current Filters:', currentFilters);

      // Build the API URL
      let apiWeatherEncode = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`;

      if (dailyFilters.length > 0) {
        apiWeatherEncode += `&daily=${dailyFilters.join(',')}`;
      }
      if (currentFilters.length > 0) {
        apiWeatherEncode += `&current=${currentFilters.join(',')}`;
      }

      apiWeatherEncode += `&timezone=auto`;

      console.log("Final API URL:", apiWeatherEncode);

      // Make the second API call to get weather data
      try {
        const weatherResponse = await fetch(apiWeatherEncode);
        if (!weatherResponse.ok) {
          throw new Error('Weather API response was not ok');
        }
        const weatherData = await weatherResponse.json();
        console.log('Weather data:', weatherData);
        const dateTime = document.createElement('p');
        dateTime.className = 'date-time';
        dateTime.innerHTML = getDateAndTime(weatherData.current.time);
        weatherContainer.appendChild(dateTime);
        displayWeatherData(dailyFilters, currentFilters, weatherData, weatherContainer);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  } catch (error) {
    console.error('Error fetching city data:', error);
  }
}