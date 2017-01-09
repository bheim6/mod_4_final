var $newLinkTitle, $newLinkUrl;

$(document).ready(function(){
  $newLinkTitle = $("#link-title");
  $newLinkUrl  = $("#link-url");

  $("#new-link").on('submit', createLink);
})

function createLink (event){
  event.preventDefault();

  console.log("win")

  var link = getLinkData();

  $.post("/api/v1/links", link)
   .then( renderLink )
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
              <a href="${link.url}" target="_blank">${link.url}</a>
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
            //
            // `<div class='link' data-id='${link.id}' id="link-${link.id}">
            //   Title:
            //   <p class='link-title' contenteditable=true>${ link.title }</p>
            //   Url:
            //   <div class="link_buttons">
            //   <a href="${link.url}" target="_blank">${link.url}</a>
            //   <p class="mark-as">${ markAs }</p>
            //     <button class="read-button">*</button>
            //     Read? -
            //     <span class="link_read">${ link.read }</span>
            //     <button class='delete-link'>Delete</button>
            //   </div>
            // </div>`
}

function clearLink() {
  $newLinkTitle.val("");
  $newLinkUrl.val("");
}

function displayFailure(failureData){
  console.log("FAILED attempt to create new Link: " + failureData.responseText);
  $('#links-list').prepend("FAILED attempt to create new Link: " + failureData.responseText + "<br>");
}
