$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.findproctor");
  var studentEmail= $("input#SE-input");



  // When the signup button is click;ed, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    
    var proctorData = {
      // email: emailInput.val().trim(),
      studentEmail: studentEmail.val().trim()
    };
    console.log("here check: "+ proctorData.studentEmail)
    findProctor(proctorData.studentEmail);
    
    // If we have an email and password, run the signUpUser function
    
    
    
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function findProctor(email) {
    //event.stopPropagation();
    //var id = $(this).data("id");
    console.log("delete proctor (student)"+email);
    $.ajax({
      method: "POST",
      url: "/api/findproctor/" + email
    });
  }
  
});
