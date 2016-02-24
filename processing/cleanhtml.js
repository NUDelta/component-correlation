function cleanHTML(node) {
  // http://stackoverflow.com/questions/8968767/remove-multiple-html5-data-attributes-with-jquery
  var data = $(node[0]).data(),
      i;
  // console.log(node[0].attributes);

  var attributes = $.map(node[0].attributes, function(el) { return el });

  // Fetch all the key-names
  var keys = $.map(data , function(value, key) { return key; });

  // Loop through the keys, remove the attribute if the key contains "data-".
  for(i = 0; i < keys.length; i++) {
    node = $(node).removeAttr("data-" + keys[i]);

    // remove hrefs
    var attr = $(node).attr('href');
    if (typeof attr !== typeof undefined && attr !== false) {
      node = $(node).attr("href", "");
    }

    // remove classes and ids
    node = $(node).removeClass().removeAttr("id").removeAttr("href");
  }

  return node;
}

$(document).ready(function() {
  var nav_bar = $('.page-nav').find('*');
  var test = cleanHTML(nav_bar);
  console.log(test.html());
});