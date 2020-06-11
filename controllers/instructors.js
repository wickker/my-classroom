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



  return {
    newInstructor,
  };
};

