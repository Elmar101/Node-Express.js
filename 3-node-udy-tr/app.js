const express = require("express");
const Joi = require("joi");

var app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Jhon", age: 19 },
  { id: 2, name: "Jhonson" , age: 21},
  { id: 3, name: "Jhoni", age: 23 },
];

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/users", (req, res) => {
  if (req.query.reverse) {
    res.status(200).json(users.reverse());
  } else res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const findUser = users.find((user) => user.id === +req.params.id);
  if (findUser) {
    res.status(200).json(findUser);
  } else {
    res.status(404).send(req.params.id + " dont find with this id user");
  }
});

app.post('/users',(req, res)=>{
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(10).required(),
    age: Joi.number().integer().min(18).max(90),
  })
  const {value , error} = schema.validate(req.body,{abortEarly: false});
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

app.listen(8000, () => {
  console.log("Server runing...");
});
