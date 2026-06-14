async function initializeCalendar()
{
    const container =
    document.getElementById(
        "events-container"
    );

    if(container)
    {
        const events =
        await loadEvents();

        events.forEach(event =>
        {
            const card =
            document.createElement("div");

            card.classList.add(
                "event"
            );

            card.innerHTML = `
                <h2>${event.title}</h2>

                <p>${event.date}</p>

                <p>${event.location}</p>

                <button
                onclick="window.location.href='event.html?id=${event.id}'">

                View Event

                </button>
            `;

            container.appendChild(
                card
            );
        });
    }
}

initializeCalendar();

const days =
document.querySelectorAll(
".calendar-day"
);

days.forEach(day =>
{
    day.addEventListener(
    "click",
    function()
    {
        window.location.href =
        "day.html";
    });
});
