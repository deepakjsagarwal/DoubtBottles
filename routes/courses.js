const express = require('express')
const router = express.Router();
const { isLoggedIn,isTeacher,isAlreadyEnrolled } = require('../middleware')
const courses = require("../controllers/courses");
const catchAsync = require('../utils/catchAsync')

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(courses.showAllCourses))
    .post(isLoggedIn, upload.array('image'),catchAsync(courses.createNewCourse))

router.get('/new',isLoggedIn, courses.renderNewCourseForm)

router.route('/my',isLoggedIn)
    .get(catchAsync(courses.showMyCourses))
router.route('/:id')
    .get(catchAsync(courses.showCourse))
    .put(isLoggedIn, isTeacher, catchAsync(courses.editCourse))
    .delete(isLoggedIn, isTeacher, catchAsync(courses.deleteCourse))
    
router.get('/:id/edit', isLoggedIn, isTeacher, catchAsync(courses.renderEditCourseForm))

router.post('/:id/enroll', isLoggedIn, isAlreadyEnrolled, catchAsync(courses.notifyTeacherForEnrollment))

module.exports = router;