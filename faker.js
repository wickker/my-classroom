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
//   let image = `http://via.placeholder.com/300/CCCCCC/969696/?text=Sample%20Image`;
//   let about = faker.lorem.paragraph();
//   let email = "admin" + i + "@mail.com";
//   let password = sha256("123456");
//   console.log(
//     `insert into instructors (name, image, about, is_delete, email, password) values ('${name}', '${image}', '${about}', false, '${email}', '${password}');`
//   );
// }

// sessions - CLASS 1 - once a week
// start date - 19 june 2020
// let startTime = new Date(2020, 5, 19, 16, 00);
// let startTimeMS = moment(startTime).valueOf();
// let endTime = new Date(2020, 5, 19, 18, 00);
// let endTimeMS = moment(endTime).valueOf();
// for (let i = 0; i < 4; i++) {
//   let classId = 1;
//   let location = "Bishan";
//   console.log(`insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startTimeMS}, ${endTimeMS}, '${location}', false);`);
//   startTimeMS = startTimeMS + 604800000;
//   endTimeMS = endTimeMS + 604800000;
// }

// sessions - CLASS 2 - 3 times a week (Tue, Thu, Sat)
// start date - 16 june 2020
// let startTime = new Date(2020, 5, 16, 14, 30);
// let startTimeMS = moment(startTime).valueOf();
// let endTime = new Date(2020, 5, 16, 16, 30);
// let endTimeMS = moment(endTime).valueOf();
// for (let i = 0; i < 4; i++) {
//   let classId = 2;
//   let location = faker.address.streetName();
//   console.log(`insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startTimeMS}, ${endTimeMS}, '${location}', false);`);
//   startTimeMS = startTimeMS + 604800000;
//   endTimeMS = endTimeMS + 604800000;
// }
// startTime = new Date(2020, 5, 18, 14, 30);
// startTimeMS = moment(startTime).valueOf();
// endTime = new Date(2020, 5, 18, 16, 30);
// endTimeMS = moment(endTime).valueOf();
// for (let i = 0; i < 4; i++) {
//   let classId = 2;
//   let location = faker.address.streetName();
//   console.log(`insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startTimeMS}, ${endTimeMS}, '${location}', false);`);
//   startTimeMS = startTimeMS + 604800000;
//   endTimeMS = endTimeMS + 604800000;
// }
// startTime = new Date(2020, 5, 20, 14, 30);
// startTimeMS = moment(startTime).valueOf();
// endTime = new Date(2020, 5, 20, 16, 30);
// endTimeMS = moment(endTime).valueOf();
// for (let i = 0; i < 4; i++) {
//   let classId = 2;
//   let location = faker.address.streetName();
//   console.log(`insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startTimeMS}, ${endTimeMS}, '${location}', false);`);
//   startTimeMS = startTimeMS + 604800000;
//   endTimeMS = endTimeMS + 604800000;
// }

// sessions - CLASS 3 - once a week
// start date - 17 june 2020
// let startTime = new Date(2020, 5, 17, 10, 00);
// let startTimeMS = moment(startTime).valueOf();
// let endTime = new Date(2020, 5, 17, 12, 00);
// let endTimeMS = moment(endTime).valueOf();
// for (let i = 0; i < 4; i++) {
//   let classId = 3;
//   let location = faker.address.streetName();
//   console.log(`insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startTimeMS}, ${endTimeMS}, '${location}', false);`);
//   startTimeMS = startTimeMS + 604800000;
//   endTimeMS = endTimeMS + 604800000;
// }

// sessions - CLASS 4 - twice a week (Thu, Fri)
// start date - 18 june 2020
// let startTime = new Date(2020, 5, 18, 13, 00);
// let startTimeMS = moment(startTime).valueOf();
// let endTime = new Date(2020, 5, 18, 15, 00);
// let endTimeMS = moment(endTime).valueOf();
// for (let i = 0; i < 4; i++) {
//   let classId = 4;
//   let location = faker.address.streetName();
//   console.log(`insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startTimeMS}, ${endTimeMS}, '${location}', false);`);
//   startTimeMS = startTimeMS + 604800000;
//   endTimeMS = endTimeMS + 604800000;
// }
// startTime = new Date(2020, 5, 19, 13, 00);
// startTimeMS = moment(startTime).valueOf();
// endTime = new Date(2020, 5, 19, 15, 00);
// endTimeMS = moment(endTime).valueOf();
// for (let i = 0; i < 4; i++) {
//   let classId = 4;
//   let location = faker.address.streetName();
//   console.log(`insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startTimeMS}, ${endTimeMS}, '${location}', false);`);
//   startTimeMS = startTimeMS + 604800000;
//   endTimeMS = endTimeMS + 604800000;
// }

// sessions - CLASS 5 - once a week (Sat)
// start date - 20 june 2020
// let startTime = new Date(2020, 5, 20, 9, 30);
// let startTimeMS = moment(startTime).valueOf();
// let endTime = new Date(2020, 5, 20, 11, 30);
// let endTimeMS = moment(endTime).valueOf();
// for (let i = 0; i < 4; i++) {
//   let classId = 5;
//   let location = faker.address.streetName();
//   console.log(`insert into sessions (class_id, start_datetime, end_datetime, location, is_delete) values (${classId}, ${startTimeMS}, ${endTimeMS}, '${location}', false);`);
//   startTimeMS = startTimeMS + 604800000;
//   endTimeMS = endTimeMS + 604800000;
// }

