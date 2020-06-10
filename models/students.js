module.exports = (pool) => {
  let addNewStudent = async (callback, name, birthday, classes, gender, notes, image) => {
    let queryText = `insert into students (name, image, notes, birthday, gender, is_delete) values ('${name}', '${image}', '${notes}', ${birthday}, '${gender}', false) returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows[0]);
      let studentId = result.rows[0].id;
      console.log("student id: ", studentId);
      for (let i = 0; i < classes.length; i++) {
        let classId = parseInt(classes[i]);
        queryText = `select id from sessions where class_id = ${classId}`;
        await pool.query(queryText).then(async (result) => {
          let sessions = result.rows;
          console.log(sessions);
          for (let x = 0; x < sessions.length; x++) {
            console.log("sessionId: ", sessions[x].id);
            queryText = `insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document) values (${classId}, ${sessions[x].id}, ${studentId}, false, '', 0, '') returning *`;
            await pool.query(queryText).then(async (result) => {
              console.log(result.rows[0]);
            });
          }
        });
      }
    });
    callback();
  };

  return {
    addNewStudent
  };
};
