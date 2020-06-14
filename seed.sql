-- instructors who can login
insert into instructors (name, image, about, is_delete, email, password) values ('Devyn Osinski', 'https://picsum.photos/id/1/300', 'Commodi dolore ea.', false, 'admin1@mail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
insert into instructors (name, image, about, is_delete, email, password) values ('Raven Altenwerth', 'https://picsum.photos/id/2/300', 'Laborum rerum quam hic dicta.', false, 'admin2@mail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
insert into instructors (name, image, about, is_delete, email, password) values ('Jerrell Jakubowski', 'https://picsum.photos/id/3/300', 'Libero assumenda maxime accusamus est molestias et fugiat assumenda corporis.', false, 'admin3@mail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
insert into instructors (name, image, about, is_delete, email, password) values ('Lavada Klocko', 'https://picsum.photos/id/4/300', 'Nostrum debitis dolores quasi modi optio voluptas.', false, 'admin4@mail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
insert into instructors (name, image, about, is_delete, email, password) values ('Naomie Haley', 'https://picsum.photos/id/5/300', 'Consectetur ad dolore voluptas similique.', false, 'admin5@mail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');



-- classes
insert into classes (title, description, is_delete, frequency, image, color) values ('Recreation', 'Atque et saepe id magnam. Distinctio et omnis magni. Minima facilis quod reprehenderit debitis. Quaerat nostrum aliquid eos voluptatum numquam. Omnis quam veritatis iusto nobis voluptatem soluta. Soluta aspernatur nisi qui et voluptatibus at voluptates quam.', false, 'Deserunt deserunt nesciunt sint.', 'http://via.placeholder.com/300/CCCCCC/969696/?text=Sample%20Image', '#AAB3AB');
insert into classes (title, description, is_delete, frequency, image, color) values ('Novice', 'Qui quibusdam ex et dolores deleniti. Quas est neque cumque et. Dolorem nemo eius facilis autem saepe aperiam earum veritatis recusandae. Nihil sit itaque at. Reiciendis deleniti optio placeat quasi. Corrupti nemo cum debitis.', false, 'Et voluptatem totam ullam facilis.', 'http://via.placeholder.com/300/CCCCCC/969696/?text=Sample%20Image', '#C4CBB7');
insert into classes (title, description, is_delete, frequency, image, color) values ('Intermediate', 'Ducimus unde reprehenderit quae temporibus iste. Aut ex impedit. Natus eum nihil ut ut est libero quod est magnam. Non commodi et eum in sequi voluptatum voluptatem eos placeat.', false, 'Sequi cum voluptate porro aut enim voluptatem impedit quod est.', 'http://via.placeholder.com/300/CCCCCC/969696/?text=Sample%20Image', '#EBEFC9');
insert into classes (title, description, is_delete, frequency, image, color) values ('Advanced', 'Animi unde ut quia commodi architecto molestiae odio doloremque temporibus. Ipsam quia voluptas voluptas amet dignissimos dolor ea quia. A nihil aspernatur eum ut et ut earum. Atque qui sed aut error rerum.', false, 'Voluptates quia vitae.', 'http://via.placeholder.com/300/CCCCCC/969696/?text=Sample%20Image', '#EEE0B7');
insert into classes (title, description, is_delete, frequency, image, color) values ('Adult', 'Qui fugit magnam rerum magnam facere labore ad aut voluptas. A voluptatem consequatur. Magnam impedit ipsam et id recusandae dolorum. Consequatur rerum quia impedit ut dolorem. Optio necessitatibus soluta expedita animi repellendus aliquam. Sequi nisi distinctio.', false, 'Illo ducimus tempore quibusdam necessitatibus.', 'http://via.placeholder.com/300/CCCCCC/969696/?text=Sample%20Image', '#E8CAAF');




insert into students (name, image, notes, birthday, gender, is_delete) values ('Nelson Turcotte', 'https://via.placeholder.com/300', 'Iure enim molestias magni ipsum consequuntur.', 1568923903478, 'Male', false);
insert into students (name, image, notes, birthday, gender, is_delete) values ('Eden Moen', 'https://via.placeholder.com/300', 'Maxime dolorem distinctio voluptatum.', 1590383576771, 'Male', false);
insert into students (name, image, notes, birthday, gender, is_delete) values ('Noemy Tillman', 'https://via.placeholder.com/300', 'Ut eum molestiae sit est minus inventore commodi praesentium.', 1574338950008, 'Male', false);
insert into students (name, image, notes, birthday, gender, is_delete) values ('Creola Stark', 'https://via.placeholder.com/300', 'Omnis est quae molestias nesciunt officia sed dicta fugiat.', 1574126174621, 'Male', false);
insert into students (name, image, notes, birthday, gender, is_delete) values ('Winston Ledner', 'https://via.placeholder.com/300', 'Voluptatem corrupti et cumque magni id et.', 1579467064373, 'Male', false);
insert into students (name, image, notes, birthday, gender, is_delete) values ('Wanda Hahn', 'https://via.placeholder.com/300', 'Quia vel unde similique debitis nulla facilis velit veniam omnis.', 1589632955605, 'Male', false);



insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (1, 4, 1, false, '', 0, '');
insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (1, 5, 1, false, '', 0, '');
insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (1, 10, 1, false, '', 0, '');
insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (1, 4, 2, false, '', 0, '');
insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (1, 5, 2, false, '', 0, '');
insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (1, 10, 2, false, '', 0, '');
insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (1, 4, 3, false, '', 0, '');
insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (1, 5, 3, false, '', 0, '');
insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (1, 10, 3, false, '', 0, '');
insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (2, 8, 4, false, '', 0, '');
insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (2, 8, 5, false, '', 0, '');
insert into attendance (class_id, session_id, student_id, is_present, remarks, is_late, document ) values (2, 8, 6, false, '', 0, '');
