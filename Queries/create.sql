use library_db;
create table books(
ISBN varchar(20) not null,
Name varchar(50) not null,
Author varchar(30) not null,
image_name varchar(50),
Published int not null,
Pages int,
Quantity int,
primary key(ISBN)
);

use library_db;
select * from books;
drop table books;
create table issued(
    id int not null auto_increment,
    Name varchar(50) not null,
    Reg_no int not null,
    ISBN varchar(20) not null,
    Issue_date varchar(20) not null,
    Deadline varchar(20) not null,
    primary key(id)
)
use library_db;
select * from issued;

use library_db;
Select name from books where ISBN in (select ISBN from issued where Reg_no in (select Reg_no from users where username = 'rakib'));
delete from issued where Reg_no=2017331078;


insert into books(ISBN,Name,Author,Published,Pages,Quantity)
values('978-3-16-148410-0','Don quixote','Miguel De Cervantes',1995,120,3),
('978-3-16-148410-2','A Tale Of Two Cities','Charles Dickens',1990,135,2),
('979-4-16-148410-4','Hamlet','William Shakespeare',1940,97,15),
('111-3-16-148410-0','As Above So Below','Louis Pastour',1934,220,7);

select * from books;

use library_db;
insert into issued(Name,Reg_no,ISBN,Issue_date,Deadline)values('Fardin',2018331090,'1009-86-1-00222-1','01-12-2021','08-12-2021'),
('Rakib Hasan',2017331078,'1009-86-1-00222-1','02-12-2021','09-12-2021'),('Zakir',2017331068,'1234-99-8-18213-9','03-12-2021','10-12-2021');

use library_db;
drop table issued;


use library_db;
CREATE TABLE accounts (
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  primary key(username)
);

use library_db;
select * from accounts;
insert into accounts(username,password)values('prato','dawn2017');

use library_db;
CREATE TABLE images ( 
 id int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT, 
 image_name varchar(50) DEFAULT NULL
);

use library_db;
select * from images;

use library_db;
drop table images;