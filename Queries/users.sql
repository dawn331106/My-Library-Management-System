use library_db;
create table users(
first_name varchar(25) not null,
last_name varchar(25) not null,
dept varchar(50) not null,
reg_no int not null,
username varchar(50) not null,
password varchar(50) not null,
email varchar(70) not null,
primary key(username)
);


use library_db;
insert into users(first_name,last_name,dept,reg_no,username,
password,email)values('Prato','Dewan','Computer Science & Engineering',2017331106,'dawn106','dawn106','pratodewan1@gmail.com');

use library_db;
select * from users;

use library_db;
create table borrowed(
id int not null auto_increment,
reg_no int not null,
ISBN varchar(55) not null,
primary key(id)
);

use library_db;
select * from borrowed;

use library_db;
insert into borrowed(reg_no,ISBN)values(2017331106,'1234-99-8-18213-9'),(2017331106,'13-766365-123-12'),(2017331106,'1009-86-1-00222-1'),
(2017331078,'1009-86-1-00222-1');