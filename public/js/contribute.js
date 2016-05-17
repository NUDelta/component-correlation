var ref = new Firebase("https://comparing-layouts.firebaseio.com/");
var examplesRef = ref.child('examples');

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

    var el1 = '<div class="col s6"><h4>' + ex1.name + '</h4><img src="' + ex1.image + '" /><textarea class="example" id="' + ex1.name + '" val="' + ex1.code + '"></textarea></div>';
    var el2 = '<div class="col s6"><h4>' + ex2.name + '</h4><img src="' + ex2.image + '" /><textarea class="example" id="' + ex2.name + '" val="' + ex2.code + '"></textarea></div>';
    $('#examples').prepend('<div class="row">' + el1 + '</div>');
    $('#examples .row').first().prepend(el2);

    var editors = [];
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

      editors.push(example_name);
    }

    var editor1 = editors[0];
    editor1.on("cursorActivity", function() {
      var selection = editor1.getCursor(true);
      console.log(selection);
    });

    var editor2 = editors[1];
    editor2.on("cursorActivity", function() {
      var selection = editor2.getCursor(true);
      console.log(selection);
    });
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

      // console.log(examples);
      // console.log(e1Tags);
      saveTags(examples[0], e1Tags);
      saveTags(examples[1], e2Tags);
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
      countRef = tagsRef.child(tags[i])
      countRef.transaction(function(currentData) {
        // console.log("current data", currentData);
        if (currentData === null) {
          var newTag = {};
          newTag[tags[i]] = 1;
          tagsRef.update(newTag);
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
    var tagRef = examplesRef.child(snapshot.key()).child("tags").child(tag);
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

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}