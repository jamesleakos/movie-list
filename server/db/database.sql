CREATE DATABASE movieDB;

USE movieDB;

CREATE TABLE movies (
  id int NOT NULL AUTO_INCREMENT,
  title VARCHAR(256),
  watched TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

INSERT INTO movies (title) VALUES ('Dune'), ('Dune 2');

