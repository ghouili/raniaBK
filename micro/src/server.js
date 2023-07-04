const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const { ROUTES } = require('./config/routes');

const { setupLogging } = require('./config/logging');
const {setupRateLimit} = require('./config/ratelimit');
const { setupProxies } = require('./config/proxy');
const {setupAuth} = require('./config/auth');
const socketHandler = require('./socketHandler/controller/socketHandler');

const AuthRouter = require('./authentication/router/user');

const app = express()
const port = 5000;

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use(cors({
    origin: '*'
}));

app.use(express.json());

setupLogging(app);
setupRateLimit(app, ROUTES);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);

app.use('/auth', AuthRouter);

socketHandler(io);
// io.on("connection", (socket) => {
//     socket.emit("me", socket.id);
//     console.log('user just connected with id :' + socket.id);

//     // Handle disconnect event
//     socket.on("disconnect", () => {
//         console.log('User disconnected with ID: ' + socket.id);
//     });
// });

mongoose.connect('mongodb+srv://admin:admin@pfe.eomjtm9.mongodb.net/?retryWrites=true&w=majority')
    .then(result => server.listen(port, () => {
        console.log(`Gateway is listening at http://localhost:${port}`)
    })
    ).catch(err => console.log(err));