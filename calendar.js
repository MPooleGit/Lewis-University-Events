// calendar.js

let events = [];
let currentDate = new Date(2026,7,15);

// ---------------------
// CLOCK
// ---------------------

function startClock() {

    const clock = document.getElementById("clock");

    if (!clock) return;

    function updateClock() {

        const now = new Date();

        let hours = now.getHours();

        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;

        if (hours === 0) hours = 12;

        clock.textContent =
            `${hours}:${minutes}:${seconds} ${ampm}`;

    }

    updateClock();

    setInterval(updateClock, 1000);

}

// ---------------------
// EVENT CARD
// ---------------------

function addEventCard(event) {

    const container =
        document.getElementById("events-container");

    const card = document.createElement("div");

    card.className = "event";

    card.innerHTML = `
        <h2>${event.title}</h2>

        <p><strong>Date:</strong> ${event.date}</p>

        <p><strong>Time:</strong> ${event.time}</p>

        <p><strong>Location:</strong> ${event.location}</p>

        <p>${event.description || ""}</p>
    `;

    container.appendChild(card);

}

function clearEvents() {

    const container =
        document.getElementById("events-container");

    if (container) {

        container.innerHTML = "";

    }

}

// ---------------------
// DAY VIEW
// ---------------------

function loadDayView() {

    const header =
        document.getElementById("currentDay");

    if (!header) return;

    header.textContent =
        currentDate.toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );

    clearEvents();

    events
        .filter(event => {

            const d = new Date(event.date);

            return d.toDateString() ===
                currentDate.toDateString();

        })
        .forEach(addEventCard);

}

function previousDay() {

    currentDate.setDate(
        currentDate.getDate() - 1
    );

    loadDayView();

}

function nextDay() {

    currentDate.setDate(
        currentDate.getDate() + 1
    );

    loadDayView();

}

// ---------------------
// WEEK VIEW
// ---------------------

function getWeek(date) {

    return Math.ceil(date.getDate() / 7);

}

function loadWeekView() {

    const header =
        document.getElementById("currentWeek");

    if (!header) return;

    const week = getWeek(currentDate);

    header.textContent =
        `${currentDate.toLocaleString(
            "default",
            {
                month: "long",
                year: "numeric"
            }
        )} - Week ${week}`;

    clearEvents();

    const start = (week - 1) * 7 + 1;

    const end = Math.min(start + 6,
        new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate());

    events
        .filter(event => {

            const d = new Date(event.date);

            return (

                d.getMonth() === currentDate.getMonth() &&

                d.getFullYear() === currentDate.getFullYear() &&

                d.getDate() >= start &&

                d.getDate() <= end

            );

        })
        .forEach(addEventCard);

}

function previousWeek() {

    currentDate.setDate(
        currentDate.getDate() - 7
    );

    loadWeekView();

}

function nextWeek() {

    currentDate.setDate(
        currentDate.getDate() + 7
    );

    loadWeekView();

}

// ---------------------
// MONTH VIEW
// ---------------------

function buildCalendar(){


    const calendar =
        document.getElementById(
            "calendar"
        );


    if(!calendar) return;



    calendar.innerHTML = "";



    const daysInMonth =
        new Date(

            currentDate.getFullYear(),

            currentDate.getMonth()+1,

            0

        ).getDate();



    document.getElementById(
        "currentMonth"
    ).textContent =


    currentDate.toLocaleString(

        "default",

        {

            month:"long",

            year:"numeric"

        }

    );



    for(
        let day = 1;
        day <= daysInMonth;
        day++
    ){


        const square =
            document.createElement(
                "div"
            );


        square.className =
            "calendar-day";



        let html = `

            <strong>
            ${day}
            </strong>

        `;



        const dayEvents =
            events.filter(event=>{


                const d =
                    new Date(
                        event.date
                    );


                return (

                    d.getDate()
                    === day

                    &&

                    d.getMonth()
                    ===
                    currentDate.getMonth()

                    &&

                    d.getFullYear()
                    ===
                    currentDate.getFullYear()

                );


            });



        dayEvents.forEach(event=>{


            html += `

            <div class="mini-event">

                ${event.title}

                <br>

                <small>
                ${event.time}
                </small>

            </div>

            `;


        });



        square.innerHTML =
            html;



        square.onclick = ()=>{

            showEventsForDay(day);

        };



        calendar.appendChild(square);



    }


}

function showEventsForDay(day) {

    clearEvents();

    events
        .filter(event => {

            const d =
                new Date(event.date);

            return (

                d.getDate() === day &&

                d.getMonth() ===
                currentDate.getMonth() &&

                d.getFullYear() ===
                currentDate.getFullYear()

            );

        })
        .forEach(addEventCard);

}

function previousMonth() {

    currentDate.setMonth(
        currentDate.getMonth() - 1
    );

    buildCalendar();

    clearEvents();

}

function nextMonth() {

    currentDate.setMonth(
        currentDate.getMonth() + 1
    );

    buildCalendar();

    clearEvents();

}

// ---------------------
// INITIALIZE
// ---------------------

async function initializeCalendar() {

    startClock();
    setupDarkMode();

    events = await loadEvents();

    const page =
        window.location.pathname
            .toLowerCase();

    if (page.includes("day")) {

        loadDayView();

        document
            .getElementById("prevDay")
            .onclick = previousDay;

        document
            .getElementById("nextDay")
            .onclick = nextDay;

    }

    else if (page.includes("week")) {

        loadWeekView();

        document
            .getElementById("prevWeek")
            .onclick = previousWeek;

        document
            .getElementById("nextWeek")
            .onclick = nextWeek;

    }

    else if (page.includes("month")) {

        buildCalendar();

        document
            .getElementById("prevMonth")
            .onclick = previousMonth;

        document
            .getElementById("nextMonth")
            .onclick = nextMonth;

    }

}

document.addEventListener(
    "DOMContentLoaded",
    initializeCalendar
);

function setupDarkMode(){

    const button =
        document.getElementById("darkModeBtn");


    if(!button) return;


    if(
        localStorage.getItem("theme")
        ===
        "dark"
    ){

        document.body.classList.add(
            "dark-mode"
        );

        button.textContent =
        "☀️ Light Mode";

    }


    button.onclick=function(){

        document.body.classList.toggle(
            "dark-mode"
        );


        if(
            document.body.classList.contains(
                "dark-mode"
            )
        ){

            localStorage.setItem(
                "theme",
                "dark"
            );


            button.textContent =
            "☀️ Light Mode";


        }

        else{


            localStorage.setItem(
                "theme",
                "light"
            );


            button.textContent =
            "🌙 Dark Mode";


        }

    }

}