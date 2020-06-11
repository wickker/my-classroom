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

  const editClass = (request, response) => {
    console.log(request.body);
    let data = request.body;
    let callback = (result) => {
      console.log(result);
      response.redirect("/classes");
    }
    db.classes.writeEditClass(callback, data);
  }

  return {
    getAllClasses,
    newClass,
    editClass,
  };
};
