module.exports = (db) => {
  
  const getAllClasses = (request, response) => {
    let callback = (result) => {
      response.send(result);
    }
    db.classes.queryAllClasses(callback);
  }
  
  return {
    getAllClasses,
  };
};