// students
// for (let i = 0; i < 50; i++) {
//   let name = faker.name.findName();
//   let image = "http://via.placeholder.com/300/CCCCCC/969696/?text=Sample%20Image";
//   let notes = faker.lorem.sentence();
//   let birthday = moment(faker.date.past()).valueOf();
//   let gender;
//   let num = randomIntFromInterval(1, 2);
//   num === 1 ? gender = "Male" : gender = "Female";
//   let is_delete = false;
//   console.log(
//     `insert into students (name, image, notes, birthday, gender, is_delete) values ('${name}', '${image}', '${notes}', ${birthday}, '${gender}', ${is_delete});`
//   );
// }

// classes
// for (let i = 0; i < 5; i++) {
//   let classTitles = [
//     "Recreation",
//     "Novice",
//     "Intermediate",
//     "Advanced",
//     "Adult",
//   ];
//   let colors = ["#AAB3AB", "#C4CBB7", "#EBEFC9", "#EEE0B7", "#E8CAAF"];
//   let description = faker.lorem.paragraph();
//   let isDelete = false;
//   let frequency = faker.lorem.sentence();
//   let image = "http://via.placeholder.com/300/CCCCCC/969696/?text=Sample%20Image";
//   console.log(
//     `insert into classes (title, description, is_delete, frequency, image, color) values ('${classTitles[i]}', '${description}', ${isDelete}, '${frequency}', '${image}', '${colors[i]}');`
//   );
// }

// attendance 
//CLASS 1
// student 1-10
// for (let i = 1; i < 11; i++) {
//   // session 1-4
//   for (let x = 1; x < 5; x++) {
//     let class_id = 1
//     let session_id = x;
//     let student_id = i;
//     let is_present = false;
//     let remarks = "";
//     let is_late = 0;
//     let document = "";
//     console.log(
//       `insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (${class_id}, ${session_id}, ${student_id}, ${is_present}, '${remarks}', ${is_late}, '${document}');`
//     );
//   }
// }
//CLASS 2
// student 11-20
// for (let i = 11; i < 21; i++) {
//   // session 5-16
//   for (let x = 5; x < 17; x++) {
//     let class_id = 2
//     let session_id = x;
//     let student_id = i;
//     let is_present = false;
//     let remarks = "";
//     let is_late = 0;
//     let document = "";
//     console.log(
//       `insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (${class_id}, ${session_id}, ${student_id}, ${is_present}, '${remarks}', ${is_late}, '${document}');`
//     );
//   }
// }
//CLASS 3
// student 21-30
// for (let i = 21; i < 31; i++) {
//   // session 17-20
//   for (let x = 17; x < 21; x++) {
//     let class_id = 3
//     let session_id = x;
//     let student_id = i;
//     let is_present = false;
//     let remarks = "";
//     let is_late = 0;
//     let document = "";
//     console.log(
//       `insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (${class_id}, ${session_id}, ${student_id}, ${is_present}, '${remarks}', ${is_late}, '${document}');`
//     );
//   }
// }
//CLASS 4
// student 31-40
// for (let i = 31; i < 41; i++) {
//   // session 21-28
//   for (let x = 21; x < 29; x++) {
//     let class_id = 4
//     let session_id = x;
//     let student_id = i;
//     let is_present = false;
//     let remarks = "";
//     let is_late = 0;
//     let document = "";
//     console.log(
//       `insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (${class_id}, ${session_id}, ${student_id}, ${is_present}, '${remarks}', ${is_late}, '${document}');`
//     );
//   }
// }
//CLASS 5
// student 41-50
// for (let i = 41; i < 51; i++) {
//   // session 29-32
//   for (let x = 29; x < 33; x++) {
//     let class_id = 5
//     let session_id = x;
//     let student_id = i;
//     let is_present = false;
//     let remarks = "";
//     let is_late = 0;
//     let document = "";
//     console.log(
//       `insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (${class_id}, ${session_id}, ${student_id}, ${is_present}, '${remarks}', ${is_late}, '${document}');`
//     );
//   }
// }

//INSTRUCTORS_CLASSES
//CLASS 1
// sessions 1-4
for (let i = 1; i < 5; i++) {
  let instructorId = 1;
  let classId = 1;
  let sessionId = i;
  console.log(`insert into instructors_classes (instructor_id, session_id, class_id) values (${instructorId}, ${sessionId}, ${classId});`);
}
//CLASS 2
// sessions 5-16
for (let i = 5; i < 17; i++) {
  let instructorId = 2;
  let classId = 2;
  let sessionId = i;
  console.log(`insert into instructors_classes (instructor_id, session_id, class_id) values (${instructorId}, ${sessionId}, ${classId});`);
}
//CLASS 3
// sessions 17-20
for (let i = 17; i < 21; i++) {
  let instructorId = 3;
  let classId = 3;
  let sessionId = i;
  console.log(`insert into instructors_classes (instructor_id, session_id, class_id) values (${instructorId}, ${sessionId}, ${classId});`);
}
//CLASS 4
// sessions 21-28
for (let i = 21; i < 29; i++) {
  let instructorId = 4;
  let classId = 4;
  let sessionId = i;
  console.log(`insert into instructors_classes (instructor_id, session_id, class_id) values (${instructorId}, ${sessionId}, ${classId});`);
}
//CLASS 5
// sessions 29-32
for (let i = 29; i < 33; i++) {
  let instructorId = 5;
  let classId = 5;
  let sessionId = i;
  console.log(`insert into instructors_classes (instructor_id, session_id, class_id) values (${instructorId}, ${sessionId}, ${classId});`);
}
