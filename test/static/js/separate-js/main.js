var docWidth, docHeight, docScroll;

function resize() {
    docWidth = $(window).width();
    docHeight = $(window).height();
    docScroll = $(window).scrollTop();
}

$(document).ready(function () {
    resize();
});
$(document).on('click', '.popup', function () {
    $('.popup_window').fadeOut(100).find('.popup_content').removeClass('active');
    ;
    var popup = $(this).data('popup');
    $('#' + popup).stop().fadeIn(100).find('.popup_content').addClass('active');
    ;
});
$(document).on('click', '.popup_close,.popup_mask', function () {
    $('.popup_window').fadeOut(100);
    $('.popup_content').removeClass('active');
});

$(document).on('click', '.cart', function () {
    $('.header-cart').addClass('active');
});
$(document).on('click', '.header-cart_close,.header-cart_mask', function () {
    $('.header-cart').removeClass('active');
});
$(document).on('click', '.menu', function () {
    $('.header-menu').addClass('active');
});
$(document).on('click', '.header-menu_close,.header-menu_mask', function () {
    $('.header-menu').removeClass('active');
});

$(document).on('click', '.menu_plus', function () {
    $('.menu_plus').removeClass('active')
    $('.sub-menu_ul').slideUp();
    $(this).addClass('active').next().stop().slideDown()
});