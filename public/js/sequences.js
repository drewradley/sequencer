$(document).ready(function() {
  var sequence=[];
  var li = $("<li>").appendTo('#sequence');
  $(document).on("click", "button.delete", deleteProctor);
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/proctors/").then(function(data) {
      console.log(data)
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
  });
  getSequences() ;
  ////////////////////////////////////////
  function deleteProctor(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/proctors/" + id
    }).then(getSequences);
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
