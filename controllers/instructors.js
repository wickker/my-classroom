module.exports = (db) => {
  const newInstructor = (request, response) => {
    console.log(request.body);
  }



  return {
    newInstructor,
  };
};

