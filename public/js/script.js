$(document).ready(function() {
    $('select').material_select();

    $('#search-components').on('click', function() {
        $('.results-wrapper').show();
    });
});