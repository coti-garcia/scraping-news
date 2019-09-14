$(document).on("click", "#scrape", function() {
  $.get("/scraper", function(data) {
    console.log("scrape");
  }).then(function() {
    location.reload(true);
    // getArticles();
  });
});

$(document).on("click", "#deleteAll", function() {
  $.ajax({
    url: "/articles",
    method: "DELETE"
  }).then(function() {
    location.reload(true);
    console.log("Deleted");
  });
});

$(document).on("click", "#save", function(event) {
  event.preventDefault();
  const articleId = $(this).attr("data-id");
  $.ajax({
    url: "/articles/" + articleId,
    method: "PUT"
  }).then(function() {
    console.log("Saved");
    location.reload(true);
  });
});
