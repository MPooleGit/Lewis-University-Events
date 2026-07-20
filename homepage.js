let allEvents = [];

document.addEventListener("DOMContentLoaded", async () => {

    // Load theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    setupMusic();

    await initializeHomepage();

});

async function initializeHomepage() {

    const container = document.getElementById("event-container");

    if (!container) return;

    allEvents = await loadEvents();

    displayEvents(allEvents);

}

function displayEvents(events) {

    const container = document.getElementById("event-container");

    container.innerHTML = "";

    events.forEach(event => {

        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `
            <h2>${event.title}</h2>

            <p><strong>Date:</strong> ${event.date}</p>

            <p><strong>Time:</strong> ${event.time}</p>

            <p><strong>Location:</strong> ${event.location}</p>

            <div class="event-details">

                <p>${event.description || "No description available."}</p>

            </div>
        `;

        card.addEventListener("click", () => {
            card.classList.toggle("expanded");
        });

        container.appendChild(card);

    });

}

function searchEvents() {

    const value = document
        .getElementById("searchBar")
        .value
        .toLowerCase();

    const filtered = allEvents.filter(event => {

        return (
            event.title.toLowerCase().includes(value) ||
            event.date.toLowerCase().includes(value) ||
            event.time.toLowerCase().includes(value) ||
            event.location.toLowerCase().includes(value) ||
            (event.description || "").toLowerCase().includes(value)
        );

    });

    displayEvents(filtered);

}

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode")
            ? "dark"
            : "light"
    );

}

function startClock(){

    function update(){

        const now = new Date();

        let hours = now.getHours();

        const minutes = String(now.getMinutes()).padStart(2,"0");

        const seconds = String(now.getSeconds()).padStart(2,"0");

        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;

        if(hours === 0) hours = 12;

        document.getElementById("clock").textContent =
            `${hours}:${minutes}:${seconds} ${ampm}`;

    }

    update();

    setInterval(update,1000);

}

startClock();