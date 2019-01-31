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
    console.log("find proctor (student)"+email);
    $.get("/api/findproctor/" + email).then(function(data) {
      console.log(data);
      if(data.length>0)$(".member-name").text(data[0].studentEmail);
      else $(".member-name").text("No student record found for that email address.");
      for(var x=0;x<data.length;x++) 
    {
      // sequence=JSON.parse(data[x].sequences);
      $(".proctor").append((`<h3>Proctor ${x+1}</h3><hr>`));
      $(".proctor").append((`<h4>${data[x].proctorName}</h4><ul> 
      <li> Proctor Institution: ${data[x].proctorInstitution}
      <li>Proctor Email: ${data[x].proctorEmail}
      <li>Proctor Phone: ${data[x].proctorPhone}
      <li>Proctor Type: ${data[x].proctorType}
      <li>Current Course: ${data[x].studentCurCourse}</ul>`));
      // for (var i=0;i<sequence.length;i++)
      // {
      //   $(".sequence").append((sequence[i].term+" "+sequence[i].year+": "+sequence[i].course.name+": "+sequence[i].course.title +"<hr>"));
      //   console.log(sequence[i].term+" "+sequence[i].year+": "+sequence[i].course.name+": "+sequence[i].course.title)
      // }
  }
    })
    // $.ajax({
    //   method: "POST",
    //   url: "/api/findproctor/" + email
    // });
  }
  
});
