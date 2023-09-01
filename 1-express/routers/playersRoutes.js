const { Router } = require("express");
let db = require("../db/db");

let Player = require("../data/data-model");

const router = Router();

// get all players from db
/* router.get('/', (req, res)=>{
   res.status(200).json(db);
}); */

// get all players from Player database
router.get("/", (req, res) => {
  Player.findPlayer()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      next({
        statusCode: 500,
        errorMessage: "Error While Geting Players",
        error: err,
      });
    });
});

// get player with id from db
/* router.get("/:id", (req, res) => {
  const { id } = req.params; // http://localhost:5000/1  id=1
  const actor = db.find((item) => item.id === parseInt(id));
  if (actor) res.status(200).json(actor);
  else res.status(404).send("Error 404");
});
 */

// get player from database
router.get("/:id", (req, res, next) => {
  const { id } = req.params; 
  Player.findPlayerById(id).thsen((response)=>{
    if(response) res.status(200).json(response);
    else next({statusCode: 400, errorMessage: 'dont find player'})
  }).catch(()=>{
    next({
      statusCode: 500,
      errorMessage: 'does not exist player',
      error
    })
  })
  
});

// create player into db
/* let player_ID = 3;
router.post("/",(req, res, next)=>{
  const body = req.body;
  if(!body.name){
    next({statusCode: 400, message: 'Bad Request enter the name'});
  }else if(!body.group){
    next({statusCode: 400, message: 'Bad Request enter the group'});
  }else{
    const new_Player = {...body, player_ID};
    player_ID++;
    db.push(new_Player);
    res.status(201).json(new_Player);
  };
}); */

router.post("/", (req, res, next) => {
  const body = req.body;
  if (!body.name) {
    next({ statusCode: 400, errorMessage: "Bad Request enter the name" });
  } else {
    Player.addPlayer(body)
      .then((addedPlayer) => {
        console.log({ addedPlayer });
        res.statusCode(201).json(addedPlayer);
      })
      .catch((err) => {
        next({
          statusCode: 501,
          errorMessage: "couldn't add player",
          error: err,
        });
      });
  }
});

// delete player from db
/* router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const hasId = db.find((data) => data.id === Number(id));
  if (hasId) {
    db = db.filter((data) => data.id !== Number(id));
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Error 404" });
  }
}); */

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Player.findPlayerById(id)
    .then((deletedPlayer) => {
      if (deletedPlayer) {
        res.status(204).end();
      }else {
        next({
        statusCode: 400,
        errorMessage: "dont find deleted player",
        error: err,
      });
      }
    })
    .catch((err) => {
      next({
        statusCode: 500,
        errorMessage: "couldn't deleted player",
        error: err,
      });
    });

  Player.deletePlayer(id)
    .then((deletedPlayer) => {
      if (deletedPlayer) {
        res.status(204).end();
      }
    })
    .catch((err) => {
      next({
        statusCode: 500,
        errorMessage: "couldn't deleted player",
        error: err,
      });
    });
});

// put update or post, patch into db
/* router.put("/:id", (req, res)=>{
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
    res.status(200).json(db);
  }else {
    res.status(404).json({message: 'Error 404'});
  }
}); */

// put update or post, patch into database with knex
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  if (!body.name) {
    next({ statusCode: 400, errorMessage: "Bad Request empty name" });
  } else {
    Player.updatePlayer(body, id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        next({
          statusCode: 501,
          errorMessage: "couldn't update player",
          error,
        });
      });
  }
});

module.exports = router;
