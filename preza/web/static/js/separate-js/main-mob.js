
var settings = [{
    step: '',
}];
settings.step = 'videoLoad';
settings.init = false;
settings.lnt = 10; //50
settings.lnt2 = 1; //50
settings.time = -900;
settings.starttime = -900;
settings.timeAnim = false;
var width = window.innerWidth;
var height = window.innerHeight;

var audioOutSec;
var errorInterval;

var canvas = document.getElementById('loader-image');
var canvasL = document.getElementById('loaders');
var ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 320;
var ctxL = canvasL.getContext('2d');
canvasL.width = 174;
canvasL.height = 26;
var image = [];
var imageL = [];
var imageLenght = 155;
var loaderImg = false;
var picdirection = false;
var cadr = 1;
duration();

$(window).load(function () {
    loaderDell()
});

$(document).on('touchstart', function (e) {

    if (!settings.repeat32) {
        keyPress();
        settings.repeat32 = true;
    }
});

$(document).on('touchend', function (e) {
    keyUp();
    settings.repeat32 = false;
});

$(window).resize(function () {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    renderer.setSize(width, height);
    camera.updateProjectionMatrix();
});

$('.original-video').on("timeupdate", function (e) {
    settings.videoTime = originalVideo.currentTime;
    if (settings.videoTime >= 8 && settings.videoTime <= 44) {
        $('.video-text').removeClass('hide');
    }
    else {
        $('.video-text').addClass('hide');

    }
});

$('#audio-in').on("timeupdate", function (e) {
    if (settings.step == 'videoEnd') {
        if (settings.time >= -100) {  // 9


            $('#audio-in')[0].pause();
            $('#audio-out')[0].pause();
            $('#bang')[0].muted = false;
            $('#bang')[0].currentTime = 0;
            $('#bang')[0].play();


            settings.step = 'videoBang';
            $('.start').fadeOut();
            initElements2(settings.lnt2);
            $('.btn').fadeIn();
            $('.black').addClass('active');
            $('.black').show();
            setTimeout(function () {
                $('.black').removeClass('active');
            }, 3000);
            setTimeout(function () {
                if (!loaderImg) {
                    loaderImage()
                    loaderImg = true;
                }

            }, 100)
            e_1.visible = true;
            e_2.visible = true;
            e_3.visible = true;
            circle_1.visible = true;
            circle_2.visible = true;
            circle_3.visible = true;

        }
        if ($('#audio-in')[0].currentTime >= 4 && settings.time < -700) {
            settings.time = -700;

        }
    }
});
$('.btn_in').click(function (e) {
    $('#click')[0].currentTime = 0;
    $('#click')[0].play();
    $('.site-noise').hide();

    if ($(this).data('obj') == 'e_1') {
        animateTo(e_1);
        animateOut(e_2);
        animateOut(e_3);
        $('.texting').stop().fadeOut(function () {
            $('.titles').text('CONTINUUM DESIGN');
            $('.texting').stop().fadeIn(2000);
            $('.info, .replay').hide();
        })

    }
    else if ($(this).data('obj') == 'e_2') {
        animateTo(e_2);
        animateOut(e_1);
        animateOut(e_3);
        $('.texting').stop().fadeOut(function () {
            $('.titles').text('CONTINUUM CREATIVE');
            $('.texting').stop().fadeIn(2000);
            $('.info, .replay').hide();
        })


    }
    else if ($(this).data('obj') == 'e_3') {
        animateTo(e_3);
        animateOut(e_2);
        animateOut(e_1);
        $('.texting').stop().fadeOut(function () {
            $('.titles').text('CONTINUUM NETWORK');
            $('.texting').stop().fadeIn(2000);
            $('.info, .replay').hide();
        })


    }
    if (errorInterval) {
        picdirection = false;
        cadr = 1;
        clearInterval(errorInterval);
        animVideo()
    }
    picdirection = false;
    cadr = 1;
    errorInterval = setInterval(function () {
        animVideo()
        $('.info, .replay').hide();
    }, 40);
    return false;
})
$('.skip').click(function () {
    endVideo();
});
$('.replay').click(function () {
    replay()
});
$('.info').click(function () {
    $('.popup').fadeIn();
    $('.info, .replay, .btn, .developers-text').fadeOut();
});
$('.popup-close').click(function () {
    $('.popup-close').click(function () {
        $('.popup').fadeOut();
        $('.info, .replay, .developers-text').fadeIn();
        if (settings.step == 'videoBang') {
            $('.btn').fadeIn();
        }
    });
});
function loaderDell() {
    $('.loader').addClass('hide');
    settings.step = 'videoStart';
    setTimeout(function () {
        $('.loader').remove();
    }, 1000)
    endVideo()
}
function duration() {
    if (!$('#audio-out')[0].duration) {
        setTimeout(function () {
            duration()
        }, 500)
    }
    else {
        audioOutSec = $('#audio-out')[0].duration;
        $('#audio-out')[0].currentTime = audioOutSec;
    }
    if (!$('#audio-in')[0].duration) {
        setTimeout(function () {
            duration()
        }, 500)
    }
    else {
        audioInSec = $('#audio-in')[0].duration;
    }
}
function keyPress() {
    if (settings.step == 'videoEnd') {
        $('#bang')[0].muted = true;
        $('#bang')[0].play();
        $('.start').fadeOut();
        settings.timeAnim = true;
        $('#bang')[0].pause();
        var audioOutThis = $('#audio-out')[0].currentTime;
        $('#audio-in')[0].currentTime = audioInSec - audioOutThis;
        $('#audio-in')[0].play();
        $('#audio-out')[0].pause();
    }
}

