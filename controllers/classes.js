module.exports = (db) => {
  
  const getAllClasses = (request, response) => {
    let callback = (result) => {
      console.log(result);
      response.send(result);
    }
    db.classes.queryAllClasses(callback);
  }
  
  const newClass = (request, response) => {
    console.log(request.body);
    let data = request.body;
    let callback = (result) => {
      console.log(result);
      response.redirect("/classes");
    }
    db.classes.addNewClass(callback, data);
  }

  return {
    getAllClasses,
    newClass,
  };
};
