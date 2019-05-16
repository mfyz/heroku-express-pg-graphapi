
CREATE TABLE users (
	id serial,
	fullname text DEFAULT null,
	email text DEFAULT null,
	role text DEFAULT NULL
);

INSERT INTO users VALUES 
  (1, 'Mehmet Yildiz', 'user1@email.com', 'admin'),
  (2, 'Fatih Yildiz', 'user2@email.com', 'editor');

SELECT setval('users_id_seq', 3, false);