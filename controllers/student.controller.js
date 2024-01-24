const Student = require('../models/Student');
const Class = require('../models/Class');

exports.createStudent = async (req, res, next) => {
  try {
    if (!req.body.firstName || typeof req.body.firstName !== 'string') {
      return next(
        new apiError('First name is required and must be a string', 400)
      );
    }

    if (!req.body.lastName || typeof req.body.lastName !== 'string') {
      return next(
        new apiError('Last name is required and must be a string', 400)
      );
    }

    if (!req.body.classNo || typeof req.body.classNo !== 'number') {
      return next(
        new apiError('Class number is required and must be a number', 400)
      );
    }

    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

exports.updateStudentGrades = async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return next(new apiError('Student not found', 404));
    }
    await student.update(req.body);
    res.json(student);
  } catch (err) {
    next(err);
  }
};

exports.getStudentAverage = async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    console.log(student);

    if (!student) {
      return next(new apiError('Student not found', 404));
    }

    const grades = [
      student.mathGrade,
      student.physicsGrade,
      student.chemistryGrade,
      student.scienceGrade,
      student.literatureGrade,
    ];

    const average =
      grades.reduce((sum, grade) => sum + grade, 0) / grades.length;

    return res.json({ average });
  } catch (err) {
    next(err);
  }
};

exports.getStudentDetails = async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return next(new apiError('Student not found', 404));
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
};

exports.getStudentsBySemesterAndClass = async (req, res, next) => {
  try {
    if (!req.params.semesterNo || !req.params.classNo) {
      return next(
        new apiError('Semester number and class number are required', 400)
      );
    }

    const students = await Student.findAll({
      include: [
        {
          model: Class,
          where: {
            semesterNo: req.params.semesterNo,
            classNo: req.params.classNo,
          },
        },
      ],
    });
    res.json(students);
  } catch (err) {
    next(err);
  }
};

exports.getAverageGradeBySubjectInClass = async (req, res, next) => {
  try {
    if (!req.params.classNo || !req.params.subject) {
      return next(new apiError('Class number and subject are required', 400));
    }
    const students = await Student.findAll({
      where: { classNo: req.params.classNo },
    });
    console.log(students);
    const grades = students.map((student) => student[req.params.subject]);
    console.log(grades);
    const average = grades.reduce((a, b) => a + b, 0) / grades.length;
    res.json({ average });
  } catch (err) {
    next(err);
  }
};
