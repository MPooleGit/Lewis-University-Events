let allEvents = [];



document.addEventListener(
"DOMContentLoaded",
async function(){


    // Load saved theme

    if(
        localStorage.getItem("theme")
        ===
        "dark"
    ){

        document.body.classList.add(
            "dark-mode"
        );

    }



    startClock();



    await initializeHomepage();



});





async function initializeHomepage(){


    const container =
        document.getElementById(
            "event-container"
        );


    if(!container) return;



    allEvents =
        await loadEvents();



    console.log(
        "Homepage Events:",
        allEvents
    );



    displayEvents(
        allEvents
    );

}





function displayEvents(events){


    const container =
        document.getElementById(
            "event-container"
        );



    container.innerHTML = "";



    if(events.length === 0){


        container.innerHTML = `

        <div class="event-card">

            <h2>
            No Events Found
            </h2>

            <p>
            Try another search.
            </p>

        </div>

        `;


        return;

    }





    events.forEach(event=>{


        const card =
            document.createElement(
                "div"
            );



        card.className =
            "event-card";



        card.innerHTML = `


        <h2>
        ${event.title}
        </h2>


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



        card.onclick=function(){


            card.classList.toggle(
                "expanded"
            );


        };



        container.appendChild(card);



    });



}







function searchEvents(){


    const searchValue =
        document
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
                .includes(searchValue)


                ||

                event.date
                .toLowerCase()
                .includes(searchValue)


                ||

                event.time
                .toLowerCase()
                .includes(searchValue)


                ||

                event.location
                .toLowerCase()
                .includes(searchValue)


            );


        });



    displayEvents(
        filtered
    );


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







function startClock(){


    const clock =
        document.getElementById(
            "clock"
        );



    if(!clock) return;



    function update(){


        const now =
            new Date();



        let hours =
            now.getHours();



        const minutes =
            String(
                now.getMinutes()
            )
            .padStart(2,"0");



        const seconds =
            String(
                now.getSeconds()
            )
            .padStart(2,"0");



        const ampm =
            hours >= 12
            ?
            "PM"
            :
            "AM";



        hours =
            hours % 12;



        if(hours===0){

            hours=12;

        }



        clock.textContent =

        `${hours}:${minutes}:${seconds} ${ampm}`;



    }



    update();


    setInterval(
        update,
        1000
    );


}