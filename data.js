let events = [];

async function loadEvents() {
    if (events.length > 0) {
        return events;
    }

    try {
        const response = await fetch("events.csv");
        const text = await response.text();

        const rows = text.trim().split("\n");

        events = [];

        // Skip header row
        for (let i = 1; i < rows.length; i++) {

            const cols = rows[i].split("\t");

            const date = cols[0];

            for (let j = 1; j < cols.length; j += 2) {

                const title = cols[j];
                const time = cols[j + 1];

                if (title && title.trim() !== "") {

                    events.push({
                        id: events.length + 1,
                        title: title.trim(),
                        date: date.trim(),
                        time: time ? time.trim() : "",
                        location: "Lewis University"
                    });

                }
            }
        }

        return events;

    } catch (error) {

        console.error("Failed to load CSV:", error);
        return [];

    }
}