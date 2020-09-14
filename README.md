# requirement
node version = 12

# install
npm install

# run
nodemon app.js

## Database schema
```sql
create database `md-db`;
use `md-db`;

create table User (
  UserId               integer unsigned not null auto_increment,
  Firstname            text,
  Lastname             text,
  Email                text not null,
  Password             text,
  PasswordResetRequest text,
  Role                 text,
  primary key       (UserId),
  unique  key Email (Email(24))
) engine=InnoDB charset=utf8 auto_increment=100001;
```

## Test data

```sql
INSERT INTO User VALUES
  (100001,'Guest','User','guest@user.com','c2NyeXB0AA8AAAAIAAAAAadRWAxJ7PVQ8T6zW7orsuCiHr38TPYJ9TGVbHEK5hvdbC7lCKxKdebdo0T0wR9Aiye4GQDHbLkcBNVVQZpBDtWGfezCWZvtcw4JZ90HDuhb',null,'guest'),
  (100002,'Admin','User','admin@user.com','c2NyeXB0AA4AAAAIAAAAAfvrpUA5jkh3ObPPUPNQEjbkHXk4vj4xPWH6N8yLEvbgkKqW5zqv3AgsHtTcSL2lzfviyMkXjybHPXeqDY62ZxHEvmTgEY6THddbqOUAOzTQ',null,'admin');
```

