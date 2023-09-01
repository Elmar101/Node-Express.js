const db = require("./data-config");

module.exports = {
  findPlayer,
  findPlayerById,
  addPlayer,
  updatePlayer,
  deletePlayer
}

function findPlayer(){
  return db('player');
}

function findPlayerById(id){
  return db('player').where({ id }).first();;
}

function addPlayer(newPlayer){
  console.log({newPlayer});
  return db('player').insert(newPlayer, 'id').then(([id])=>{
    console.log({id})
    return db('player').where({id}).first();
  });
};

function updatePlayer(updatePlayer, id){
  return db('player').update(updatePlayer).where({id}).then(updated => {
    if(updated){
      return db('player').update(updatePlayer).where({id}).first();
    }
  })
};

function deletePlayer(id){
  return  db('player').del().where({id});
}