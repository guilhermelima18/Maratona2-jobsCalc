const { urlencoded } = require('express');
const express = require('express');
const routes = require('./routes');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

// Habilitar Req.body
app.use(express.urlencoded({
  extended: true
}));

app.use(routes);

app.listen(3000);