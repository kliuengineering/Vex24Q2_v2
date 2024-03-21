## Set up
- `npm install` to install all dependencies
- `sleep()` can be use to halt processes like wait()


## Example
- Sending data to the endpoint via polling
```js
function sendData() {
        const dataInput = document.getElementById('dataInput').value; // D: this should be what you're returning to the Robot
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/streamData', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Data sent successfully');
                } else {
                    console.error('Error sending data:', xhr.statusText);
                }
            }
        };
        xhr.send(`data=${encodeURIComponent(dataInput)}`);
    }

    // Poll the endpoint every 5 seconds
    setInterval(sendData, 5000);
});
```


