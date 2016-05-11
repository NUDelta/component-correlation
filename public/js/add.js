var ref = new Firebase("https://comparing-layouts.firebaseio.com/");
var examplesRef = ref.child('examples');

$(document).ready(function() {    
    $('select').material_select();
    $('#example-code').trigger('autoresize');

    $('form').submit(function(event) {
        event.preventDefault();

        var componentObj = {
            type: $('#example_type').val(),
            name: event.currentTarget.example_name.value,
            url: event.currentTarget.example_url.value,
            image: event.currentTarget.example_image.value,
            code: $('#example_code').val()
        };

        console.log(componentObj);

        examplesRef.push(componentObj);
    });
});