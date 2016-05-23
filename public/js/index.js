var ref = new Firebase("https://comparing-layouts.firebaseio.com/");
var examplesRef = ref.child('examples');
var site1, site2;

$(document).ready(function() {
  var examples;

  examplesRef.once("value", function(snapshot) {
    examples = snapshot.val();
    loadForm(examples);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  function loadForm(sites) {
    var select = '<option value="" disabled selected>Choose your option</option>';
    for (var s in sites) {
      var option = '<option value="' + sites[s].name + '" data-icon="' + sites[s].image + '" class="circle">' + sites[s].name + '</option>';
      select += option;
    }
    select += '<label>Choose website</label>'
    $('#compare1').append(select);
    $('#compare2').append(select);
    $('select').material_select();
  }

  $('form').submit(function(event) {
    event.preventDefault();
    $('#examples').empty();
    $('#annotations .row').empty();
    var site1 = $('#compare1').val();
    var site2 = $('#compare2').val();
    if (site1 == site2) {
      alert("Cannot compare the same website");
    }

    loadExamples(site1, site2, examples);
  });

  function loadExamples(site1, site2, ex) {
    var ex1 = ex[pickProperty(site1, ex)];
    var ex2 = ex[pickProperty(site2, ex)];

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
    
    loadTags(ex2.name, ex2.tags);
    loadTags(ex1.name, ex1.tags);
  }
});

function autoFormat(editor) {
    var totalLines = editor.lineCount();
    var totalChars = editor.getTextArea().value.length;
    editor.autoFormatRange({line:0, ch:0}, {line:totalLines, ch:totalChars});
    editor.setCursor(0,0);
}

function trimChars(editor) {
  var val = editor.getValue();
  val = val.slice(0, -2);
  editor.setValue(val);
}

// load tags that a user just added for both websites
function loadTags(website, tags) {
  var site = '#' + website;
  var editor = $(site).next('.CodeMirror')[0].CodeMirror;
  var tag_names = "";
  var colors = ['red', 'pink', 'yellow', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey'];

  for (var tag in tags) {
    var ri = Math.floor(Math.random() * colors.length);
    var rs = colors.splice(ri, 1);
    var random_color = rs + ' lighten-4';

    var website_tag = '<div class="chip-wrapper"><div class="chip ' + random_color + '">' + tag + '<span class="tag-count">' + tags[tag].count + '</span></div></div>';
    
    var comments = tags[tag].comments;
    var tag_comments = "";
    for (var c in comments) {
      tag_comments += '<div class="comment"><p>"' + comments[c].comment + '" - ' + comments[c].name + '</p></div>';
    }

    var highlights = tags[tag].highlights;
    for (var h in highlights) {
      
      loadHighlight(editor, highlights[h], random_color);
    }
    tag_names += '<div class="tag-wrapper">' + website_tag + tag_comments + '</div>';
  }
  $('#annotations .row').append('<div class="col s6"><div class="card"><div class="card-content"><span class="card-header">Other users have tagged this code as:</span><div class="card-content">' + tag_names + '</div></div></div></div>');
}

function loadHighlight(editor, highlight, color) {
  editor.markText({line: highlight.start-1, ch: 0}, {line: highlight.end, ch: 0}, {className: color});
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

function pickProperty(obj, ex) {
  var result;
  var count = 0;
  for (var prop in ex) {
    if (ex[prop].name == obj) {
      result = prop;
    }
  }
  return result;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}