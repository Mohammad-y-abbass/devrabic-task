const Semester = require('../models/Semester');
const apiError = require('../utils/apiError');

exports.createSemester = async (req, res, next) => {
  try {
    if (!req.body.semesterName || typeof req.body.semesterName !== 'string') {
      return next(
        new apiError('Semester name is required and must be a string', 400)
      );
    }

    const newSemester = await Semester.create(req.body);
    res.status(201).json(newSemester);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return next(new apiError('Semester name must be unique', 400));
    }

    next(err);
  }
};
