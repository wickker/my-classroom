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
  // const sessions = require('./controllers/sessions')(allModels);
  const classes = require('./controllers/classes')(allModels);

  app.get('/classes', classes.getAllClasses);
  
};
