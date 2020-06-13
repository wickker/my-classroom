-- instructors who can login
insert into instructors (name, image, about, is_delete, email, password) values ('Devyn Osinski', 'https://picsum.photos/id/1/300', 'Commodi dolore ea.', false, 'admin1@mail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
insert into instructors (name, image, about, is_delete, email, password) values ('Raven Altenwerth', 'https://picsum.photos/id/2/300', 'Laborum rerum quam hic dicta.', false, 'admin2@mail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
insert into instructors (name, image, about, is_delete, email, password) values ('Jerrell Jakubowski', 'https://picsum.photos/id/3/300', 'Libero assumenda maxime accusamus est molestias et fugiat assumenda corporis.', false, 'admin3@mail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
insert into instructors (name, image, about, is_delete, email, password) values ('Lavada Klocko', 'https://picsum.photos/id/4/300', 'Nostrum debitis dolores quasi modi optio voluptas.', false, 'admin4@mail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
insert into instructors (name, image, about, is_delete, email, password) values ('Naomie Haley', 'https://picsum.photos/id/5/300', 'Consectetur ad dolore voluptas similique.', false, 'admin5@mail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');




insert into classes (title, description, is_delete, frequency, image) values ('Legros and Sons', 'Consequatur laudantium dolor voluptatum qui.', false, 'Non quisquam earum iste.', 'https://via.placeholder.com/300');
insert into classes (title, description, is_delete, frequency, image) values ('Nienow, Tremblay and Schaden', 'Dolores animi sapiente perferendis et error accusantium.', false, 'Impedit quasi debitis cumque dolor.', 'https://via.placeholder.com/300');
insert into classes (title, description, is_delete, frequency, image) values ('Hansen - Shanahan', 'Excepturi est voluptas.', false, 'Animi aut repellendus iste est tenetur officia ea numquam.', 'https://via.placeholder.com/300');
insert into classes (title, description, is_delete, frequency, image) values ('Legros - Cummings', 'Mollitia provident autem laboriosam.', false, 'Voluptate dignissimos quia omnis accusantium expedita.', 'https://via.placeholder.com/300');
insert into classes (title, description, is_delete, frequency, image) values ('Flatley - Herzog', 'Dolorem omnis modi eum aut.', false, 'Fugit ratione quaerat officia repellendus placeat vero.', 'https://via.placeholder.com/300');



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
