module.exports = (pool) => {

  const writeNewInstructor = async (callback, name, image, about, checked) => {
    let queryText = `insert into instructors (name, image, about, is_delete) values ('${name}', '${image}', '${about}', false) returning *`;
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
  }

  return {
   writeNewInstructor,
  };
};
