// script.js

// Footer Year
const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

// ---------------- Weather Section ----------------
const weatherContainer = document.getElementById("current-weather");
const forecastContainer = document.getElementById("forecast");

// Replace with your actual OpenWeatherMap API key
const apiKey = "YOUR_API_KEY_HERE";
const city = "Kwekwe"; // Chamber location
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();

    // Current weather (first item)
    const current = data.list[0];
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description;

    weatherContainer.innerHTML = `<p><strong>${city}</strong>: ${temp}&deg;C, ${desc}</p>`;

    // 3-day forecast (next days at 12:00)
    forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";
    let daysShown = 0;
    for (let i = 0; i < data.list.length && daysShown < 3; i++) {
      if (data.list[i].dt_txt.includes("12:00:00")) {
        const dayTemp = Math.round(data.list[i].main.temp);
        const dayDesc = data.list[i].weather[0].description;
        const date = new Date(data.list[i].dt_txt);
        const day = date.toLocaleDateString(undefined, { weekday: 'long' });

        forecastContainer.innerHTML += `<p>${day}: ${dayTemp}&deg;C, ${dayDesc}</p>`;
        daysShown++;
      }
    }
  } catch (error) {
    weatherContainer.textContent = "Unable to load weather data.";
    console.error(error);
  }
}

fetchWeather();

// ---------------- Spotlights Section ----------------
const spotlightContainer = document.getElementById("spotlight-container");

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // Filter gold and silver members
    const eligible = members.filter(m => m.membershipLevel === "Gold" || m.membershipLevel === "Silver");

    // Shuffle and pick 2-3
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

    spotlightContainer.innerHTML = "";
    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");
      card.innerHTML = `
        <img src="images/${member.logo}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>📞 ${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p><strong>${member.membershipLevel} Member</strong></p>
      `;
      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    spotlightContainer.textContent = "Unable to load member spotlights.";
    console.error(error);
  }
}

loadSpotlights();
