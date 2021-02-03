const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCorp Bot'

//Run when client connect
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) =>{
    //Welcome message to single client/User
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCorp!'));

    //Broadcast when a user connects to everyone except the client
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));
    });

    //Listen for chatMessage
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('USER', msg));
    });

    //Runs when a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'));
    });
});


//Environment Variable for PORT);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));