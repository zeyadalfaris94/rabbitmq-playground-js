const amqp = require("amqplib");

connect();
async function connect() {
    try{
        // Open a connection to the rabbitmq server
        const connection = await amqp.connect("amqp://localhost:5672");
        // Create a channel
        const channel = await connection.createChannel();
        // Declare a queue with name "jobs"
        const result = await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Received job with input ${input.number}`);

            if(input.number == 15){
                //Telling the Q server the message is received, processed, and can be deleted.
                channel.ack(message);
                
            }

        })

        console.log("Waiting for messages...");

    } catch(ex){
        console.log(ex);
    }
}