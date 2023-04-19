$('#email-form').on('submit', function(e) {

    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: function(response) {
            iziToast.success({
                title: 'OK',
                message: 'Your message is sent successfully!',
            });
        },
        error: function(e) {
            iziToast.error({
                title: 'Error',
                message: 'An error occurred sending the message',
            });
        }
    })
    
})