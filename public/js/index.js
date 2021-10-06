const player = {
    host: false,
    playedCell: "",
    roomId: null,
    username: "",
    socketId: "",
    symbol: "X",
    turn: false,
    win: false,
};
const socket = io();

const usernameInput = document.getElementById('username');
const userCard = document.getElementById('user-card');
const waitingArea = document.getElementById('waiting-area');

$("#form").on('submit', function (e) {
    e.preventDefault();

    player.username = usernameInput.value;
    player.host = true;
    player.turn = true;
    player.socketId = socket.id;


    userCard.hidden = true;
    waitingArea.classList.remove('d-none');

    socket.emit('playerData', player)
})