function keyUp() {
    if (settings.step == 'videoEnd') {
        $('.start').fadeIn();
        settings.timeAnim = false;
        $('#audio-in')[0].pause();
        var audioInThis = $('#audio-in')[0].currentTime;
        if ($('#audio-in')[0].currentTime > .1) {
            $('#audio-out')[0].currentTime = audioOutSec - audioInThis;
            $('#audio-out')[0].play();
        }


    }
}


function endVideo() {
    if (!settings.init) {
        init();

    }
    $('.webgl').addClass('active');
    $('.replay, .info, .developers-text').addClass('active');
    $('.start').fadeIn();
    settings.step = 'videoEnd';
}

function replay() {
    settings.step = 'videoEnd';
    $('.start-text').removeClass('hide');
    settings.step = 'videoEnd';
    settings.time = settings.starttime;
    $('#audio-in')[0].currentTime = 0;
    $('#audio-out')[0].currentTime = audioOutSec;
    $('.btn').fadeOut();
    e_1.visible = false;
    e_2.visible = false;
    e_3.visible = false;
    circle_1.visible = false;
    circle_2.visible = false;
    circle_3.visible = false;
    $('#bang')[0].muted = true;
    $('.texting').stop().fadeOut();
    for (var i = 0; i < Elements2.length; i++) {
        Elements2[i].visible = false;
    }
    $('.start').fadeOut();
}




function loaderImage() {
    for (var i = 0; i < imageLenght; i++) {
        var pic = new Image();
        pic.src = 'jpeg/Glitch_ALPHA_' + i + '.png';
        image.push(pic)

    }

    for (var i = 0; i < imageLenght; i++) {
        var pic = new Image();
        pic.src = 'loader/Polzynok_alpha_' + i + '.png';
        imageL.push(pic)

    }
}

function plays() {
    $('#bang')[0].play();
}
function animVideo() {
    if (settings.step = 'videoError') {
        if (picdirection) {
            cadr++;
            if (cadr >= imageLenght - 1) {
                picdirection = false;
            }
        }
        else {
            cadr--;
            if (cadr <= 1) {

                picdirection = true;
            }

        }
        ctx.clearRect(0, 0, width * 10, height * 10);
        ctxL.clearRect(0, 0, width * 10, height * 10);
        ctx.drawImage(image[cadr], 0, 0);
        ctxL.drawImage(imageL[cadr], 0, 0);
    }
}

