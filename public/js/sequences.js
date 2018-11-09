$(document).ready(function() {
  var sequence=[];
  var li = $("<li>").appendTo('#sequence');
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/proctors/").then(function(data) {
      console.log(data)
      for(var x=0;x<data.length;x++) 
    {
      // sequence=JSON.parse(data[x].sequences);
      $(".proctor").append((`<h3>Proctor ${x+1}</h3><hr>`));
      $(".proctor").append((`<h4>${data[x].proctorName}</h4><ul> <li>${data[x].proctorInstitution}<li>${data[x].proctorEmail}<li>${data[x].proctorPhone}<li>${data[x].proctorType}</ul>`));
      // for (var i=0;i<sequence.length;i++)
      // {
      //   $(".sequence").append((sequence[i].term+" "+sequence[i].year+": "+sequence[i].course.name+": "+sequence[i].course.title +"<hr>"));
      //   console.log(sequence[i].term+" "+sequence[i].year+": "+sequence[i].course.name+": "+sequence[i].course.title)
      // }
  }
  });
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
    $(".member-name").text(data[0].email);
  });
});
