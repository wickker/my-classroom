module.exports = (pool) => {
  const writeNewInstructor = async (callback, name, image, about, email, password, checked) => {
    let queryText = `insert into instructors (name, image, about, email, password, is_delete) values ('${name}', '${image}', '${about}', '${email}', '${password}', false) returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows[0]);
      let instructorId = result.rows[0].id;
      console.log(instructorId);
      for (const key in checked) {
        let obj = checked[key]["current"];
        for (const prop in obj) {
          if (obj[prop]) {
            let sessionId = parseInt(prop);
            let classId = parseInt(key);
            queryText = `insert into instructors_classes (instructor_id, session_id, class_id) values (${instructorId}, ${sessionId}, ${classId}) returning *`;
            await pool.query(queryText).then(async (result) => {
              console.log(result.rows[0]);
            });
          }
        }
      }
    });
    callback();
  };

  const writeEditInstructor = async (
    callback,
    id,
    name,
    image,
    about,
    checked,
    email, 
    password
  ) => {
    let queryText = `update instructors set name = '${name}', image = '${image}', about = '${about}', email = '${email}', password = '${password}' where id = ${id} returning *`;
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows[0]);
      for (const key in checked) {
        let current = checked[key]["current"];
        let og = checked[key]["og"];
        for (const prop in current) {
          let sessionId = parseInt(prop);
          let classId = parseInt(key);
          if (current[prop] !== og[prop] && current[prop]) {
            queryText = `insert into instructors_classes (instructor_id, session_id, class_id) values (${id}, ${sessionId}, ${classId}) returning *`;
            await pool.query(queryText).then(async (result) => {
              console.log(result.rows[0]);
            });
          } else if (current[prop] !== og[prop] && !current[prop]) {
            queryText = `delete from instructors_classes where instructor_id = ${id} and session_id = ${sessionId} and class_id = ${classId} returning *`;
            await pool.query(queryText).then(async (result) => {
              console.log(result.rows[0]);
            });
          }
        }
      }
    });
    callback();
  };

  const queryInstructors = async (callback) => {
    let queryText = `select * from instructors where is_delete = false order by name asc`;
    console.log(queryText);
    await pool.query(queryText).then(async (result) => {
      console.log(result.rows);
      let data = result.rows;
      for (let i = 0; i < data.length; i++) {
        queryText = `select distinct on (instructors_classes.class_id) instructors_classes.class_id, classes.title from instructors_classes join classes on (instructors_classes.class_id = classes.id) where instructors_classes.instructor_id = ${data[i].id} and classes.is_delete = false order by instructors_classes.class_id`;
        await pool.query(queryText).then(async (result) => {
          data[i].classes = result.rows;
          queryText = `select instructors_classes.session_id, sessions.start_datetime, sessions.class_id from instructors_classes join sessions on (instructors_classes.session_id = sessions.id) where sessions.is_delete = false and instructors_classes.instructor_id = ${data[i].id}`;
          await pool.query(queryText).then(async (result) => {
            data[i].sessions = result.rows;
          });
        });
      }
      callback(data);
    });
  };

  const removeInstructor = (callback, id) => {
    let queryText = `update instructors set is_delete = true where id = ${id} returning *`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        callback();
      }
    });
  }

  return {
    writeNewInstructor,
    queryInstructors,
    writeEditInstructor,
    removeInstructor,
  };
};
