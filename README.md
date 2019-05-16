## heroku-express-pg-graphapi

### Set up and deploy on heroku

1. git init
2. heroku login
3. heroku create
4. git push heroku master

### Set up postgres heroku instance

1. heroku addons:create heroku-postgresql:hobby-dev
2. heroku config
3. Copy the POSTGRES_URL to .env file
4. Import db.sql

### Run

1. npm install
2. node index.js

### Sample Queries

Getting relational fields mixed with DB stored or static data:

```
{
  users {
    id
    fullname,
    role {
      name
    }
  }
  roles {
    name
  }
  books {
    id
    title
    publisher {
      name
    }
  }
  publishers {
    name
    books {
      title
    }
  }
}
```

Filtering data

```

```

Posting data using mutations:

A simple, static example

```
mutation {
  likeBook(bookId: 2) {
    id,
    title,
    likes
  }
}
```

A dynamic, db example

```
mutation {
  createUser(newUserInfo: {
	  fullname: "Jack"
	  email: "user3@email.com"
	  role: "editor"
  }) {
	  id
	  fullname
	  email
	  role {
		  name
	  }
  }
}
```
