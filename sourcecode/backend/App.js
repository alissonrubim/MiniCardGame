const bodyParser = require('body-parser')
var cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET, PUT, POST, DELETE"
}

/*----Setup express----*/
const express = require('express');
const app = express();
const routes = require('./Routes')

app.use(cors(corsOptions));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Nothing here!');
});

routes.register(app);

app.listen(3030, () => {
    console.log('Api started at *:3030');
});

/*-----Setup socket.io----*/
const socketApp = express();
const http = require('http');
const socketServer = http.createServer(socketApp);
const io = require("socket.io")(socketServer, {
    cors: corsOptions
});
const { socketController } = require("./controllers/Socket.controller");
socketController.setIO(io);

io.on('connection', (socket) => {
    socketController.onConnect(socket);
});

socketServer.listen("3031", () => {
    console.log('Socket started at *:3031');
});