// var stats = new Stats();
// stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom);

var settings = [];
settings.step = 'videoLoad';
settings.init = false;

var width = window.innerWidth;
var height = window.innerHeight;
var originalVideo = document.getElementById('original-video');
var inversionVideo = document.getElementById('inversion-video');

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
// keyPress();
// setTimeout(function () {
//     endVideo();
// }, 1000);
$(document).ready(function () {
    originalVideo.onended = function () {
        endVideo()
    };

});


$(document).keydown(function (e) {
    if (e.keyCode == '32') {
        e.preventDefault();
        if (!settings.repeat32) {
            keyPress();
            settings.repeat32 = true;
        }
    }
});

$(document).keyup(function (e) {
    if (e.keyCode == '32') {
        keyUp();
        settings.repeat32 = false;
    }
});

$(window).resize(function () {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
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
        if (settings.time >= 100 || $('#audio-in').currentTime >= 14) {  // 9
            $('#audio-in')[0].pause();
            $('#audio-out')[0].pause();
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
            line_1.visible = true;
            line_2.visible = true;
            line_3.visible = true;
        }
        if ($('#audio-in')[0].currentTime >= 4 && settings.time < -700) {
            settings.time = -700;

        }
    }
});
$('.btn_in').click(function (e) {
    // alert($(this).data('text'));
    // $('.texting').addClass('active')
    $('#click')[0].currentTime = 0;
    $('#click')[0].play();
    $('.site-noise').fadeOut();


    $('.info, .replay, .developers-text').fadeOut();
    if ($(this).data('obj') == 'e_1') {
        animateTo(e_1);
        animateOut(e_2);
        animateOut(e_3);
        $('.texting').stop().hide(0, function () {
            $('.titles').text('CONTINUUM DESIGN');
            $('.texting').removeAttr("style");
            $('.texting').fadeIn(3000);
        })

    }
    else if ($(this).data('obj') == 'e_2') {
        animateTo(e_2);
        animateOut(e_1);
        animateOut(e_3);
        $('.texting').stop().hide(0, function () {
            $('.titles').text('CONTINUUM CREATIVE');
            $('.texting').removeAttr("style");
            $('.texting').fadeIn(3000);
        })


    }
    else if ($(this).data('obj') == 'e_3') {
        animateTo(e_3);
        animateOut(e_2);
        animateOut(e_1);
        $('.texting').stop().hide(0, function () {
            $('.titles').text('CONTINUUM NETWORK');
            $('.texting').removeAttr("style");
            $('.texting').fadeIn(3000);
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
    $('.popup').fadeOut();
    $('.info, .replay, .developers-text').fadeIn();
    if (settings.step == 'videoBang') {
        $('.btn').fadeIn();
    }
});
function loaderDell() {
    $('.loader').addClass('hide');
    settings.step = 'videoStart';
    setTimeout(function () {
        $('.loader').remove();
    }, 1000)
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
    if (settings.step == 'videoStart') {
        videoStart();

    }
    else if (settings.step == 'videoInversion') {
        TweenLite.to(inversionVideo, .5, {volume: 1});
        TweenLite.to(originalVideo, .5, {volume: 0});

        $(inversionVideo).stop().fadeIn();

    }
    else if (settings.step == 'videoEnd') {
        $('.start').fadeOut();
        settings.timeAnim = true;
        var audioOutThis = $('#audio-out')[0].currentTime;
        $('#audio-in')[0].currentTime = audioInSec - audioOutThis;
        $('#audio-in')[0].play();

        setTimeout(function () {
            $('#audio-out')[0].pause();
        }, 200)
    }
}

function keyUp() {
    if (settings.step == 'videoInversion') {

        TweenLite.to(inversionVideo, .5, {volume: 0});
        TweenLite.to(originalVideo, .5, {volume: 1});
        $(inversionVideo).stop().fadeOut();

    }
    else if (settings.step == 'videoEnd') {
        $('.start').fadeIn();
        settings.timeAnim = false;

        var audioInThis = $('#audio-in')[0].currentTime;
        if (audioInThis > .1) {
            $('#audio-out')[0].currentTime = audioOutSec - audioInThis;
            $('#audio-out')[0].play();
        }

        $('#audio-in')[0].pause();


    }
}

function videoStart() {
    inversionVideo.currentTime = 0;
    originalVideo.currentTime = 0;
    $('.video-cover').fadeIn();
    inversionVideo.play();
    originalVideo.play();
    TweenLite.to(originalVideo, .5, {volume: 0.1});
    $('.start-text').addClass('hide');
    settings.step = 'videoInversion';
}

function endVideo() {
    if (!settings.init) {
        init();

    }
    $('.webgl').addClass('active');
    setTimeout(function () {
        $('.replay, .info, .developers-text').addClass('active');
        inversionVideo.pause();
        originalVideo.pause();
        $('.video-cover').fadeOut();
        settings.step = 'videoEnd';
        $('.start').fadeIn()
    }, 500);
    $('#audio-fon')[0].currentTime = 0;
    $('#audio-fon')[0].play();
}

function replay() {
    $('.start-text').removeClass('hide');
    settings.step = 'videoStart';
    $('.webgl').removeClass('active');
    $('.replay, .info, .developers-text').removeClass('active').removeAttr('style');
    $('.texting').fadeOut();
    settings.time = settings.starttime;
    $('#audio-fon')[0].pause();
    $('#audio-out')[0].pause();
    $('#audio-in')[0].pause();
    $('#audio-out')[0].currentTime = audioOutSec;
    $('#audio-in')[0].currentTime = 0;
    $('.btn').fadeOut();
    e_1.visible = false;
    e_2.visible = false;
    e_3.visible = false;
    circle_1.visible = false;
    circle_2.visible = false;
    circle_3.visible = false;
    line_1.visible = false;
    line_2.visible = false;
    line_3.visible = false;
    for (var i = 0; i < Elements2.length; i++) {
        Elements2[i].visible = false;
    }
    $('.start').fadeOut();
}


// var gui = new dat.GUI();


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
                $('#audio')[0].currentTime = 0;
                $('#audio')[0].play();
                picdirection = true;
            }

        }
        ctx.clearRect(0, 0, width, height);
        ctxL.clearRect(0, 0, width, height);
        ctx.drawImage(image[cadr], 0, 0);
        ctxL.drawImage(imageL[cadr], 0, 0);
    }
}

