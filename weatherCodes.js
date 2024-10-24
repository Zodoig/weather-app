export function getWeatherImage(code) {
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
  
  export function getWeatherDescription(code) {
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

  export function createWeatherTemplate(filter, data, isDaily = true) {
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

  export const weatherParameterNames = {
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