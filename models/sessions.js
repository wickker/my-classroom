module.exports = (pool) => {
  const writeNewSession = (callback, classId, startDateTime, endDateTime, location, frequency, upTillDate) => {
    let isDelete = false;
    if (frequency === 1) {
      let queryText  = `insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startDateTime}, ${endDateTime}, '${location}', ${isDelete}) returning *`;
        pool.query(queryText, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            callback(result.rows[0]);
          }
        });
    } else if (frequency === 2) {
      // 24 hours in mS
      let unit = 86400000;
      while (startDateTime < upTillDate) {
        let queryText  = `insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startDateTime}, ${endDateTime}, '${location}', ${isDelete}) returning *`;
        pool.query(queryText, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            callback(result.rows[0]);
          }
        });
        startDateTime = startDateTime + unit;
        endDateTime = endDateTime + unit;
      }
    } else if (frequency === 3) {
      let unit = 604800000;
      while (startDateTime < upTillDate) {
        let queryText  = `insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startDateTime}, ${endDateTime}, '${location}', ${isDelete}) returning *`;
        pool.query(queryText, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            callback(result.rows[0]);
          }
        });
        startDateTime = startDateTime + unit;
        endDateTime = endDateTime + unit;
      }
    }
  }
  
  return {
    writeNewSession
  };
};
