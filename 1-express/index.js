const express = require('express');
const playersRouter = require('./routers/playersRoutes');
const logger = require('./express_middlewares/logger');
const errorHandling = require('./express_middlewares/errorHandling');

// create server
const server = express();

server.use(express.json());
server.use(logger);

// Requset Player Router we handle use with middleware
server.use('/players', playersRouter);
server.use(errorHandling);

server.get('/', (req, res)=>{ res.send("Hello from express")});

server.listen(8080, ()=>{console.log("http://localhost:8080 listening on this port")});


