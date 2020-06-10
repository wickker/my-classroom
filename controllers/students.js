module.exports = (db) => {
  const newStudent = (request, response) => {
    console.log(request.body);
    let name = request.body.name;
    let birthday = request.body.birthday;
    let classes = request.body.checkClasses;
    let gender = request.body.gender;
    let notes = request.body.notes;
    let image = request.body.file;
    let callback = () => {
      response.redirect("/students");
    };
    db.students.addNewStudent(
      callback,
      name,
      birthday,
      classes,
      gender,
      notes,
      image
    );
  };

  const getStudents = (request, response) => {
    let callback = (result) => {
      console.log(result);
      response.send(result);
    }
    db.students.queryStudents(callback);
  }

  return {
    newStudent,
    getStudents,
  };
};

// https://res.cloudinary.com/dwoimiuph/image/upload/v1591789847/qfrsoroa8tsfahc3qdfg.png
