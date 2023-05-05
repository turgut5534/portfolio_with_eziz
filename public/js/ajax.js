$.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    }
});


$('#email-form').on('submit', function(e) {

    e.preventDefault()

    const button = $('.email-button')

    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        beforeSend: function() {
            button.html('Sending...')
        },
        success: function(response) {
            iziToast.success({
                title: 'OK',
                message: 'Your message is sent successfully!',
            });
            button.html('Send')
            $('#email-form')[0].reset();
        },
        error: function(e) {
            iziToast.error({
                title: 'Error',
                message: 'An error occurred sending the message',
            });
            button.html('Send')
        }
    })
    
})


$('#login-form').on('submit', function(e) {

    e.preventDefault()

    const button = $('.login-button')

    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        beforeSend: function() {
            button.html('Please wait...')
        },
        success: function(response) {
            window.location.href = '/admin/profile'
        },
        error: function(e) {
            iziToast.error({
                title: 'Error',
                message: 'Incorrect username or password',
            });
            button.html('Send')
        }
    })
    
})


$('#user-save-form').on('submit', function(e) {

    e.preventDefault()

    const button = $('.user-save-button')

    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        beforeSend: function() {
            button.html('Saving...')
        },
        success: function(data) {
            
            iziToast.success({
                title: 'OK',
                message: data.message,
            });
            button.html('Send')
            
            setTimeout(() => {
                location.href = '/login'
            }, 1500);

        },
        error: function(e) {

            var response = JSON.parse(e.responseText);
            
            iziToast.error({
                title: 'Error',
                message: response.message,
            });
            button.html('Save')
        }
    })
    
})