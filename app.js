const { Socket } = require('socket.io');

const express = require('express');

const app = express();
const http = require("http").createServer(app);
const path = require('path')
const port = 8000;

const io = require("socket.io")(http);

app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "templates/base.html"));
});

app.get("/games/tic-tac-toe", (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/games/tic-tac-toe.html'));
})

http.listen(port, () => {
    console.log(`listening on http://localhost:${port}/`);
})

let rooms = [];

io.on('connection', (socket) => {
    console.log(`[connection] ${socket.id}`);

    socket.on('playerData', (player) => {
        console.log(`[playerData] ${player.username}`);
        let room = null;

        if (!player.roomId) {
            room = createRoom(player);
            console.log(`[create room]  - ${room.id} - ${player.username}`);
        }
    })
});

function createRoom(player) {
    const room = { id: roomId(), players: [] };

    player.roomId = room.id;
    room.players.push(player);
    rooms.push(room);

    return room;
}

function roomId(){
    return Math.random().toString(36).substr(2, 9);
}