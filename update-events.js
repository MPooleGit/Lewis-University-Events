const fs =
require("fs");

const events =
[
    {
        id: 1,
        title: "Club Fair",
        date: "September 1, 2025",
        location: "Student Center",
        host: "Student Life Office",
        contact: "clubs@lu.edu",
        description:
        "Meet all student organizations."
    }
];

fs.writeFileSync(
    "events.json",
    JSON.stringify(
        events,
        null,
        2
    )
);
