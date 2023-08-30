const express = require('express');
const playersRouter = require('./routers/playersRoutes');

// create server
const server = express();

server.use(express.json());

// Requset Player Router we handle use with middleware
server.use('/players', playersRouter);

server.get('/', (req, res)=>{ res.send("Hello from express")});

server.listen(8080, ()=>{console.log("http://localhost:8080 listening on this port")});


