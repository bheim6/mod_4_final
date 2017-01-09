function attachEditEvent() {
  $(".link-title").on("click", editLink)
  $(".link-url").on("click", editLink)
  $(".link-title").blur(confirmEditLink)
  $(".link-url").blur(confirmEditLink)
}

function editLink() {
  console.log("edit")
  $(this).attr('contenteditable','true');
}

function confirmEditLink() {
  console.log("confirm edit")
  var id = $(this).parent().data('id');

  var newValue = this.innerText;

  if(this.className == 'link-title') {
    var newData = {title: newValue};
  } else if (this.className == 'link-url') {
    var newData = {url: newValue};
  }

  $(this).attr('contenteditable','false');

  $.ajax({
    url: `/api/v1/links/${id}`,
    method: 'put',
    dataType: 'json',
    data: newData
  })
}
