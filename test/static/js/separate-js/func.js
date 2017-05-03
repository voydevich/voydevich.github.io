var dataJson;
$(document).on('submit', "form.ajax", function (e) {
    e.preventDefault();
    var error = false;
    $(this).find('.form-group').each(function () {
        if ($(this).hasClass('required')) {
            var input = $(this).find("input");
            if (input.val() == '') {
                input.parent().addClass('has-error');
                error = true;
            }
            else {
                input.parent().removeClass('has-error');
            }
        }
        if ($(this).find("input.mail").length) {
            var email = $(this).find("input.mail");

            if (!validateEmail(email.val())) {

                email.parent().addClass('has-error');
                error = true;
            }
            else {
                email.parent().removeClass('has-error');
            }
        }
        if ($(this).find("input.password").length) {
            var password = $(this).find("input.password");

            if (password.val().length < 4) {
                password.parent().addClass('has-error');
                error = true;
            }
            else {
                password.parent().removeClass('has-error');
            }
        }
    });
    if (error == true) {
        return false;
    }
    var _this = this;
    var _data = $(this).serialize();
    var _action = $(this).attr('action');
    var _method = $(this).data('method');
    $.ajax({
        url: _action,
        data: _data,
        type: "POST",
        success: function (data) {
            dataJson = data;
            console.log(_method);
            $(_this).find('.error_message,.success_message').hide();
            if (_method == 'login') {
                if (data.logged) {
                    location.reload();
                }
                else {
                    $(_this).find('.error_message').show();
                }
            }

            else if (_method == 'forgotten') {
                if (data.email) {
                    $(_this).find('.success_message').show();
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                }
                else {
                    $(_this).find('.error_message').show();
                }
            }
            else if (_method == 'register') {
                if (data.register) {
                    location.reload();
                }
                else {
                    $(_this).find('.error_message').show();
                }
            }

            else {
                console.log('error');
            }
        }
    })
});


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[­[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$(document).on('click', '.logout', function (e) {
    e.preventDefault();
    var _action = $(this).attr('href');
    $.ajax({
        url: _action,
        success: function (data) {
            location.reload();
        }
    })

});





