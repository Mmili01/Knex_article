//index.js
const todoRouter = require("./routes/todo.js");



const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(todoRouter);

app.listen(port, () => {
  console.log(`App listening on port:${port}`);
});