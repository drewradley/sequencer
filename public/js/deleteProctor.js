$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.newproctor");
  var studentEmail= $("input#SE-input");



  // When the signup button is click;ed, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    
    var proctorData = {
      // email: emailInput.val().trim(),
      studentEmail: studentEmail.val().trim()
    };
    console.log("here check: "+ proctorData.studentEmail)
    deleteProctor(proctorData.studentEmail);
    
    // If we have an email and password, run the signUpUser function
    
    
    
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function deleteProctor(email) {
    //event.stopPropagation();
    //var id = $(this).data("id");
    console.log("delete proctor (student)"+email);
    $.ajax({
      method: "DELETE",
      url: "/api/proctors/" + email
    });
  }
  function getSequences() {
    $.get("/api/sequences/").then(function(data) {
      //console.log("!!!!!!!!!!!!!!!!!!!!")
      console.log(data)
     for(var x=0;x<data.length;x++) 
      {
        sequence=JSON.parse(data[x].sequences);
        $(".sequence").append((`<h3>Sequence ${x+1}</h3><hr>`));
  
        for (var i=0;i<sequence.length;i++)
        {
          $(".sequence").append((sequence[i].termActual+" "+sequence[i].yearActual+": "+sequence[i].course.name+": "+sequence[i].course.title +"<hr>"));
          console.log(sequence[i].term+" "+sequence[i].year+": "+sequence[i].course.name+": "+sequence[i].course.title)
        }
    }
      // $(".sequence")
     if(data.length>0)$(".member-name").text(data[0].email);
    });
  }
});
