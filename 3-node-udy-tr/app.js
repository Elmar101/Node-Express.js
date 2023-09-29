const express = require("express");
const userRouter = require('./routers/user_router');
const mainRouter = require('./routers/main_router');
const notFoundPage = require('./routers/not_found');


var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));
app.use('/', mainRouter);
app.use('/users', userRouter);
app.use(notFoundPage);



app.listen(8000, () => {
  console.log("Server runing...");
});

