module.exports = (pool) => {
  let queryAllClasses = async (callback) => {
    let queryText = `select * from classes order by title asc`;
    await pool.query(queryText).then(async (result) => {
      let data = {};
      data.classes = result.rows;
      console.log(data);
      for (let i = 0; i < data.classes.length; i++) {
        queryText = `select students.id, students.name, students.image, students.is_delete, attendance.class_id, attendance.session_id,attendance.student_id, attendance.is_present, attendance.remarks, attendance.is_late, attendance.document from students join attendance on (students.id = attendance.student_id) where attendance.class_id = ${data.classes[i].id} order by students.name asc`;
        console.log(queryText);
        await pool.query(queryText).then(async (result) => {
          data.classes[i].students = result.rows;
        });
      }
      callback(data);
    });
  };

  return {
    queryAllClasses,
  };
};
