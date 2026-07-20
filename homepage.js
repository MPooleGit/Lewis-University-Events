let allEvents = [];


document.addEventListener(
    "DOMContentLoaded",
    async () => {


    if(localStorage.getItem("theme") === "dark"){

        document.body.classList.add("dark-mode");

    }


    setupMusic();


    await initializeHomepage();


});



async function initializeHomepage(){


    const container =
        document.getElementById(
            "event-container"
        );


    if(!container) return;



    allEvents = await loadEvents();


    displayEvents(allEvents);


}



function displayEvents(events){


    const container =
        document.getElementById(
            "event-container"
        );


    container.innerHTML = "";



    events.forEach(event=>{


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "event-card";



        card.innerHTML = `

            <h2>${event.title}</h2>

            <p>
            <strong>Date:</strong>
            ${event.date}
            </p>


            <p>
            <strong>Time:</strong>
            ${event.time}
            </p>


            <p>
            <strong>Location:</strong>
            ${event.location}
            </p>


            <div class="event-details">

                <p>
                ${event.description}
                </p>

            </div>

        `;



        card.onclick = ()=>{

            card.classList.toggle(
                "expanded"
            );

        };



        container.appendChild(card);



    });


}




function searchEvents(){


    const search = document
        .getElementById(
            "searchBar"
        )
        .value
        .toLowerCase();



    const filtered =
        allEvents.filter(event=>{


            return (

                event.title
                .toLowerCase()
                .includes(search)


                ||

                event.date
                .toLowerCase()
                .includes(search)


                ||

                event.time
                .toLowerCase()
                .includes(search)


                ||

                event.location
                .toLowerCase()
                .includes(search)

            );


        });



    displayEvents(filtered);



}




function toggleDarkMode(){


    document.body.classList.toggle(
        "dark-mode"
    );


    localStorage.setItem(

        "theme",

        document.body.classList.contains(
            "dark-mode"
        )
        ?
        "dark"
        :
        "light"

    );


}

startClock();