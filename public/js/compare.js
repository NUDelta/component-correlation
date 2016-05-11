var ref = new Firebase("https://comparing-layouts.firebaseio.com/");
var examplesRef = ref.child('examples');

$(document).ready(function() {
  var etsynav = document.getElementById("etsy");
  var etsy = CodeMirror.fromTextArea(etsynav, { 
    lineWrapping: true,
    lineNumbers: true,
    mode: "htmlmixed"
  });

  var instanav = document.getElementById("instagram");
  var insta = CodeMirror.fromTextArea(instanav, { 
    lineWrapping: true,
    lineNumbers: true,
    mode: "htmlmixed"
  });

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
      idx++;
      if (idx % 2 == 0) {
        console.log(ex[e].name);
        $('.container').append('<div class="row"><div class="col s6"><h4>' + ex[e].name + '</h4><img src="" /></div></div>');
      } else {
        $('.row').last().append('<div class="row"><div class="col s6"><h4>' + ex[e].name + '</h4><img src="" /></div></div>');
      } 
    }
  }
});