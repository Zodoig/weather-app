//Imports
import { getWeatherDescription } from './weatherCodes.js';
import { weatherParameterNames } from './weatherCodes.js';

export function displayWeatherData(currentWeather, dailyFilters, weatherData, weatherContainer, currentFilters) {
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
      currentWeatherData = weatherData.current;

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