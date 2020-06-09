var faker = require("faker");
var moment = require("moment");

// min and max included
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// attendance
for (let i = 1; i < 31; i++) {
  let class_id = randomIntFromInterval(1, 5);
  let session_id = 0
  let student_id = i;
  let is_present = false;
  let remarks = "";
  let is_late = 0;
  let document = "";

  console.log(
    `insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (${class_id}, ${session_id}, ${student_id}, ${is_present}, '${remarks}', ${is_late}, '${document}');`
  );
}

// students
// for (let i = 0; i < 30; i++) {
//   let name = faker.name.findName();
//   let image = "https://via.placeholder.com/300";
//   let notes = faker.lorem.sentence();
//   let birthday = moment(faker.date.past()).valueOf();
//   let gender = "Male";
//   let is_delete = false;
//   console.log(
//     `insert into students (name, image, notes, birthday, gender, is_delete) values ('${name}', '${image}', '${notes}', ${birthday}, '${gender}', ${is_delete});`
//   );
// }


// classes
// for (let i = 0; i < 5; i++) {
//   let title = faker.company.companyName();
//   let description = faker.lorem.sentence();
//   let isDelete = false;
//   let frequency = faker.lorem.sentence();
//   let image = "https://via.placeholder.com/300";
//   console.log(
//     `insert into classes (title, description, is_delete, frequency, image) values ('${title}', '${description}', ${isDelete}, '${frequency}', '${image}');`
//   );
// }