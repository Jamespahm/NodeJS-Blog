const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.use('/create', courseController.create);
router.post('/store', courseController.store);

router.use('/:slug', courseController.show);
router.use('/', courseController.index);

module.exports = router;
