let eventData = [];


async function loadEvents(){

    if(eventData.length > 0){

        return eventData;

    }


    try{

        const response = await fetch("events.csv");

        const text = await response.text();


        const rows = text
            .split(/\r?\n/)
            .filter(row => row.trim() !== "");



        eventData = [];



        for(let i = 1; i < rows.length; i++){


            let row = rows[i];


            // Remove the outside quotes
            row = row.replace(/^"|"$/g,"");



            // IMPORTANT:
            // Your file is tab separated
            const cols = row.split("\t");



            let rawDate = cols[0].trim();



            if(!rawDate){

                continue;

            }



            // Convert:
            // 8/15/2026
            // into:
            // 2026-08-15

            let dateParts =
                rawDate.split("/");


            if(dateParts.length === 3){

                rawDate =
                `${dateParts[2]}-${

                    dateParts[0].padStart(2,"0")

                }-${

                    dateParts[1].padStart(2,"0")

                }`;

            }



            for(
                let j = 1;
                j < cols.length;
                j += 2
            ){


                let title =
                    cols[j]?.trim();



                let time =
                    cols[j+1]?.trim();



                if(
                    title &&
                    title !== "Description"
                ){

                    eventData.push({

                        id:
                        eventData.length + 1,


                        title:title,


                        date:rawDate,


                        time:
                        time || "TBA",


                        location:
                        "Lewis University",


                        description:
                        "Campus event."

                    });


                }


            }


        }



        console.log(
            "FINAL EVENTS:",
            eventData
        );


        return eventData;


    }


    catch(error){

        console.error(error);

        return [];

    }

}