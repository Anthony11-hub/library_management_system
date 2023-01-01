const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config({ path:'./.env' });


const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    email: process.env.DATABASE_EMAIL,
    database: process.env.DATABASE
});


const publicDirectory = path.join(__dirname, 'public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json);

app.set('view engine', 'hbs');

db.connect(( error ) => {
    if (error){
        console.log(error);
    } else {
        console.log("connected to database");
    }
});

app.use('/', require('./routes/pages'));
app.use('/login', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(5002, () => {
    console.log("server started on 5002");
});

