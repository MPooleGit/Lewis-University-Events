const params =
new URLSearchParams(
    window.location.search
);

const id =
parseInt(
    params.get("id")
);

const event =
events.find(
    e => e.id === id
);

const detail =
document.getElementById(
    "event-detail"
);

if(event)
{
    detail.innerHTML = `

        <div class="event-card">

            <h1>${event.title}</h1>

            <p>
                <strong>Date:</strong>
                ${event.date}
            </p>

            <p>
                <strong>Location:</strong>
                ${event.location}
            </p>

            <p>
                <strong>Host:</strong>
                ${event.host}
            </p>

            <p>
                <strong>Contact:</strong>
                ${event.contact}
            </p>

            <p>
                ${event.description}
            </p>

        </div>
    `;
}
else
{
    detail.innerHTML =
    "<h2>Event not found.</h2>";
}
