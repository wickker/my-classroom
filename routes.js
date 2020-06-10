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

  app.get('/classes', classes.getAllClasses);

  app.get('/sessions', sessions.getSessions);

  app.get('/sessions/attendance', sessions.getAttendanceByClass);

  app.post('/sessions/attendance/post', sessions.postAttendance);

  app.post('/sessions/post', sessions.newSession);

  app.post('/sessions/delete', sessions.deleteSession);
  
};
