let events = [];

async function loadEvents()
{
    try
    {
        const response =
            await fetch("events.json");

        events =
            await response.json();

        return events;
    }
    catch(error)
    {
        console.error(
            "Failed to load events:",
            error
        );

        return [];
    }
}
