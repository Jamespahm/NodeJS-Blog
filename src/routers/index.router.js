const siteRouter = require('./site.router');
const newsRouter = require('./news.router');
const courseRouter = require('./course.router');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/course', courseRouter);

    app.use('/', siteRouter);
}

module.exports = route;
