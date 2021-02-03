const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

//set static folder
app.use(express.static(path.join(__dirname, 'public')));











//Environment Variable for PORT);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));