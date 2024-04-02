const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /course
    index(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) => {
                res.render('course', { courses });
            })
            .catch((error) => {
                next(error);
            });
    }

    // [GET] /course-detail
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                // res.json(course);
                res.render('course-detail', { course: mongooseToObject(course) });
            })
            .catch((error) => {
                next(error);
            });
    }
}

module.exports = new CourseController();
