
function getArticles(){
    $.getJSON("/articles", function(data){
        console.log(data)
        console.log(data.length)
        $("#news").empty();
        if(data.length != 0){
            console.log("I have articles");
            data.forEach(element =>{
                $("#news").append(
                    `<div class="card">
                        <div class="card-header">
                            <h3>${element.title}</h3>
                            <div class="buttons">
                                    <button type="button" class="btn btn-danger">Clear Articles!</button>
                                    <button type="button" class="btn btn-danger">Clear Articles!</button>
                            </div>
                        </div>
                        <div class="card-body">
                        <p class="card-text">${element.body}</p>
                        </div>
                    </div>
                    `
                )
            })
        } else{
            console.log("empty array")
            $("#news").append("<p>I don't have articles</p>")
        }
    });
}

getArticles();

$(document).on("click", "#scrape", function(){
    $.get("/scraper", function(data){
        console.log("scrape")
    }).then(function(){
        getArticles();
    })
})

$(document).on("click", "#deleteAll", function(){
    $.get("/deleteAll", function(data){
        console.log("delete")
    }).then(function(){
        getArticles();
    })
})