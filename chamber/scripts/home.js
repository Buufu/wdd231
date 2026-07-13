const weatherApiKey = 'f5a768d775b2391e02fbd7bd8d6608de';
const weatherCity = 'Kampala';
const weatherTemp = document.querySelector('#weather-temp');
const weatherDescription = document.querySelector('#weather-description');
const weatherIcon = document.querySelector('#weather-icon');
const forecast = document.querySelector('#forecast');
const spotlightsContainer = document.querySelector('#spotlights');

async function getWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&appid=${weatherApiKey}&units=metric`);
    if (!response.ok) throw new Error('Unable to load weather data.');
    const data = await response.json();
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${weatherCity}&appid=${weatherApiKey}&units=metric`);
    const forecastData = await forecastResponse.json();

    if (weatherTemp) {
      weatherTemp.textContent = `${Math.round(data.main.temp)}°C`;
    }
    if (weatherDescription) {
      weatherDescription.textContent = data.weather[0].description;
    }
    if (weatherIcon) {
      weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" />`;
    }

    if (forecast) {
      const nextDays = forecastData.list.filter((entry, index) => index % 8 === 0).slice(0, 3);
      forecast.innerHTML = nextDays
        .map((entry) => {
          const date = new Date(entry.dt_txt);
          return `<li><strong>${date.toLocaleDateString('en-US', { weekday: 'short' })}</strong> ${Math.round(entry.main.temp)}°C</li>`;
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
