const Course = require('../models/Course.model');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let coursesQuery =Course.find({});

        if(req.query.hasOwnProperty('_sort')){
            coursesQuery = coursesQuery.sort({
                [req.query.column]:req.query.type
            })
        }

        Promise.all([coursesQuery, Course.countDocumentsWithDeleted({deleted:true})])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                }),

            )
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        let coursesQueryTrash =Course.findWithDeleted({deleted:true})

        if(req.query.hasOwnProperty('_sort')){
            coursesQueryTrash = coursesQueryTrash.sort({
                [req.query.column]:req.query.type
            })
        }
        
        coursesQueryTrash
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
