module.exports = (app, allModels) => {

  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const sessions = require('./controllers/sessions')(allModels);
  const classes = require('./controllers/classes')(allModels);
  const students = require('./controllers/students')(allModels);

  app.get('/classes/get', classes.getAllClasses);

  app.post('/classes/new', classes.newClass);

  app.post('/classes/edit', classes.editClass);

  app.get('/sessions', sessions.getSessions);

  app.get('/sessions/attendance', sessions.getAttendanceByClass);

  app.post('/sessions/attendance/post', sessions.postAttendance);

  app.post('/sessions/post', sessions.newSession);

  app.post('/sessions/delete', sessions.deleteSession);

  app.get('/students/get', students.getStudents);

  app.post('/students/post', students.newStudent);

  app.post('/students/edit', students.editStudent);

  app.post('/students/delete', students.deleteStudent);
  
};
