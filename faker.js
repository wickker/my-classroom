var faker = require("faker");

// min and max included
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// classes
for (let i = 0; i < 5; i++) {
  let title = faker.company.companyName();
  let description = faker.lorem.sentence();
  let isDelete = false;
  let frequency = faker.lorem.sentence();
  let image = "https://via.placeholder.com/300";
  console.log(
    `insert into classes (title, description, is_delete, frequency, image) values ('${title}', '${description}', ${isDelete}, '${frequency}', '${image}');`
  );
}
