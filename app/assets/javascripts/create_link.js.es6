var $newLinkTitle, $newLinkUrl;

$(document).ready(function(){
  $newLinkTitle = $("#link-title");
  $newLinkUrl  = $("#link-url");

  addLinks();

  $("#new-link").on('submit', createLink);
})

function addLinks() {
  $.getJSON("/api/v1/links")
  .then(function(allLinks){
    allLinks.forEach(renderLink);
  })
  .then(attachEditEvent)
  .then( attachReadEvents )
  .then( attachSearchEvent )
  .fail( displayFailure )
}


function createLink (event){
  event.preventDefault();

  var link = getLinkData();

  $.post("/api/v1/links", link)
   .then( renderLink )
   .then( attachEditEvent )
   .then( attachReadEvents )
   .then( attachSearchEvent )
   .fail( displayFailure )
 }

function getLinkData() {
 return {
   title: $newLinkTitle.val(),
   url: $newLinkUrl.val()
 }
}

function renderLink(link){
  $("#links-list").prepend( linkHTML(link) )
  clearLink();
  attachHotEvents(link);
}

function linkHTML(link) {

  var markAs;
  var read = link.read;
  if (read === true) {
    markAs = "Mark as Unread"
  } else {
    markAs = "Mark as Read"
  };

    return `<div class='link' data-id='${link.id}' id="link-${link.id}">
              <p id='hot'></p>
              <p id='top'></p>
              Title:
              <p class='link-title'>${ link.title }</p>
              Url:
              <p class='link-url'>${ link.url }</p>
              <p>Read?</p>
              <p class="link_read">${ link.read }</p>
              <p class="link_buttons">
                <button class="mark-read">${ markAs }</button>
                <button class='edit-link'>Edit</button>
                <button class='delete-link'>Delete</button>
              </p>
              *To edit link, double click on either title or url, changes are confirmed when clicking outside the text*
            </div>`
}

function clearLink() {
  $newLinkTitle.val("");
  $newLinkUrl.val("");
}

function displayFailure(failureData){
  console.log("FAILED attempt to create new Link: " + failureData.responseText);
  $('#links-list').prepend("FAILED attempt to create new Link: " + failureData.responseText + "<br>");
}

function attachReadEvents(link) {
  $(".mark-read").on("click", readChange)
}

function readChange(link) {
  console.log("changin");
  var id = $(this).closest(".link").data('id');
  var parent = $(this).closest(".link");
  var title = $(parent).find('.link-title').text();
  var url = $(parent).find('.link-url').text();

  var read = $(parent).find('.link_read').text();
  if (read === "false") {read = "true"}
  else if (read === "true") {read = "false"}

  var markAs = $(this).text();
  if (markAs === "Mark as Read") {markAs = "Mark as Unread"}
  else if (markAs === "Mark as Unread") {markAs = "Mark as Read"}

  $(parent).find('.link_read').text(read);
  $(this).text(markAs);

  if (read === "true") {
    $(parent).find('.link-url').css("text-decoration","line-through");
  } else {
    $(parent).find('.link-url').css("text-decoration","none");
  }

  updateRead(read, id, title, url);
}

function updateRead(read, id, title, url) {
  $.ajax({
    url: `/api/v1/links/${id}`,
    method: 'put',
    data: {read: read}
  })

  if (read === "true") {
    $.post({
      url: 'http://localhost:3001/add_read',
      data: {
        title: title,
        url: url
      },
      dataType: 'jsonp'
    })
  }

  if (read === "true") {
    $.post({
      url: 'https://bheim6-hot-reads-final.herokuapp.com/add_read',
      data: {
        title: title,
        url: url
      },
      dataType: 'jsonp'
    })
  }
}

function attachHotEvents(link) {
  $.get("http://localhost:3001/api/v1/links")
  .then(function(links) {
    links.forEach( function(element) {
      if (element.title === link.title && links[0].title === link.title) {
        makeTop(link);
      } else if (element.title === link.title) {
        makeHot(link);
      }
    })
  })
}

function makeTop(link) {
  $(`#link-${link.id} #top`).text('THE TOP LINK!')
}

function makeHot(link) {
  $(`#link-${link.id} #hot`).text('HOT LINK!')
}
