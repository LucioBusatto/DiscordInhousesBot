DROP DATABASE IF EXISTS inhouses

CREATE DATABASE inhouses;

USE inhouses;

CREATE TABLE players (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  elo INT NOT NULL,
  id_discord VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE teams (
  id INT NOT NULL AUTO_INCREMENT,
  elo INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE team_players (
  id INT NOT NULL AUTO_INCREMENT,
  id_team INT NOT NULL,
  id_role INT NOT NULL,
  id_player INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_team) REFERENCES teams(id),
  FOREIGN KEY (id_role) REFERENCES roles(id),
  FOREIGN KEY (id_player) REFERENCES players(id)
);

CREATE TABLE matches (
  id INT NOT NULL AUTO_INCREMENT,
  id_team_red INT NOT NULL,
  id_team_blue INT NOT NULL,
  id_team_winner INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_team_red) REFERENCES teams(id),
  FOREIGN KEY (id_team_blue) REFERENCES teams(id),
  FOREIGN KEY (id_team_winner) REFERENCES teams(id)
);
