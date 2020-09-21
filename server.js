const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");


const app = express();

app.use(bodyParser.json());

// app.use(
//     cookieSession({
//         maxAge: 10 * 24 * 60 * 60 * 1000,
//         keys: [keys.cookieKey],
//     })
// );

app.get('/', (req, res, next) => {
    res.send(
      '<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
    );
  });

  app.listen(process.env.PORT || 5000);

