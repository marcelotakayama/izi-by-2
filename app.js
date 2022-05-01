const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('hbs', exphbs.engine( {extname: '.hbs'}));
app.set('view engine', 'hbs');


const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

pool.getConnection((err, connection) => {
    if(err) throw err; // Falha na conexão
    console.log('Conectado com o ID' + connection.threadId);
})


const routes = require('./server/routes/item');
app.use('/', routes);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));