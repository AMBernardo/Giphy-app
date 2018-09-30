var topic = ["Cowboy Beebop", "Black Lagoon", "Jormungand", "Initial D"];

  function renderButtons(){

    $("#buttons-view").empty();

    for (var i = 0; i < topic.length; i++) {

    var a = $("<button>");
    a.addClass("anime btn btn-dark");
    a.attr("data-name", topic[i]);
    a.text(topic[i]);
    $("#buttons-view").append(a);
    }
  }


  $("#add-anime").on("click", function(event) {

    event.preventDefault();

    var anime = $("#anime-input").val().trim();
    topic.push(anime);

    renderButtons();
  });

    renderButtons();


function display() {
 
  var title = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    title + "&api_key=dc6zaTOxFJmzC&limit=10";


  $.ajax({
    url: queryURL,
    method: "GET"
  })
   
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var animeDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var animeImage = $("<img>");
        animeImage.attr("src", results[i].images.fixed_height_small_still.url);
        animeImage.attr("data-still", results[i].images.fixed_height_small_still.url);
        animeImage.attr("data-animate", results[i].images.fixed_height_small.url);
        animeImage.attr("data-state", "still");
        animeImage.addClass("gif");

        animeDiv.append(p);
        animeDiv.append(animeImage);

        $("#anime-view").prepend(animeDiv);
      }
    });
};




        function motion(){
            var state = $(this).attr("data-state");
            if (state === "still"){
                
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else{
                
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        };


$(document).on("click", ".gif", motion);
$(document).on("click", ".anime", display);


