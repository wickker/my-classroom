module.exports = (pool) => {
  const writeNewSession = (
    callback,
    classId,
    startDateTime,
    endDateTime,
    location,
    frequency,
    upTillDate
  ) => {
    let isDelete = false;
    if (frequency === 1) {
      let queryText = `insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startDateTime}, ${endDateTime}, '${location}', ${isDelete}) returning *`;
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
        let queryText = `insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startDateTime}, ${endDateTime}, '${location}', ${isDelete}) returning *`;
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
        let queryText = `insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startDateTime}, ${endDateTime}, '${location}', ${isDelete}) returning *`;
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
  };

  const querySessionsByDateRange = (callback, startDate, endDate) => {
    let queryText = `select * from sessions where start_datetime >= ${startDate} and start_datetime <= ${endDate} order by start_datetime asc`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        callback(result.rows);
      }
    });
  };

  const markAttendance = (
    callback,
    studentIdOrder,
    isPresent,
    isLate,
    remarks,
    document,
    sessionId
  ) => {
    for (let i = 0; i < studentIdOrder.length; i++) {
      let is_present;
      isPresent.includes(studentIdOrder[i]) ? is_present = true : is_present = false;
      let remarksInput = remarks[i];
      let is_late;
      isLate.includes(studentIdOrder[i]) ? is_late = 1 : is_late = 0;
      let documentInput = document[i];
      let studentId = parseInt(studentIdOrder[i]);
      let queryText = `update attendance set is_present = ${is_present}, remarks = '${remarksInput}', is_late = ${is_late}, document = '${documentInput}' where session_id = ${sessionId} and student_id = ${studentId} returning *`;
      pool.query(queryText, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result.rows);
        }
      });
    }
    callback();
  };

  return {
    writeNewSession,
    querySessionsByDateRange,
    markAttendance,
  };
};
