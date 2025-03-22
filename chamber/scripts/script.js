document.addEventListener("DOMContentLoaded", function () {
    const membersContainer = document.getElementById("membersContainer");
    const toggleButton = document.getElementById("toggleView");

    // Fetch and display Chamber Members
    async function fetchMembers() {
        const response = await fetch("data/members.json");
        const data = await response.json();
        displayMembers(data.members);
        loadSpotlightMembers(data.members);
    }

    function displayMembers(members) {
        membersContainer.innerHTML = "";
        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${member.membership}</p>
            `;
            membersContainer.appendChild(card);
        });
    }

    // Toggle between Grid & List View
    toggleButton.addEventListener("click", () => {
        membersContainer.classList.toggle("grid-view");
        membersContainer.classList.toggle("list-view");
    });

    // Fetch and display weather data
    async function fetchWeather() {
        const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // 🔹 Replace with your API Key
        const city = "Kwekwe";
        const countryCode = "ZW";
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Extract current weather
            const currentTemp = Math.round(data.list[0].main.temp);
            const weatherDesc = capitalizeWords(data.list[0].weather.map(w => w.description).join(", "));

            // Extract 3-day forecast
            const forecast = data.list.filter((item) => item.dt_txt.includes("12:00:00")).slice(0, 3);
            let forecastHTML = "";
            forecast.forEach(day => {
                const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
                const temp = Math.round(day.main.temp);
                forecastHTML += `<li>${date}: ${temp}°C</li>`;
            });

            // Update Weather Section
            document.getElementById("currentTemp").textContent = `${currentTemp}°C`;
            document.getElementById("weatherDesc").textContent = weatherDesc;
            document.getElementById("forecast").innerHTML = forecastHTML;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            document.getElementById("weatherSection").innerHTML = "<p>Unable to load weather data.</p>";
        }
    }

    // Load random Gold/Silver members as spotlights
    function loadSpotlightMembers(members) {
        const eligibleMembers = members.filter(member =>
            member.membership === "Gold" || member.membership === "Silver"
        );

        // Shuffle and pick 2-3 random members
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        const selectedSpotlights = shuffled.slice(0, 3);

        // Display Spotlights
        let spotlightHTML = "";
        selectedSpotlights.forEach(member => {
            spotlightHTML += `
                <div class="spotlight-card">
                    <img src="images/${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p class="membership-level">${member.membership} Member</p>
                </div>
            `;
        });

        document.getElementById("spotlightSection").innerHTML = spotlightHTML;
    }

    // Capitalize Each Word in a String
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    // Initialize Page Data
    fetchMembers();
    fetchWeather();

    // Update Footer Date
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});
