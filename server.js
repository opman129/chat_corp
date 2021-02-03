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
    console.log("New Connection")
});








//Environment Variable for PORT);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));