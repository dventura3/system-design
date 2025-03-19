const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
    // listeninig on messaging coming in => there is not distriction about "rooms"... all messages will be delivered.
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
        // this if, is to avoid that the message send by ClintA will arrive to ClientA as well... 
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})

// sample here: https://karlhadwen.medium.com/node-js-websocket-tutorial-real-time-chat-room-using-multiple-clients-44a8e26a953e