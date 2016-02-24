function cleanHTML(node) {
  // http://stackoverflow.com/questions/8968767/remove-multiple-html5-data-attributes-with-jquery
  var data = $(node).data(),
      i;

  var attributes = $.map(node.attributes, function(el) { return el });

  // Fetch all the key-names
  var keys = $.map(data, function(value, key) { return key; });
  var rmultiDash = /([a-z])([A-Z])/g;

  // Loop through the keys, remove the attribute if the key contains "data-".
  for(i = 0; i < keys.length; i++) {
    node = $(node).removeAttr("data-" + keys[i].replace( rmultiDash, "$1-$2" ).toLowerCase());
  }

  // remove hrefs
  var attr = $(node).attr('href');
  if (typeof attr !== typeof undefined && attr !== false) {
    node = $(node).attr("href", "");
  }

  // remove classes and ids
  node = $(node).removeClass().removeAttr("id").removeAttr("href");

  return node;
}

$(document).ready(function() {
  var nav_bar = $('.page-nav').find('*');
  var test;
  // var nav_bar = $('.spotify-header').find('*');
  for (var i = 0; i < nav_bar.length; i++) {
    test = cleanHTML(nav_bar[i]);
  }
  // console.log($('.spotify-header').html());
  console.log($('.page-nav').html())
});