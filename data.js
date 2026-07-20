let eventData = [];


async function loadEvents() {

    if(eventData.length > 0){

        return eventData;

    }


    try {

        const response = await fetch("events.csv");

        const text = await response.text();


        const rows = text
            .split(/\r?\n/)
            .filter(row => row.trim() !== "");



        eventData = [];



        // Remove CSV quotation marks
        function clean(value){

            return value
                .replace(/^"|"$/g,"")
                .trim();

        }



        // Skip header
        for(let i = 1; i < rows.length; i++){


            let row = clean(rows[i]);


            // YOUR FILE USES TABS
            const cols = row.split("\t");



            let rawDate = clean(cols[0]);



            if(!rawDate) continue;



            // Convert 8/15/2026 -> 2026-08-15
            const dateParts = rawDate.split("/");


            if(dateParts.length === 3){

                rawDate =
                `${dateParts[2]}-${

                    dateParts[0].padStart(2,"0")

                }-${

                    dateParts[1].padStart(2,"0")

                }`;

            }



            // Every event is title/time pair
            for(
                let j = 1;
                j < cols.length;
                j += 2
            ){


                const title =
                    clean(cols[j] || "");



                const time =
                    clean(cols[j+1] || "");



                if(
                    title &&
                    title !== "Description"
                ){


                    eventData.push({

                        id:
                        eventData.length + 1,


                        title:
                        title,


                        date:
                        rawDate,


                        time:
                        time || "TBA",


                        location:
                        "Lewis University",


                        description:
                        "Campus event at Lewis University."

                    });


                }


            }


        }


        console.log(
            "Loaded events:",
            eventData
        );


        return eventData;


    }


    catch(error){

        console.error(
            "CSV Error:",
            error
        );


        return [];

    }

}