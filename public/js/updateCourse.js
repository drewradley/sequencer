$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.newproctor");
  var emailInput = $("input#email-input");
  //var passwordInput = $("input#password-input");
  //var firstName = $("input#FN-input");
  //var lastName = $("input#LN-input");
  // var proctorName = $("input#PN-input");
  // var proctorInstitution = $("input#PI-input");
  // var proctorEmail = $("input#PE-input");
  // var proctorPhone = $("input#PP-input");
  // var proctorType= $("#PP-type");
  // var studentEmail= $("input#SE-input");
  // var studentNameFirst= $("input#SFN-input");
  // var studentNameLast= $("input#SLN-input");
  // var studentAccommodations= $("input#SA-input");
  var studentCurCourse= $("input#SCC-input");


  // When the signup button is click;ed, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    console.log(proctorType.val())
    var proctorData = {
      // email: emailInput.val().trim(),
      // proctorName: proctorName.val().trim(),
      // proctorInstitution: proctorInstitution.val().trim(),
      // proctorEmail: proctorEmail.val().trim(),
      // proctorPhone: proctorPhone.val().trim(),
      // proctorType: proctorType.val(),
      // studentEmail: studentEmail.val().trim(),
      // studentNameFirst: studentNameFirst.val().trim(),
      // studentNameLast: studentNameLast.val().trim(),
      // studentAccommodations: studentAccommodations.val().trim(),
      studentCurCourse: studentCurCourse.val().trim()
    };

    
    // If we have an email and password, run the signUpUser function
    signUpUser(proctorData.studentCurCourse);
    studentCurCourse.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(studentCurCourse) {
    $.post("/api/updateproctor", {
      
      studentCurCourse: studentCurCourse
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
    alert("Course has been Updated")
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
