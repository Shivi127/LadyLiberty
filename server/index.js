const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config()
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;
const USN = process.env.USN;
const PSW = process.env.PSW;
app.use(express.static(path.join(__dirname, '../build')));

const server = app.listen(3000, () => console.log('Example app listening on port 3000!'));

const io = require('socket.io')(server);

const apiai = require('apiai')(APIAI_TOKEN);

io.on('connection', function(socket) {
    socket.on('chat message', (text) => {
      console.log('Message: ' + text);
      //socket.emit('bot reply', 'hey it works');
  
      let apiaiReq = apiai.textRequest(text, {
        sessionId: APIAI_SESSION_ID
        // proxyHost: 'http://www-proxy.lmig.com',
        // proxyPort: 80
      });
      console.log('apiaiReq',apiaiReq );
      apiaiReq.on('response', (response) => {
        let aiText = response.result.fulfillment.speech;
        console.log('Bot reply: ' + aiText);
        socket.emit('bot reply', aiText);
      });
      

      apiaiReq.on('error', (error) => {
        console.log(error);
      });
  
      apiaiReq.end();
  
    });
  });

