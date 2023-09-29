const express = require('express');
const Joi = require("joi");

let users = [
  { id: 1, name: "Jhon", age: 19 },
  { id: 2, name: "Jhonson" , age: 21},
  { id: 3, name: "Jhoni", age: 23 },
];

const router = express.Router();

router.get("/", (req, res) => {
  if (req.query.reverse) {
    res.status(200).json(users.reverse());
  } else res.status(200).json(users);
});

router.get("/:id", (req, res) => {
  const findUser = users.find((user) => user.id === +req.params.id);
  if (findUser) {
    res.status(200).json(findUser);
  } else {
    res.status(404).send(req.params.id + " dont find with this id user");
  }
});

router.post('/',(req, res)=>{
  const {value, error} = userValidate(req.body);
  if(error){
    res.status(400).send(error);
  }else {
    const newUser = {
      id: users.length + 1,
      name: value.name,
      age: value.age
    };
    users.push(newUser);
    res.status(200).json(newUser);
  }
});

router.put('/:id',(req, res)=>{
  const updateUser = users.find(user=> user.id === +req.params.id);
  if(!updateUser) return res.status(404).send("Dont Find user");

  const {value, error} = userValidate(req.body);

  if(error){
    res.status(400).send(error);
  }else{
    updateUser.name = value.name;
    updateUser.age = value.age;
    res.status(200).send(updateUser);
  }
});

router.delete('/:id', (req, res)=>{
  const deleteUser = users.find(user => user.id === +req.params.id);
  if(!deleteUser){
    res.status(404).send("Dont find user for deleting")
  }else{
    const index = users.indexOf(deleteUser);
    users.splice(index, 1);
    res.status(200).send(deleteUser);
  }
});

module.exports = router;

// Validate Function

function userValidate(user){
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(10).required(),
    age: Joi.number().integer().min(18).max(90),
  });
  
  return schema.validate(user,{abortEarly: false});
};