var ref = new Firebase("https://comparing-layouts.firebaseio.com/");
var examplesRef = ref.child('examples');

$(document).ready(function() {
  examplesRef.on("value", function(snapshot) {
    var examples = snapshot.val();
    loadComparisons(examples);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  function loadComparisons(ex) {
    console.log(ex);
    var idx = 1;
    for (var e in ex) {
      var el = '<div class="col s6"><h4>' + ex[e].name + '</h4><img src="' + ex[e].image + '" /><textarea class="example" id="' + ex[e].name + '" val="' + ex[e].code + '"></textarea></div>';
      idx++;
      if (idx % 2 == 0) {
        $('.container').append('<div class="row">' + el + '</div>');
      } else {
        $('.row').last().append(el);
      }
    }

    // dynamically load codemirror
    var examples = $('.example');
    console.log(examples);
    for (var i=0; i < examples.length; i++) {
      var example_name = $(examples[i]).attr('id').toLowerCase();
      example_name = CodeMirror.fromTextArea(examples[i], {
        lineWrapping: true,
        lineNumbers: true,
        mode: "htmlmixed"
      });
    }
  }
});