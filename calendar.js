async function initializeCalendar() {

    const container = document.getElementById("events-container");

    if (!container) return;

    const page = window.location.pathname.toLowerCase();

    const events = await loadEvents();

    container.innerHTML = "";

    if (page.includes("day")) {

        const today = new Date().getDate().toString();

        const dayEvents = events.filter(event =>
            event.date.includes(today)
        );

        (dayEvents.length ? dayEvents : events).forEach(addEventCard);

    }

    else if (page.includes("week")) {

        events.forEach(addEventCard);

    }

}

function addEventCard(event) {

    const container = document.getElementById("events-container");

    const card = document.createElement("div");

    card.className = "event";

    card.innerHTML = `
        <h2>${event.title}</h2>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
    `;

    container.appendChild(card);

}

initializeCalendar();

const days = document.querySelectorAll(".calendar-day");

days.forEach(day => {

    day.addEventListener("click", async function () {

        const events = await loadEvents();

        const dayNumber = this.textContent.trim();

        this.innerHTML = `<strong>${dayNumber}</strong>`;

        events.forEach(event => {

            if (event.date.includes(dayNumber)) {

                this.innerHTML += `<br><small>${event.title}</small>`;

            }

        });

    });

});