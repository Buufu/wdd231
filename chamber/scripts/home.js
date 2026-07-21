const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=0.3476&longitude=32.5825&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Africa%2FKampala&forecast_days=7';
const weatherTemp = document.querySelector('#weather-temp');
const weatherDescription = document.querySelector('#weather-description');
const weatherIcon = document.querySelector('#weather-icon');
const forecast = document.querySelector('#forecast');
const spotlightsContainer = document.querySelector('#spotlights');

function getWeatherDescription(code) {
  switch (code) {
    case 0:
      return 'Clear sky';
    case 1:
    case 2:
    case 3:
      return 'Partly cloudy';
    case 45:
    case 48:
      return 'Foggy';
    case 51:
    case 53:
    case 55:
      return 'Drizzle';
    case 61:
    case 63:
    case 65:
      return 'Rain';
    case 66:
    case 67:
      return 'Freezing rain';
    case 71:
    case 73:
    case 75:
      return 'Snow';
    case 80:
    case 81:
    case 82:
      return 'Showers';
    case 95:
    case 96:
    case 99:
      return 'Thunderstorms';
    default:
      return 'Cloudy';
  }
}

function getWeatherIcon(code) {
  switch (code) {
    case 0:
      return '☀️';
    case 1:
    case 2:
    case 3:
      return '⛅';
    case 45:
    case 48:
      return '🌫️';
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return '🌧️';
    case 71:
    case 73:
    case 75:
      return '❄️';
    case 95:
    case 96:
    case 99:
      return '⛈️';
    default:
      return '☁️';
  }
}

async function getWeather() {
  try {
    const response = await fetch(weatherApiUrl);
    if (!response.ok) throw new Error('Unable to load weather data.');
    const data = await response.json();
    const currentTemp = data.current?.temperature_2m;
    const weatherCode = data.current?.weather_code;
    const description = getWeatherDescription(weatherCode);
    const icon = getWeatherIcon(weatherCode);

    if (weatherTemp) {
      weatherTemp.textContent = currentTemp !== undefined ? `${Math.round(currentTemp)}°C` : 'Weather unavailable';
    }
    if (weatherDescription) {
      weatherDescription.textContent = description;
    }
    if (weatherIcon) {
      weatherIcon.innerHTML = `<span aria-hidden="true">${icon}</span>`;
    }

    if (forecast && Array.isArray(data.daily?.time)) {
      const nextDays = data.daily.time.slice(1, 4).map((date, index) => ({
        date,
        maxTemp: data.daily.temperature_2m_max?.[index + 1],
        code: data.daily.weather_code?.[index + 1],
      }));

      forecast.innerHTML = nextDays
        .map((entry) => {
          const dayName = new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' });
          const temp = entry.maxTemp !== undefined ? `${Math.round(entry.maxTemp)}°C` : '—';
          return `<li><strong>${dayName}</strong> ${temp}</li>`;
        })
        .join('');
    }
  } catch (error) {
    console.error(error);
    if (weatherTemp) weatherTemp.textContent = 'Weather unavailable';
    if (weatherDescription) weatherDescription.textContent = 'Please try again later.';
  }
}

async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Unable to load members data.');
    const members = await response.json();
    const spotlightMembers = members
      .filter((member) => member.membershipLevel >= 2)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    if (spotlightsContainer) {
      spotlightsContainer.innerHTML = spotlightMembers
        .map((member) => `
          <article class="spotlight-card">
            <img src="${member.image.startsWith('http') ? member.image : `images/${member.image}`}" alt="${member.name}" loading="lazy">
            <div class="spotlight-body">
              <h3>${member.name}</h3>
              <p>${member.region}</p>
              <p>${member.address}</p>
              <p>${member.phone}</p>
              <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
              <p><strong>${member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member'}</strong></p>
            </div>
          </article>
        `)
        .join('');
    }
  } catch (error) {
    console.error(error);
  }
}

getWeather();
loadSpotlights();
