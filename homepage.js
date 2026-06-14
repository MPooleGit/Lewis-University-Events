async function initializeHomepage()
{
    const container =
    document.getElementById(
        "event-container"
    );

    const events =
    await loadEvents();

    container.innerHTML = "";

    events.forEach(event =>
    {
        const card =
        document.createElement("div");

        card.classList.add(
            "event-card"
        );

        card.innerHTML = `
            <h2>${event.title}</h2>

            <p>${event.date}</p>

            <p>${event.location}</p>

            <button
            onclick="viewEvent(${event.id})">

            View Details

            </button>
        `;

        container.appendChild(card);
    });
}

function viewEvent(id)
{
    window.location.href =
    `event.html?id=${id}`;
}

initializeHomepage();

    cards.forEach(card => {

        if(
            card.innerText
            .toLowerCase()
            .includes(value)
        )
        {
            card.style.display =
            "block";
        }
        else
        {
            card.style.display =
            "none";
        }

    });
}
