const express = require('express');
const sequelize = require('./config/db.config');
require('dotenv').config();
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/student.route');
const classRoutes = require('./routes/class.route');
const semesterRoutes = require('./routes/semester.route');
const apiError = require('./utils/apiError');
const globalErrorHandler = require('./middleware/globalErrorHandler');

//initialize express app
const app = express();

//middleware
app.use(bodyParser.json()); //parse json data

// Add the routes as middleware
app.use('/students', studentRoutes);
app.use('/classes', classRoutes);
app.use('/semesters', semesterRoutes);

//handle all other routes
app.all('*', (req, res, next) => {
  const err = new apiError(`Can't find ${req.originalUrl} on this server`, 404);
  next(err);
});

//global error handler
app.use(globalErrorHandler);

//check if db connection is successful
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully to db.');
    return sequelize.sync();
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

//create server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running |-_-|');
});
