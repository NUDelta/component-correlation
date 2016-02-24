function cleanHTML(node) {
  // http://stackoverflow.com/questions/8968767/remove-multiple-html5-data-attributes-with-jquery
  var data = $(node).data(),
      i;

  var attributes = $.map(node.attributes, function(el) { return el });

  // Fetch all the key-names
  var keys = $.map(data, function(value, key) { return key; });

  // camel case hack - apparently map function automatically makes attributes camel case
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

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

Array.prototype.intersection = function(a) {
  return this.filter(function(i) { return a.indexOf(i) != -1});
}

$(document).ready(function() {
  // var nav_bar = $('.page-nav').find('*');
  var nav_bar = $('.spotify-header').find('*');
  var tags = [];

  for (var i = 0; i < nav_bar.length; i++) {
    cleanHTML(nav_bar[i]);

    // get all tags used in element
    var tag = $(nav_bar[i]).prop('tagName').toLowerCase();
    if (jQuery.inArray(tag, tags) == -1) {
      tags.push(tag);
    }
  }
  console.log($('.spotify-header').html());
  // console.log($('.page-nav').html());

  // determine common tags
  var buzzfeed_tags = ["div", "nav", "ul", "li", "a", "span", "svg", "use", "iframe", "form", "input", "button", "img"];
  var spotify_tags = ["header", "div", "button", "span", "a", "ul", "li", "img", "nav", "svg", "use"];

  var common_tags = buzzfeed_tags.intersection(spotify_tags);
  var buzzfeed_only = buzzfeed_tags.diff(spotify_tags);
  var spotify_only = spotify_tags.diff(buzzfeed_tags);

  console.log("common tags", common_tags);
  console.log("tags only used by buzzfeed", buzzfeed_only);
  console.log("tags only used by spotify", spotify_only);
});