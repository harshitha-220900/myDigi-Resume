$(document).ready(function() {

    // Tooltip activation
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Form submit
    $("#form").submit(function(e) {
        e.preventDefault();
        alert("Form Submitted!");
    });

});