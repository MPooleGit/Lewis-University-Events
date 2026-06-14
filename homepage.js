//if(
//    localStorage.getItem("loggedIn")
//    !== "true"
//)
//{
//    window.location.href =
//    "login.html";
//}

const container =
document.getElementById(
    "event-container"
);

events.forEach(event => {

    const card =
    document.createElement("div");

    card.classList.add(
        "event-card"
    );

    card.innerHTML = `
        <h2>${event.title}</h2>

        <p>
            ${event.date}
        </p>

        <p>
            ${event.location}
        </p>

        <button
        onclick="viewEvent(${event.id})">

        View Details

        </button>
    `;

    container.appendChild(card);
});

function viewEvent(id)
{
    window.location.href =
    `event.html?id=${id}`;
}

//function logout()
//{
//    localStorage.removeItem(
//        "loggedIn"
//    );
//
//    window.location.href =
//    "login.html";
//}

function searchEvents()
{
    const value =
    document
    .getElementById("searchBar")
    .value
    .toLowerCase();

    const cards =
    document.querySelectorAll(
        ".event-card"
    );

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
