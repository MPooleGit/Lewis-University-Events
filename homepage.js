async function initializeHomepage() {

    const container = document.getElementById("event-container");

    if (!container) return;

    const events = await loadEvents();

    container.innerHTML = "";

    events.forEach(event => {

        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `
            <h2>${event.title}</h2>
            <p>${event.date}</p>
            <p>${event.time}</p>
            <p>${event.location}</p>
        `;

        container.appendChild(card);

    });

}

function searchEvents() {

    const value = document
        .getElementById("searchBar")
        .value
        .toLowerCase();

    const cards = document.querySelectorAll(".event-card");

    cards.forEach(card => {

        if (card.innerText.toLowerCase().includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}

initializeHomepage();