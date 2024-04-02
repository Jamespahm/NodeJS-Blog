const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const route = require('./routers/index.router');
const db = require('./config/db');

//Connect to DB
db.connect();

const app = express();
const port = 3030;

// HTTP logger
// app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
