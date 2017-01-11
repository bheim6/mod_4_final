function attachSearchEvent() {
  $(".link-search-field").on('keyup', searchLinks)
  $("#filter-read").on('click', filterRead)
  $("#filter-unread").on('click', filterUnread)
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

function filterRead() {
    $('.link').each(function(index, link) {
      if (link.innerText.includes('true')) {
        $(link).show()
      } else {
        $(link).hide()
      }
    })
  }

  function filterUnread() {
      $('.link').each(function(index, link) {
        if (link.innerText.includes('false')) {
          $(link).show()
        } else {
          $(link).hide()
        }
      })
    }
