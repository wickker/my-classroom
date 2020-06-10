module.exports = (pool) => {
  const writeNewSession = async (
    callback,
    classId,
    startDateTime,
    endDateTime,
    location,
    frequency,
    upTillDate
  ) => {
    let isDelete = false;
    let queryText = `select distinct on (student_id) student_id from attendance where class_id = ${classId}`;
    await pool.query(queryText).then(async (result) => {
      let studentIdsArr = result.rows;
      console.log(studentIdsArr);
      if (frequency === 1) {
        let queryText = `insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startDateTime}, ${endDateTime}, '${location}', ${isDelete}) returning *`;
        await pool.query(queryText).then(async (result) => {
          let newSession = result.rows[0];
          console.log(newSession);
          for (let i = 0; i < studentIdsArr.length; i++) {
            let queryText = `insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document) values (${classId}, ${newSession.id}, ${studentIdsArr[i].student_id}, false, '', 0, '') returning *`;
            await pool.query(queryText).then(async (result) => {
              console.log(result.rows[0]);
            });
          }
        });
      } else if (frequency === 2) {
        // 24 hours in mS
        let unit = 86400000;
        while (startDateTime < upTillDate) {
          let queryText = `insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startDateTime}, ${endDateTime}, '${location}', ${isDelete}) returning *`;
          await pool.query(queryText).then(async (result) => {
            let newSession = result.rows[0];
            console.log(newSession);
            for (let i = 0; i < studentIdsArr.length; i++) {
              let queryText = `insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document) values (${classId}, ${newSession.id}, ${studentIdsArr[i].student_id}, false, '', 0, '') returning *`;
              await pool.query(queryText).then(async (result) => {
                console.log(result.rows[0]);
              });
            }
          });
          startDateTime = startDateTime + unit;
          endDateTime = endDateTime + unit;
        }
      } else if (frequency === 3) {
        let unit = 604800000;
        while (startDateTime < upTillDate) {
          let queryText = `insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startDateTime}, ${endDateTime}, '${location}', ${isDelete}) returning *`;
          await pool.query(queryText).then(async (result) => {
            let newSession = result.rows[0];
            console.log(newSession);
            for (let i = 0; i < studentIdsArr.length; i++) {
              let queryText = `insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document) values (${classId}, ${newSession.id}, ${studentIdsArr[i].student_id}, false, '', 0, '') returning *`;
              await pool.query(queryText).then(async (result) => {
                console.log(result.rows[0]);
              });
            }
          });
          startDateTime = startDateTime + unit;
          endDateTime = endDateTime + unit;
        }
      }
      callback();
    });
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
      isPresent.includes(studentIdOrder[i])
        ? (is_present = true)
        : (is_present = false);
      let remarksInput = remarks[i];
      let is_late;
      isLate.includes(studentIdOrder[i]) ? (is_late = 1) : (is_late = 0);
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

  const removeSession = (callback, id) => {
    let queryText = `update sessions set is_delete = true where id = ${id} returning *`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        queryText = `delete from attendance where session_id = ${id} returning *`;
        pool.query(queryText, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            callback(result.rows);
          }
        });
      }
    });
  }

  const getAttendanceData = async (callback, classId) => {
    let queryText = `select * from attendance where class_id = ${classId}`;
    await pool.query(queryText).then(async (result) => {
      let data = {};
      data.attendance = result.rows;
      console.log(data);
      queryText = `select distinct on (attendance.student_id) attendance.student_id, attendance.class_id, students.name, students.image, students.notes, students.birthday, students.gender, students.is_delete from attendance join students on (attendance.student_id = students.id) where attendance.class_id = ${classId} and students.is_delete = false order by attendance.student_id`;
      await pool.query(queryText).then(async (result) => {
        console.log(result.rows);
        data.students = result.rows;
        queryText = `select distinct on (attendance.session_id) attendance.session_id, attendance.class_id, sessions.start_datetime, sessions.end_datetime, sessions.location, sessions.is_delete from attendance join sessions on (attendance.session_id = sessions.id) where attendance.class_id = ${classId} and sessions.is_delete = false order by attendance.session_id`;
        await pool.query(queryText).then(async (result) => {
          console.log(result.rows);
          data.sessions = result.rows;
          callback(data);
        });
      });
    });
  }

  return {
    writeNewSession,
    querySessionsByDateRange,
    markAttendance,
    removeSession,
    getAttendanceData,
  };
};
