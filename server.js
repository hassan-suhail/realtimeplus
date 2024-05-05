const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let currentText = ''; // This variable will store the current state of the text

io.on('connection', (socket) => {
    // Send current text to just the newly connected client
    socket.emit('update', currentText);

    // Receive updated text from any client
    socket.on('send', (text) => {
        currentText = text; // Update the stored text
        socket.broadcast.emit('update', text); // Send the updated text to all other clients
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
