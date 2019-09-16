$(document).on("click", "#scrape", function() {
  $.get("/scraper", function(data) {
    console.log("scrape");
  }).then(function() {
    console.log(window.location);
    location.assign("/");
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

$(document).on("click", "#delete-saved", function(event) {
  const articleId = $(this).attr("data-id");
  $.ajax({
    url: "/articles/saved/" + articleId,
    method: "PUT"
  }).then(function() {
    location.reload(true);
    console.log("Article Deleted");
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

$(document).on("click", "#notes", function(event) {
  event.preventDefault();
  console.log("note");
  console.log(this);
  $(".note-card").remove();
  const articleId = $(this).attr("data-id");
  $.ajax({
    url: "/articles/" + articleId,
    method: "GET"
  }).then(function(data) {
    console.log(data);
    $(`#${articleId}`).append(`
      <div class="card note-card text-white bg-secondary">
      <div class="card-header bg-dark">
        <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
        Article Notes
        <button id="close" class="btn btn-link"> <i class="fa fa-times" aria-hidden="true"></button></i>
      </div>
      <div class="card-body">
        <div class="empty-note"></div>
        <div class="note-display"></div>
        <hr />
        <form>
          <textarea id="note-text" placeholder="New Note"></textarea>
          <button id="save-note" type="submit" data-id="${articleId}" class="btn btn-info btn-sm">Save Note</button>
        </form>
      </div>
    </div>
  `);
    if (data.note) {
      $(".note-display").append(`<p>${data.note.body}</p>`);
    } else {
      $(".empty-note").append("<p>No notes for this article yet.</p>");
    }
  });
});

$(document).on("click", "#save-note", function(event) {
  event.preventDefault();
  const articleId = $(this).attr("data-id");
  const noteText = $("#note-text").val();
  $.ajax({
    url: "/articles/" + articleId,
    method: "POST",
    data: {
      body: noteText
    }
  }).then(function(data) {
    console.log("Note Saved");
    location.reload(true);
    $(".empty-note").empty();
    $("#note-text").val("");
    $(".note-display").append(`<p>${noteText}</p>`);
  });
});

$(document).on("click", "#close", function(event) {
  $(".note-card").remove();
});
