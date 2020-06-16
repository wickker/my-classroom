module.exports = (pool) => {
  let queryAllClasses = async (callback) => {
    let queryText = `select * from classes where is_delete = false order by title asc`;
    await pool.query(queryText).then(async (result) => {
      let data = {};
      data.classes = result.rows;
      // console.log(data);
      // console.log('\n\n');
      // console.log('queryAllClasses');
      // console.log('\n\n');
      for (let i = 0; i < data.classes.length; i++) {
        queryText = `select students.id, students.name, students.image, students.is_delete, attendance.class_id, attendance.session_id,attendance.student_id, attendance.is_present, attendance.remarks, attendance.is_late, attendance.document from students join attendance on (students.id = attendance.student_id) where attendance.class_id = ${data.classes[i].id} and students.is_delete = false order by students.name asc`;
        // console.log(queryText);
        await pool.query(queryText).then(async (result) => {
          data.classes[i].students = result.rows;
          queryText = `select * from sessions where class_id = ${data.classes[i].id}`;
          await pool.query(queryText).then(async (result) => {
            data.classes[i].sessions = result.rows;
            queryText = `select distinct on (instructors_classes.instructor_id) instructors_classes.instructor_id, instructors_classes.class_id, instructors.name, instructors.about, instructors.image from instructors_classes join instructors on (instructors_classes.instructor_id = instructors.id) where instructors_classes.class_id = ${data.classes[i].id} and instructors.is_delete = false order by instructors_classes.instructor_id`;
            await pool.query(queryText).then(async (result) => {
              data.classes[i].instructors = result.rows;
            });
          });
        });
      }
      callback(data);
    });
  };

  const addNewClass = (callback, data) => {
    let queryText = `insert into classes (title, description, is_delete, frequency, image, color) values ('${data.title}', '${data.description}', false, '${data.frequency}', '${data.image}', '${data.color}') returning *`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        callback(result.rows[0]);
      }
    });
  };

  const writeEditClass = (callback, data) => {
    let queryText = `update classes set title = '${data.title}', description = '${data.description}', frequency = '${data.frequency}', image = '${data.image}', color = '${data.color}' where id = ${data.id} returning *`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        callback(result.rows[0]);
      }
    });
  };

  const removeClass = (callback, id) => {
    let queryText = `update classes set is_delete = true where id = ${id} returning *`;
    pool.query(queryText, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        callback(result.rows[0]);
      }
    });
  };

  return {
    queryAllClasses,
    addNewClass,
    writeEditClass,
    removeClass,
  };
};
