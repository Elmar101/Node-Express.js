const { Router } = require('express');
let db = require('../db/db');

const router = Router();

router.get('/', (req, res)=>{
  res.status(200).json(db);
});

router.get('/:id', (req, res)=>{
  const { id } = req.params; // http://localhost:5000/1  id=1

  const query = req.query; // http://localhost:5000/1?name:Messi&number=10  query = {name:'Messi, number: '10'};
  console.log("QUERY IS :  ", query);

  const body = req.body;
  console.log("BODY IS: ", body);


  const actor = db.find(item=> item.id === parseInt(id));
  if(actor) res.status(200).json(actor);
  else res.status(404).send('Error 404');
});

// create player
let player_ID = 3;
router.post("/",(req, res)=>{
  const body = req.body;
  const new_Player = {...body, player_ID};
  player_ID++;
  db.push(new_Player);
  res.status(201).json(new_Player);
});

// delete player
router.delete("/:id" , (req, res)=>{
  const { id } = req.params;
  const hasId = db.find(data=> data.id === Number(id));
  if(hasId){
    db = db.filter(data=> data.id !== Number(id));
    res.status(200).end();
  }else {
    res.status(404).json({message: 'Error 404'});
  }
});

// put update or post
router.put("/:id", (req, res)=>{
  const { id } = req.params;
  const body = req.body;
  const hasId = db.find(data=> data.id === Number(id));
  if(hasId){
    db = db.map(data=> {
      if(data.id === Number(id)){
        data = body;
        return data;
      }
      return data;
    });
    res.status(200).end();
  }else {
    res.status(404).json({message: 'Error 404'});
  }
});

module.exports = router;