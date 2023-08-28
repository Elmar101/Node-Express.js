const express = require('express');
const db = require('./db/db');

// create server
const server = express();

server.get('/', (req, res)=>{
  res.send("Hello from express");
});

server.get('/actors', (req, res)=>{
  res.status(200).json(db);
});

server.get('/actors/:id', (req, res)=>{
  const { id } = req.params;
  const actor = db.find(item=> item.id === parseInt(id));
  if(actor) res.status(200).json(actor);
  else res.status(404).send('Error 404');
});

server.listen(5000, ()=>{
  console.log("http://localhost:5000 listening on this port");
});


