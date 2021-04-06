const { urlencoded } = require('express');
const express = require('express');
const routes = require('./routes');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'pages'));

app.use(express.static("public"));

// Habilitar Req.body
app.use(express.urlencoded({
  extended: true
}));

app.use(routes);

app.listen(3000);