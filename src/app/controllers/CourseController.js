const Course = require('../models/Course.model');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /course
    index(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) => {
                res.render('courses', { courses });
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
                    res.render('courses/course-detail', { course: mongooseToObject(course) });
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
        res.render('courses/create');
    }

    // [POST] /course/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/courses'))
            .catch(next);
        // res.send('Saved');
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CourseController();
