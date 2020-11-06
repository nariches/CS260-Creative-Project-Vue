document.getElementById("foodSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  console.log("submitted");

  const url = "https://foodish-api.herokuapp.com/api/images/pizza";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "<img class='food-image' src='" + json.image + "'/>";
      console.log(json.image);

      document.getElementById("foodResult").innerHTML = results;
    });
});
