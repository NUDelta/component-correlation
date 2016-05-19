var ref = new Firebase("https://comparing-layouts.firebaseio.com/");
var examplesRef = ref.child('examples');
var site1, site2;

$(document).ready(function() {
  examplesRef.once("value", function(snapshot) {
    var examples = snapshot.val();
    loadExamples(examples);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  function loadExamples(ex) {
    var ex1 = ex[pickRandomProperty(ex)];
    var ex2 = ex[pickRandomProperty(ex)];
    console.log(ex1);

    // make sure we don't compare the same examples
    while (ex1 == ex2) {
      var ex1 = ex[pickRandomProperty(ex)];
      var ex2 = ex[pickRandomProperty(ex)];
    }

    var el1 = '<div class="col s6"><h4>' + ex1.name + '</h4><img src="' + ex1.image + '" /><textarea class="example" id="' + ex1.name + '" val="' + ex1.code + '"></textarea></div>';
    var el2 = '<div class="col s6"><h4>' + ex2.name + '</h4><img src="' + ex2.image + '" /><textarea class="example" id="' + ex2.name + '" val="' + ex2.code + '"></textarea></div>';
    $('#examples').prepend('<div class="row">' + el1 + '</div>');
    $('#examples .row').first().prepend(el2);

    // dynamically load codemirror
    var examples = $('.example');
    for (var i=0; i < examples.length; i++) {
      var example_name = $(examples[i]).attr('id').toLowerCase();
      example_name = CodeMirror.fromTextArea(examples[i], {
        lineWrapping: true,
        lineNumbers: true,
        indentWithTabs: true,
        readOnly: true,
        mode: "htmlmixed"
      });
    }
    
    loadTags(ex2.name, ex2.tags);
    loadTags(ex1.name, ex1.tags);
  }
});

// load tags that a user just added for both websites
function loadTags(website, tags) {
  var tag_names = "";

  for (var tag in tags) {
    var website_tag = '<div class="chip-wrapper"><div class="chip">' + tag + '<span class="tag-count">' + tags[tag].count + '</span></div></div>';
    var comments = tags[tag].comments;
    var tag_comments = "";
    for (var c in comments) {
      console.log(comments[c]);
      tag_comments += '<div class="comment"><p>"' + comments[c].comment + '" - ' + comments[c].name + '</p></div>';
    }
    tag_names += '<div class="row tag-wrapper">' + website_tag + tag_comments + '</div>';
  }
  $('#annotations .row').append('<div class="col s6">' + tag_names + '</div>');
}

function loadHighlightHandlers() {
  $('.chip').click(function(e) {
    e.stopImmediatePropagation();
    var node = this;

    var site_name = $(node).prev().text();
    var site = '#' + site_name;
    var tag = $(node).text();
    var editor = $(site).next('.CodeMirror')[0].CodeMirror;

    var selection_from = editor.getCursor(true).line;
    var selection_to = editor.getCursor(false).line + 1;

    var highlightObj = {
      start: selection_from,
      end: selection_to
    };

    saveHighlights(site_name, tag, highlightObj);

    editor.markText({line: selection_from, ch: 0}, {line: selection_to, ch: 0}, {className: 'highlight'});

    var result = '<div class="lines-selected">Lines ' + (selection_from+1) + ' to ' + selection_to + '</div>';
    $(node).after(result);
  });
}

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}