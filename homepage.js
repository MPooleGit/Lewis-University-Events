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

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

    }else{

        localStorage.setItem("theme","light");

    }

}

window.onload=()=>{

    if(localStorage.getItem("theme")==="dark"){

        document.body.classList.add("dark-mode");

    }

}

const music=document.getElementById("bgMusic");

document.getElementById("musicBtn").onclick=function(){

    if(music.paused){

        music.play();
        this.innerHTML="⏸ Pause Music";

    }else{

        music.pause();
        this.innerHTML="🎵 Music";

    }

}

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".event-card").forEach(card=>{

observer.observe(card);

});

initializeHomepage();