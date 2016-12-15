$(document).ready(function(){
  
  function getArticles() {
    console.log($("#input").val());
    var searchword = $("#input").val();
    console.log(searchword.length);
    if (searchword.length === 0) {
      window.location.href = "https://en.wikipedia.org/wiki/Main_page";
    }

    $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      jsonp: "callback",
      dataType: 'jsonp',
      data: {
        action: "query",
        list: "search",
        srsearch: searchword,
        srinfo: "suggestion",
        srlimit: "10",
        format: "json"
      },
      xhrFields: {
        withCredentials: true
      },
      success: function(json) {
        console.log(json.query.search[0].title);
        $(".article").empty();

        for (var i = 0; i < 10; i++) {
          var link = "https://en.wikipedia.org/wiki/" + json.query.search[i].title;
          console.log(link);
          $(".article").append("<a href=\"" + link + "\"><div id=\"text\" class=\"well\">" + "<b>" + json.query.search[i].title + "</b>" + "<p>" + json.query.search[i].snippet + "...</p>" + "</div>");
        }
      },
      error: function() {
        $(".article").html("An error has occured.");
      }
    });
  }

  $(".btn1").on("click", function() {
    getArticles();
  });

  $('#input').on('keypress', function(e) {
    if (e.which === 13) {
      getArticles();
    }
  });
})