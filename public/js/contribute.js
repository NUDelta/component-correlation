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
    $('.container').prepend('<div class="row">' + el1 + '</div>');
    $('.row').first().prepend(el2);

    // dynamically load codemirror
    var examples = $('.example');
    for (var i=0; i < examples.length; i++) {
      var example_name = $(examples[i]).attr('id').toLowerCase();
      example_name = CodeMirror.fromTextArea(examples[i], {
        lineWrapping: true,
        lineNumbers: true,
        mode: "htmlmixed"
      });
    }
  }

  $('form').submit(function(event) {
      event.preventDefault();

      var e1Tags = event.currentTarget.ex1_tags.value.split(", ");
      var e2Tags = event.currentTarget.ex2_tags.value.split(", ");

      console.log(e1Tags);
      var examples = [];
      for (var i=0; i < $('.example').length; i++) {
        var name = $($('.example')[i]).attr('id');
        console.log(name);

        examplesRef.orderByChild("name").equalTo(name).on("child_added", function(snapshot) {
          var ex = snapshot.val();
          var tagsRef = examplesRef.child(snapshot.key());
          console.log(tagsRef);
          
          if (i == 0) {
            tagsRef.update({
              tags: event.currentTarget.ex1_tags.value
            });
          } else {
            tagsRef.update({
              tags: event.currentTarget.ex2_tags.value
            });
          }
          // if (i == 0) {
          //   tagsRef.update({
          //     tags: e1Tags
          //   });
          // } else {
          //   tagsRef.update({
          //     tags: e2Tags
          //   });
          // }
          // for (var j=0; j < e1Tags.length; j++) {
          //   var tag = e1Tags[j];
          //   tagsRef.child('tags').update({
          //     tag: 1
          //   });
          // }
        });
      }
  });
});

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}