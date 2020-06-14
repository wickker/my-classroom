create table if not exists users (
id serial primary key,
username text,
email text, 
password text
);

create table if not exists classes (
  id serial primary key,
  title text,
  description text,
  is_delete boolean,
  frequency text,
  image text,
  color text
  );

create table if not exists instructors (
  id serial primary key,
  name text,
  image text,
  about text,
  email text,
  password text,
  is_delete boolean
  );

create table if not exists instructors_classes (
  id serial primary key,
  instructor_id integer,
  session_id integer,
  class_id integer
  );

create table if not exists students (
  id serial primary key,
  name text,
  image text,
  notes text,
  is_delete boolean,
  birthday bigint,
  gender text
  );

create table if not exists sessions (
  id serial primary key,
  class_id integer,
  start_datetime bigint,
  end_datetime bigint,
  location text,
  is_delete boolean
  );

create table if not exists attendance (
  id serial primary key,
  class_id integer,
  session_id integer,
  student_id integer,
  is_present boolean,
  remarks text,
  is_late integer,
  document text
  );
