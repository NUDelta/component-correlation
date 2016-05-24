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

    // make sure we don't compare the same examples
    while (ex1 == ex2) {
      var ex1 = ex[pickRandomProperty(ex)];
      var ex2 = ex[pickRandomProperty(ex)];
    }

    var el1 = '<div class="col s6" id="site1"><h4>' + ex1.name + '</h4><img src="' + ex1.image + '" /><textarea class="example" id="' + ex1.name + '"></textarea></div>';
    var el2 = '<div class="col s6" id="site2"><h4>' + ex2.name + '</h4><img src="' + ex2.image + '" /><textarea class="example" id="' + ex2.name + '"></textarea></div>';
    
    $('#examples').prepend('<div class="row">' + el1 + '</div>');
    $('#examples .row').first().prepend(el2);
    $('#site1 textarea').val(ex1.code);
    $('#site2 textarea').val(ex2.code);

    // dynamically load codemirror
    var examples = $('.example');
    for (var i=0; i < examples.length; i++) {
      var example_name = $(examples[i]).attr('id').toLowerCase();
      example_name = CodeMirror.fromTextArea(examples[i], {
        mode: 'xml',
        htmlMode: true,
        lineWrapping: true,
        lineNumbers: true,
        readOnly: true,
        smartIndent: true
      });

      // trimChars(example_name);
      autoFormat(example_name);
    }
  }

  function autoFormat(editor) {
    var totalLines = editor.lineCount();
    var totalChars = editor.getTextArea().value.length;
    editor.autoFormatRange({line:0, ch:0}, {line:totalLines, ch:totalChars});
    editor.setCursor(0,0);
  }

  $('#tags').submit(function(event) {
      event.preventDefault();

      var e1Tags = event.currentTarget.ex1_tags.value.split(", ");
      var e2Tags = event.currentTarget.ex2_tags.value.split(", ");

      var examples = [];
      for (var i=0; i < $('.example').length; i++) {
        var name = $($('.example')[i]).attr('id');
        examples.push(name);
      }

      saveTags(examples[0], e1Tags);
      saveTags(examples[1], e2Tags);
      site1 = {
        name: examples[0],
        tags: e1Tags
      };
      site2 = {
        name: examples[1],
        tags: e2Tags
      };
  });

  $('#explanations').submit(function(event) {
    event.preventDefault();

    // get submitter name, set to "Anonymous" if there it's empty
    var submitter = event.currentTarget.commenter_name.value;
    if (submitter == "") {
      submitter = "Anonymous";
    }

    var comments = $('#explanations .comment-wrapper');

    // get sites, tags, and justifications
    for (var j=0; j < comments.length; j++) {
      var site = $(comments[j]).find('.site').text();
      var tag = $(comments[j]).find('.chip').text();
      var comment_tag = '#tag-' + tag;
      var comment = $(comments[j]).find(comment_tag).val();

      saveComments(site, tag, comment, submitter);
    }

    $('#freeform').hide();

    loadTagsForHighlighting(site1.name, site1.tags);
    loadTagsForHighlighting(site2.name, site2.tags);
  });
});

// save tags for a specific website
function saveTags(website, tags) {
  examplesRef.orderByChild("name").equalTo(website).on("child_added", function(snapshot) {
    var ex = snapshot.val();
    var tagsRef = examplesRef.child(snapshot.key()).child("tags");
    // console.log(tagsRef);

    for (var i=0; i < tags.length; i++) {
      // console.log(tags[i]);
      countRef = tagsRef.child(tags[i]).child("count");
      countRef.transaction(function(currentData) {
        // console.log("current data", currentData);
        if (currentData === null) {
          // var newTag = {};
          // newTag[tags[i]] = { count: 1 };
          tagsRef.child(tags[i]).child("count").set(1);
        } else {
          return currentData+1;
          console.log('Tag already exists');
          return; // Abort the transaction.
        }
      }, function(error, committed, snapshot) {
        if (error) {
          console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          console.log('We aborted the transaction (because data already exists).');
        } else {
          console.log('Tag added!');
        }
        // console.log("The data: ", snapshot.val());
      });
    }

    $('#tags-wrapper').hide();
    loadTags(website, tags);
  });
}

// save comments for a specific tag for a specific website
function saveComments(website, tag, comment_text, username) {
  var commentObj = {
      name: username,
      comment: comment_text
  };
  
  examplesRef.orderByChild("name").equalTo(website).on("child_added", function(snapshot) {
    var tagRef = examplesRef.child(snapshot.key()).child("tags").child(tag).child("comments");
    tagRef.push(commentObj);
  });
}

// load tags that a user just added for both websites
function loadTags(website, tags) {
  for (var i=0; i < tags.length; i++) {
    var form_tag = '<div class="chip-wrapper"><p class="site">' + website + '</p><div class="chip">' + tags[i] + '</div></div>';
    var form_field ='<div class="input-field col s12"><input id="tag-' + tags[i] + '" type="text" name="tag-' + tags[i] + '"><label for="tag-' + tags[i] + '">Write one sentence explaining why you chose this tag.</label></div>';
    $('#freeform-submit').before('<div class="row comment-wrapper">' + form_tag + form_field + '</div>');
  }

  $('#freeform').show();
}

function loadTagsForHighlighting(website, tags) {
  var colors = ['red', 'pink', 'yellow', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey'];

  for (var i=0; i < tags.length; i++) {
    var ri = Math.floor(Math.random() * colors.length);
    var rs = colors.splice(ri, 1);
    var random_color = rs + ' lighten-4';

    var form_tag = '<div class="chip-wrapper"><p class="site">' + website + '</p><div class="chip ' + random_color + '" id="highlight-' + tags[i] + '">' + tags[i] + '</div></div>';
    $('#highlighting h4').append('<div class="row highlighter-wrapper">' + form_tag + '</div>');
  }

  $('#highlighting').show();
  loadHighlightHandlers();
}

function loadHighlightHandlers() {
  

  $('.chip').click(function(e) {
    e.stopImmediatePropagation();
    var node = this;

    var site_name = $(node).prev().text();
    var site = '#' + site_name;
    var tag = $(node).text();
    var editor = $(site).next('.CodeMirror')[0].CodeMirror;

    var classes = $(node).attr('class').split(' ');
    var color = classes[1] + ' lighten-4';

    var selection_from = editor.getCursor(true).line;
    var selection_to = editor.getCursor(false).line + 1;

    var highlightObj = {
      start: selection_from,
      end: selection_to
    };

    saveHighlights(site_name, tag, highlightObj);

    editor.markText({line: selection_from, ch: 0}, {line: selection_to, ch: 0}, {className: color});

    var result = '<div class="lines-selected">Lines ' + (selection_from+1) + ' to ' + selection_to + '</div>';
    $(node).after(result);
  });
}

function saveHighlights(website, tag, obj) {
  examplesRef.orderByChild("name").equalTo(website).on("child_added", function(snapshot) {
    var highlightRef = examplesRef.child(snapshot.key()).child("tags").child(tag).child("highlights");
    highlightRef.push(obj);
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