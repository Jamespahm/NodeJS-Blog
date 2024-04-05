const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const moment = require('moment');

const route = require('./routers/index.router');
const db = require('./config/db');

const SortMiddleware = require('./app/middlewares/SortMiddleware')

//Connect to DB
db.connect();

const app = express();
const port = 3030;

// HTTP logger
// app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(SortMiddleware);
// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            formatDate: (date) => {
                return moment(date).format('HH:mm:ss DD-MM-YYYY ');
            },

            sortable:(field, sort)=>{
                const sortType = field === sort.column ? sort.type : 'default'

                const icons = {
                    default: 'fa-solid fa-sort',
                    asc: 'fa-duotone fa-sort',
                    desc: 'fa-duotone fa-sort fa-flip-vertical',
                }
                const types = {
                    default: 'asc',
                    asc: 'desc',
                    desc: 'default',
                }
                const icon = icons[sortType];
                const type = types[sortType]

                if(type === 'default') {
                     
                return `<a href="?" class="icon-sort"><i class="${icon}"></i></a>`
                }
                else {

                    return `
                        <a href="?_sort&column=${field}&type=${type}" class="icon-sort">
                            <i class="${icon}"></i>
                        </a>
                        `
                }
            }
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
