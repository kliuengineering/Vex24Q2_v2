import express from "express";
import {SocketClient, sleep} from './socket.js'

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }))

const MC_IP_ADDR = "127.0.0.1"; //D: pass NETWORK ip address
const MC_PORT = 9910; //D: pass port number
const socket = new SocketClient(MC_IP_ADDR, MC_PORT); //D: pass ip address and port

app.post('/streamData', async (req, res) => {
    try {
        const data = req.body.data; // Get data from the html body

        // send to the udp socket
        await socket.sendData(data);
        if (socket.packetsSent === 5) {
            console.log('Sleeping for 5 seconds');
            await sleep(5000); // Sleep for 5 seconds
            socket.packetsSent = 0;
        }
        res.status(200).send('Data sent to MC');

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('An error occurred while processing the request');
    }
})

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('Received SIGINT signal. Closing socket and exiting...');
    await socket.closeConnection();
    process.exit(0);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})

