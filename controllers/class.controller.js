const Class = require('../models/Class');
const apiError = require('../utils/apiError');

exports.createClass = async (req, res, next) => {
  try {
    if (!req.body.classCode || typeof req.body.classCode !== 'string') {
      return next(
        new apiError('Class code is required and must be a string', 400)
      );
    }

    if (!req.body.semesterNo) {
      return next(
        new apiError('Semester number is required', 400)
      );
    }

    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (err) {
    next(err);
  }
};
