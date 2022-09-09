DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS ratings_reivews CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


CREATE TABLE recipes (
 id SERIAL PRIMARY KEY NOT NULL,
 user_id INTEGER REFERENCES users(id),
 time_created TIMESTAMP DEFAULT Now(),
 time_edited TIMESTAMP DEFAULT Now(),
 recipe_title VARCHAR(255) NOT NULL,
 recipe_picture VARCHAR(255) NOT NULL,
 description TEXT NOT NULL,
 ingregients TEXT NOT NULL,
 total_time INTEGER NOT NULL,
 max_calories INTEGER NOT NULL,
 diet VARCHAR(255) NOT NULL
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  ext_recipe_id INTEGER NOT NULL,
  ext_recipe_title VARCHAR(255) NOT NULL
);

CREATE TABLE ratings_reivews (
 id SERIAL PRIMARY KEY NOT NULL,
 recipe_id INTEGER REFERENCES recipes(id) NOT NULL,
 user_id INTEGER REFERENCES users(id) NOT NULL,
 rating_score FLOAT NOT NULL,
 review TEXT NOT NULL
);