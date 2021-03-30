const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log("Server ligado.")
});

app.get("/", (req, res) => {
  return res.send("Hello World")
});