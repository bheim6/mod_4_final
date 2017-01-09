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
  // .then(attachDeleteEvent)
  // .then(attachQualityEvents)
  // .then(attachSearchEvent)
  // .fail(displayFailure)
}


function createLink (event){
  event.preventDefault();

  console.log("win")

  var link = getLinkData();

  $.post("/api/v1/links", link)
   .then( renderLink )
   .then( attachEditEvent )
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
}

function linkHTML(link) {

    return `<div class='link' data-id='${link.id}' id="link-${link.id}">
              Title:
              <p class='link-title'>${ link.title }</p>
              Url:
              <p class='link-url'>${ link.url }</p>
              <p>Read?</p>
              <p class="link_read">
                ${ link.read }
              </p>
              <p class="link_buttons">
                <button class="mark-read">Mark as Read</button>
                <button class='edit-link'>Edit</button>
                <button class='delete-link'>Delete</button>
              </p>
            </div>`
            // <a href="${link.url}" class='link-url' target="_blank">${link.url}</a>
}

function clearLink() {
  $newLinkTitle.val("");
  $newLinkUrl.val("");
}

function displayFailure(failureData){
  console.log("FAILED attempt to create new Link: " + failureData.responseText);
  $('#links-list').prepend("FAILED attempt to create new Link: " + failureData.responseText + "<br>");
}
