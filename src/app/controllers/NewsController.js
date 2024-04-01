class NewsController {
    //[GET] /news
    index(req, res) {
        res.render('news');
    }

    //[GET] /show
    show(req, res) {
        res.send('SHOW NEWS');
    }
}

module.exports = new NewsController();
