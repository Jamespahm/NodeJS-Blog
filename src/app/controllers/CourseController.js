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
                if (course) {
                    res.render('course/course-detail', { course: mongooseToObject(course) });
                } else {
                    // Không tìm thấy khóa học với slug đã cung cấp, chuyển hướng sang trang 404
                    res.status(404).render('errors/404', { layout: false });
                }
            })
            .catch((error) => {
                next(error);
            });
    }

    // [GET] /course/create
    create(req, res, next) {
        res.render('course/create');
    }

    // [POST] /course/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/course'))
            .catch((error) => {});
        // res.send('Saved');
    }
}

module.exports = new CourseController();
