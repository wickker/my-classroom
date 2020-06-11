module.exports = (db) => {
  const newInstructor = (request, response) => {
    console.log(request.body);
    let name = request.body.name;
    let image = request.body.image;
    let about = request.body.about;
    let checked = request.body.checkedState;
    let callback = () => {
      response.redirect("/instructors");
    }
    db.instructors.writeNewInstructor(callback, name, image, about, checked);
  }

  const getInstructors = (request, response) => {
    let callback = (result) => {
      console.log(result);
      response.send(result);
    }
    db.instructors.queryInstructors(callback);
  }


  return {
    newInstructor,
    getInstructors,
  };
};

