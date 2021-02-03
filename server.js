const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Run when client connect
io.on('connection', socket => {
    //Welcome message to single client/User
    socket.emit('message', 'Welcome to Chat Corp');

    //Broadcast when a user connects to everyone except the client
    socket.broadcast.emit('message', 'A user has joined the chat');

    //Runs when a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', ' A user has left the chat');
    });

    //Listen for chatMessage
    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    });
});


//Environment Variable for PORT);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));