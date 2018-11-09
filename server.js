// Requiring necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
const path = require('path');
// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 5000;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
// app.post('/api/world', (req, res) => {
  
//   db.Sequence.create({
//     email: "userID/email will go here",
//     sequences: req.body.post
//   })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
//     let seqs=JSON.parse(req.body.post)
//     //console.log(seqs);
    
// res.send(
  
//   `SAVED DATA: ${req.body.post}`,
// );
// });
// Syncing our database and logging a message to the user upon success
db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
