var search = ["mr rogers", "rick and morty"];

function renderButtons() {
         
$("#buttons").html("");
          
for (var i = 0; i < search.length; i++) {
            
var a = $("<button>");
a.addClass("search");
a.attr("data-name", search[i]);
a.text(search[i]);
            
$("#buttons").append(a);          
};

$("button").on("click", function() {
  var query = $(this).attr("data-name");

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {

      console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

      var gifDiv = $("<div class='gifs'>");
      var gifImage = $("<img>");
      var p = $("<p>").html("rating: " + results[i].rating);
            
      gifImage.attr("src", results[i].images.fixed_height_still.url);
      gifImage.attr("data-state", "still");
      gifImage.attr("data-still", results[i].images.fixed_height_still.url);
      gifImage.attr("data-animate", results[i].images.fixed_height.url);
      gifDiv.attr("class", "gif")

      gifDiv.append(p);
      gifDiv.append(gifImage);

      $("#gifs-appear-here").prepend(gifDiv);
      };
      $("img").on("click", function() {
        
        var state = $(this).attr("data-state");
               
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        if (state !== "still") {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  });
};

      

      
$("#add-data").on("click", function(event) {

  event.preventDefault();
         
  var searchData = $("#data-input").val().trim();

  search.push(searchData);

  renderButtons();
});

renderButtons();