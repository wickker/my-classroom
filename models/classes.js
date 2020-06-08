module.exports = (pool) => {
  let queryAllClasses = (callback) => {
    let queryText = `select * from classes order by title asc`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        callback(result.rows);
      }
    });
  } 

  return {
    queryAllClasses,  
  };
};
