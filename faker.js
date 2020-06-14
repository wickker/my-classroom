var faker = require("faker");
var moment = require("moment");
var sha256 = require("js-sha256");

// min and max included
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// instructors
// for (let i = 1; i < 6; i++) {
//   let name = faker.name.findName();
//   let image = `https://picsum.photos/id/${i}/300`;
//   let about = faker.lorem.sentence();
//   let email = "admin" + i + "@mail.com";
//   let password = sha256("123456");
//   console.log(
//     `insert into instructors (name, image, about, is_delete, email, password) values ('${name}', '${image}', '${about}', false, '${email}', '${password}');`
//   );
// }

// attendance
// for (let i = 1; i < 31; i++) {
//   let class_id = randomIntFromInterval(1, 5);
//   let session_id = 0
//   let student_id = i;
//   let is_present = false;
//   let remarks = "";
//   let is_late = 0;
//   let document = "";

//   console.log(
//     `insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (${class_id}, ${session_id}, ${student_id}, ${is_present}, '${remarks}', ${is_late}, '${document}');`
//   );
// }

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
for (let i = 0; i < 5; i++) {
  let classTitles = [
    "Recreation",
    "Novice",
    "Intermediate",
    "Advanced",
    "Adult",
  ];
  let colors = ["#AAB3AB", "#C4CBB7", "#EBEFC9", "#EEE0B7", "#E8CAAF"];
  let description = faker.lorem.paragraph();
  let isDelete = false;
  let frequency = faker.lorem.sentence();
  let image = "http://via.placeholder.com/300/CCCCCC/969696/?text=Sample%20Image";
  console.log(
    `insert into classes (title, description, is_delete, frequency, image, color) values ('${classTitles[i]}', '${description}', ${isDelete}, '${frequency}', '${image}', '${colors[i]}');`
  );
}
