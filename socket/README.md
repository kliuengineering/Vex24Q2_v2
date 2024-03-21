## Set up
- `npm install` to install all dependencies
- `sleep()` can be use to halt processes like wait()

## Example
```js
// index.js

// D: Have this on your index file to make the program close gracefully
// Handle interrupt signal (Ctrl+C)

import {SocketClient, sleep} from './socket.js'

const dummydata = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const socket = new SocketClient("127.0.0.1", 9910); //D: pass ip address and port

async function main() {
    let i = 0;
    while (true) {
        await socket.sendData(dummydata[i]); 
        i = (i + 1) % dummydata.length; // Reset index when reaching the end of data array
        await sleep(1000); 
    }
};

process.on('SIGINT', async () => {
    console.log('Received SIGINT signal');
    await socket.closeConnection(); // Close the socket connection
    process.exit(); // Terminate the process
});

main();

```

