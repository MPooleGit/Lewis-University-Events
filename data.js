let eventData = [];


async function loadEvents() {


    if(eventData.length > 0){

        return eventData;

    }



    try{


        const response = await fetch("events.csv");


        if(!response.ok){

            throw new Error(
                "events.csv not found"
            );

        }



        const text = await response.text();



        const rows = text
            .split(/\r?\n/)
            .filter(row => row.trim() !== "");



        eventData = [];



        // Remove CSV quotes and split correctly
        function parseRow(row){


            return row

            .replace(/^"|"$/g,"")

            .split(",")

            .map(item =>

                item.replace(/^"|"$/g,"")
                    .trim()

            );


        }



        // Skip header
        for(let i = 1; i < rows.length; i++){


            const cols = parseRow(rows[i]);



            let rawDate = cols[0];



            if(!rawDate) continue;



            /*
              Convert:
              8/15/2026

              into:

              2026-08-15
            */

            const parts =
                rawDate.split("/");



            if(parts.length === 3){


                rawDate =
                `${parts[2]}-${

                    parts[0]
                    .padStart(2,"0")

                }-${

                    parts[1]
                    .padStart(2,"0")

                }`;


            }



            // Starting after date
            for(
                let j = 1;
                j < cols.length;
                j += 2
            ){


                const title =
                    cols[j];


                const time =
                    cols[j+1];



                if(
                    title &&
                    title.trim() !== "" &&
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
            "Events loaded:",
            eventData
        );



        return eventData;



    }

    catch(error){


        console.error(
            "CSV loading error:",
            error
        );


        return [];

    }

}