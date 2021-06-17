const amqp = require("amqplib");

const msg = {number: process.argv[2]};
connect();
async function connect() {
    try{
        // Open a connection to the rabbitmq server
        const connection = await amqp.connect("amqp://localhost:5672");
        // Create a channel
        const channel = await connection.createChannel();
        // Declare a queue with name "jobs"
        const result = await channel.assertQueue("jobs");
        // Send a Buffer msg to the queue
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`Job sent Successfully => ${msg.number}`);

    } catch(ex){
        console.log(ex);
    }
}