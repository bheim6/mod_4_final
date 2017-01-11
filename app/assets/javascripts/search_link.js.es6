function attachSearchEvent() {
  $(".link-search-field").on('keyup', searchLinks)
}

function searchLinks() {
  $(".link").filter(function() {
    var search = $(".link-search-field").val();
    if(search === "") {

    } else {
      if($(this).children("p").text().includes(search)){

      } else {
        $(this).hide();
      }
    }
  })
}
