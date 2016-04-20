$(document).ready(function() {
    $('#search-components').on('click', function() {
        $('.results-wrapper').show();
    });

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
});