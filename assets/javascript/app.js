  // Initial array of movies
  var topic = ["Cowboy Beebop", "Black Lagoon", "Jormungand", "Initial D"];

  function renderButtons(){

      $("#buttons-view").empty();

    for (var i = 0; i < topic.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("anime btn btn-dark");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", topic[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(topic[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
    }
  }


  // This function handles events where one button is clicked
  $("#add-anime").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var anime = $("#anime-input").val().trim();
    // The movie from the textbox is then added to our array
    topic.push(anime);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();




    // Adding click event listen listener to all buttons
function display() {
  // Grabbing and storing the data-animal property value from the button
  var title = $(this).attr("data-name");

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    title + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var animeDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var animeImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        animeImage.attr("src", results[i].images.fixed_height_small_still.url);
        animeImage.attr("data-still", results[i].images.fixed_height_small_still.url);
        animeImage.attr("data-animate", results[i].images.fixed_height_small.url);
        animeImage.attr("data-state", "still");
        animeImage.addClass("gif");

        // Appending the paragraph and image tag to the animalDiv
        animeDiv.append(p);
        animeDiv.append(animeImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#anime-view").prepend(animeDiv);
      }
    });
};




        function motion(){
            var state = $(this).attr("data-state");
            if (state === "still"){
                // animeImage.attr("src", results[i].images.fixed_height.url);
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else{
                // animeImage.attr("src", results[i].images.original_still.url);
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        };


$(document).on("click", ".gif", motion);
$(document).on("click", ".anime", display);


