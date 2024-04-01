const siteRouter = require('./site.router');
const newsRouter = require('./news.router');

function route(app) {
    app.use('/news', newsRouter);

    app.use('/', siteRouter);
}

module.exports = route;
