module.exports = (pool) => {
  let addNewStudent = async (
    callback,
    name,
    birthday,
    classes,
    gender,
    notes,
    image
  ) => {
    let queryText = `insert into students (name, image, notes, birthday, gender, is_delete) values ('${name}', '${image}', '${notes}', ${birthday}, '${gender}', false) returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows[0]);
      let studentId = result.rows[0].id;
      console.log("student id: ", studentId);
      for (let i = 0; i < classes.length; i++) {
        let classId = parseInt(classes[i]);
        queryText = `select id from sessions where class_id = ${classId} and is_delete = false`;
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

  const queryStudents = async (callback) => {
    let queryText = `select * from students where is_delete = false order by students.name asc`;
    await pool.query(queryText).then(async (result) => {
      let students = result.rows;
      // console.log(students);
      for (let i = 0; i < students.length; i++) {
        queryText = `select distinct on (attendance.class_id) attendance.class_id, attendance.student_id, classes.title from attendance join classes on (attendance.class_id = classes.id) where classes.is_delete = false and attendance.student_id = ${students[i].id} order by attendance.class_id`;
        await pool.query(queryText).then(async (result) => {
          students[i].classes = result.rows;
          // console.log(students);
        });
      }
      callback(students);
    });
  };

  const writeEditStudent = async (
    callback,
    id,
    name,
    birthday,
    classes,
    gender,
    notes,
    image
  ) => {
    let queryText = `update students set name = '${name}', image = '${image}', notes = '${notes}', birthday = ${birthday}, gender = '${gender}' where id = ${id} returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log("updated ~ ", result.rows[0]);
      for (const key in classes) {
        let classId = parseInt(key);
        console.log("class id: ", classId);
        if (
          classes[key].og !== classes[key].current &&
          classes[key].current === false
        ) {
          queryText = `delete from attendance where class_id = ${classId} and student_id = ${id} returning *`;
          await pool.query(queryText).then(async (result) => {
            console.log(result.rows);
          });
        } else if (
          classes[key].og !== classes[key].current &&
          classes[key].current === true
        ) {
          queryText = `select id from sessions where class_id = ${classId} and is_delete = false`;
          await pool.query(queryText).then(async (result) => {
            let sessions = result.rows;
            console.log("sessions array: ", sessions);
            for (let x = 0; x < sessions.length; x++) {
              queryText = `insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document) values (${classId}, ${sessions[x].id}, ${id}, false, '', 0, '') returning *`;
              await pool.query(queryText).then(async (result) => {
                console.log(result.rows[0]);
              });
            }
          });
        }
      }
      callback();
    });
  };

  const removeStudent = (callback, id) => {
    let queryText = `update students set is_delete = true where id = ${id} returning *`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.rows[0]);
        callback();
      }
    });
  }

  return {
    addNewStudent,
    queryStudents,
    writeEditStudent,
    removeStudent,
  };
};
