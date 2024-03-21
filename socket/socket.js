import { DgramAsPromised } from "dgram-as-promised";
import { promisify } from 'util';

const sleep = promisify(setTimeout);

class SocketClient {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
        this.socket = DgramAsPromised.createSocket("udp4");
        this.packetsSent = 0;
        this.bindSocket();
    }
    
    async bindSocket() {
        try {
            await this.socket.bind(); // Bind the socket
            console.log('Socket bound');
        } catch (error) {
            console.error('Error binding socket:', error);
        }
    }
    
    async sendData(data) {
        try {
            const packet = await this.socket.send(Buffer.from(data.toString()), 0, data.length, this.port, this.ip);
            if (packet > 0){
                console.log('Data sent to server');
                this.packetsSent++;    
            }
            
        } catch (error) {
            console.error('Error sending data to server', error);
        }
    }
    
    async closeConnection() {
        try {
            await this.socket.close(); // Close the socket after sending all packets
            console.log('Socket closed');
        } catch (error) {
            console.error('Error closing socket:', error);
        }
    }
}

export { SocketClient, sleep };