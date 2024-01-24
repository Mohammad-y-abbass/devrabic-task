const express = require('express');
const studentsController = require('../controllers/student.controller');

const router = express.Router();

router.post('/', studentsController.createStudent);
router.put('/:id/grades', studentsController.updateStudentGrades);
router.get('/:id/average', studentsController.getStudentAverage);
router.get('/:id', studentsController.getStudentDetails);
router.get(
  '/semesters/:semesterNo/classes/:classNo',
  studentsController.getStudentsBySemesterAndClass
);
router.get(
  '/classes/:classNo/average/:subject',
  studentsController.getAverageGradeBySubjectInClass
);

module.exports = router;
