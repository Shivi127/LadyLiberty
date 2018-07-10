const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config()
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;


app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/chat', () => {

})

const server = app.listen(3000, () => console.log('Example app listening on port 3000!'));

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

const apiai = require('apiai')(APIAI_TOKEN);

io.on('connection', function(socket) {
    socket.on('chat message', (text) => {
      console.log('Message: ' + text);
  
      // Get a reply from API.ai
  
      let apiaiReq = apiai.textRequest(text, {
        sessionId: APIAI_SESSION_ID
      });
  
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