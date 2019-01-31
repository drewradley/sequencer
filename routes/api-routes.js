// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
// var axios = require("axios");
module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    //res.json("/sequencer/sequencer.html");
    res.json("/sequences.html");
  });

  app.post('/api/world', (req, res) => {
  
    db.Sequence.create({
      email: req.user.email,
      sequences: req.body.post
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
      let seqs=JSON.parse(req.body.post)
      //console.log(seqs);
      
  res.send(
    
    `SAVED DATA: ${req.body.post}`,
  );
  });
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  app.post("/api/newproctor", function(req, res) {
    console.log(req.body);
    if (req.user.email!='sph.digital.learning@berkeley.edu') {
      // The user is not logged in, send back an empty object
      res.json({});
      return;
    }
  
    db.Proctor.create({
      proctorName: req.body.proctorName,
      proctorInstitution: req.body.proctorInstitution,
      proctorEmail: req.body.proctorEmail,
      proctorPhone: req.body.proctorPhone,
      proctorType: req.body.proctorType,
      studentEmail: req.body.studentEmail,
      studentNameFirst: req.body.studentNameFirst,
      studentNameLast: req.body.studentNameLast,
      studentAccommodations: req.body.studentAccommodations,
      studentCurCourse: req.body.studentCurCourse

    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  app.post("/api/updateproctor", function(req, res) {
    console.log(req.body);
    if (req.user.email!='sph.digital.learning@berkeley.edu') {
      // The user is not logged in, send back an empty object
      res.json({});
      return;
    }
    db.Proctor.update({
      proctorName: req.body.proctorName,
      proctorInstitution: req.body.proctorInstitution,
      proctorEmail: req.body.proctorEmail,
      proctorPhone: req.body.proctorPhone,
      proctorType: req.body.proctorType,
      studentEmail: req.body.studentEmail,
      studentNameFirst: req.body.studentNameFirst,
      studentNameLast: req.body.studentNameLast,
      studentAccommodations: req.body.studentAccommodations,
      studentCurCourse: req.body.studentCurCourse
    }, {
      where: {
        studentEmail: req.body.studentEmail
      }
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  app.post("/api/updateCourse", function(req, res) {
    console.log(req.body);

    db.Proctor.update({
      // proctorName: req.body.proctorName,
      // proctorInstitution: req.body.proctorInstitution,
      // proctorEmail: req.body.proctorEmail,
      // proctorPhone: req.body.proctorPhone,
      // proctorType: req.body.proctorType,
      // studentEmail: req.body.studentEmail,
      // studentNameFirst: req.body.studentNameFirst,
      // studentNameLast: req.body.studentNameLast,
      // studentAccommodations: req.body.studentAccommodations,
      studentCurCourse: req.body.studentCurCourse
    }, {
      where: {
        studentEmail: req.user.email
      }
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    console.log(req.user)
    if (req.user.email!='sph.digital.learning@berkeley.edu') {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
         });
    }
  });
  app.get("/api/sequences/", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      db.Sequence.findAll({
        where: {
          email: req.user.email
        }
      })
        .then(function(dbPost) {
          res.json(dbPost);
        });
    
    }
  });
  app.get("/api/proctors/", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      db.Proctor.findAll({
        where: {
          studentEmail: req.user.email
        }
      })
        .then(function(dbPost) {
          res.json(dbPost);
        });
    
    }
  });
  app.get("/api/allproctors/", function(req, res) {
    if (req.user.email!='sph.digital.learning@berkeley.edu') {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      db.Proctor.findAll({
 
      })
        .then(function(dbPost) {
          res.json(dbPost);
        });
    
    }
  });
  app.delete("/api/proctors/:email", function(req, res) {
    if (req.user.email!='sph.digital.learning@berkeley.edu') {
      // The user is not logged in, send back an empty object
      res.json({});
      return;
    }// We just have to specify which todo we want to destroy with "where"
    db.Proctor.destroy({
      where: {
        studentEmail: req.params.email
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });

  });
  app.get("/api/findproctor/:email", function(req, res) {
    console.log(req.params.email);
    if (req.user.email!='sph.digital.learning@berkeley.edu') {
      // The user is not logged in, send back an empty object
      res.json({});
      return;
    }// We just have to specify which todo we want to destroy with "where"
    db.Proctor.findAll({
      where: {
        studentEmail: req.params.email
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });

  });
};
