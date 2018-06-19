$(document).ready(function () {

  $(document).ready(function () {
    renderEmpty();
    renderMain();
  })
  function renderMain() {
    $("#main").append(`
  <header>
      <div class="bg" style="background-image: url(https://mdbootstrap.com/img/Photos/Others/img%20%2844%29.jpg); background-position: center center;">
          <div>
              <div class="container flex-center text-center">
                  <div class="col-md-12 mb-3">
                      <h1 class="display-3 mb-2 wow fadeInDown" data-wow-delay="0.3s" style="
                      padding-top: 200px">MONGO
                          <a class="indigo-text font-weight-bold">SCRAPER</a>
                      </h1>
                      <h5 class="text-uppercase mb-3 mt-1 font-weight-bold wow fadeIn" data-wow-delay="0.4s">You click... We scrape...</h5>
                  </div>
              </div>
          </div>
      </div>
  </header>
  `);
  };
  function renderEmpty() {
    $("#main").empty();
    $("#articles").empty();
    $("#notes").empty();
  };
  function renderArticles(data) {
    for (var i = 0; i < data.length; i++) {
      $("#articles").append(`
  <div class="card">
    <h5 data-id=${data[i]._id} class="card-header">${data[i].title}</h5>
      <div class="card-body">
        <a href="${data[i].link}" class="btn btn-primary" target="_blank">Link</a>
        <!-- <a class="btn btn-warning" id="favorites" data-id="${data[i]._id}">Favorite</a> -->
        <a class="btn btn-danger" data-toggle="modal" data-target="#modalNotes${data[i]._id}">Notes</a>
      </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="modalNotes${data[i]._id}" tabindex="-1" role="dialog" aria-labelledby="modalNotesTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="modalNotesTitle${data[i]._id}">${data[i].title}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>

              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="Title">Title</label>
                    <input class="form-control" id='titleinput' name='title' placeholder="Type a Title for this note">
                  </div>
                  <div class="form-group">
                    <label for="body">Body</label>
                    <textarea class="form-control" id="bodyinput" name='body' placeholder="Type some notes you would like to save" rows="3"></textarea>
                  </div>
                </form>
              </div>

              <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-id=${data[i]._id} id='savenote'>Save</button>
              </div>

          </div>
      </div>
  </div>
  `);
    }
  };

  $(document).on("click", "#savenote", function () {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          title: $("#titleinput").val(),
          body: $("#bodyinput").val()
        }
      })
      .then(function (data) {
        console.log(data);
      });
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  $("#scraper").on("click", function () {
    console.log("scraped")
    $.ajax({
      method: "GET",
      url: "/scrape/"
    })
  });

  $(".favorite").on("click", function () {
    console.log('click')
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "PUT",
      url: "/favorite/" + thisId,
      data: {
        favorite: true,
      }
    })
  });

  $('#showarticles').on('click', function () {
    renderEmpty();
    $.getJSON("/articles", function (data) {
      console.log(data);
      $("#articles").append(`
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center mb-3">
                <h1 class="font-weight-bold light-blue-text my-3">ARTICLES</h1>
                </div>
            </div>
        </div>
    `)
      renderArticles(data);
    });
  });
  $("#showHome").on("click", function () {
    renderEmpty()
    renderMain();
  });

});