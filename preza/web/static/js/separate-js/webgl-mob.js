var camera, scene, renderer, loader, manager, texture, onProgress, onError, materialAroundHover, directionalLight, light, sphereIn, sphereOut, mirrorCameraElem, e_1, e_2, e_3, circle_1, circle_2, circle_3, line_1, line_2, line_2, Desing, Network, Creative;
var materials = [];
var objects = [];
var Elements = [];
var Elements2 = [];
var f = 0;
var s = 2 * Math.PI / 180;
var r = 100;
var sphereR = 300;

var timeDel = 2000;
if (width < 720) {
    sphereR = 200
}
var INTERSECTED;

function init() {
    settings.init = true;
    var webgl = document.getElementById("webgl");
    renderer = new THREE.WebGLRenderer({canvas: webgl});
    renderer.setSize(width, height);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
    renderer.setClearColor(new THREE.Color(0x0e141e));
    camera.position.set(0, 0, 1115);
    manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        if (loaded == total) {
            initElements(settings.lnt)
            initElements(settings.lnt)
            animation();
            threeObjInit();

        }

    };

    onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
        }
    };
    onError = function (xhr) {
    };
    loader = new THREE.OBJLoader(manager);
    loader.load('glass.obj', function (object) {
        objects.glass = object;
    });
    loader.load('glass1.obj', function (object) {
        objects.glass1 = object;
    });
    loader.load('elem1.obj', function (object) {
        objects.elem1 = object;
    });
    loader.load('elem2.obj', function (object) {
        objects.elem2 = object;
    });
    loader.load('elem3.obj', function (object) {
        objects.elem3 = object;
    });


    light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 0, 800);
    scene.add(light);

    directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(0, 0, 800);
    scene.add(directionalLight);

    mirrorCamera = new THREE.CubeCamera(1, 100000, 512);
    mirrorCamera.position.set(0, 0, 170);
    mirrorCamera.scale.set(1, 1, -1);
    scene.add(mirrorCamera);

    // mirrorCameraElem = new THREE.CubeCamera(1, 100000, 512);

    // mirrorCameraElem = new THREE.CubeCamera(1, 1000, 256);
    // mirrorCameraElem.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
    //
    //
    // mirrorCameraElem.position.set(0, 0, 400);
    // mirrorCameraElem.scale.set(1, -1, 1);
    // scene.add(mirrorCameraElem);

    var image = new THREE.TextureLoader().load('textures/glass.jpg');
    var image2 = new THREE.TextureLoader().load('textures/glass2.jpg');
    var around = new THREE.TextureLoader().load('textures/around.png');
    var aroundHover = new THREE.TextureLoader().load('textures/aroundhover.png');
    // var imgNetwork = new THREE.TextureLoader().load('textures/network.png');
    // var imgDesing = new THREE.TextureLoader().load('textures/desing.png');
    // var imgCreative = new THREE.TextureLoader().load('textures/creative.png');
    materialAround = new THREE.MeshBasicMaterial({
        map: around,
        transparent: true,
    });

    materialGlass = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        map: image,
        opacity: 0.4,
        roughness: 0.5,
        metalness: 1,
        side: THREE.DoubleSide
    });
    materialSphereMetal = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: image2,
        transparent: true,
        roughness: 0.5,
        metalness: 1
    });
    materialSphere = new THREE.MeshPhongMaterial({
        // envMap: mirrorCamera.renderTarget.texture,
        transparent: true,
        opacity: 0.1
    });
    materialSphereElem = new THREE.MeshPhysicalMaterial({
        map: null,
        // envMap: mirrorCameraElem.renderTarget.texture,
        transparent: true,
        opacity: .3,
        envMapIntensity: 5,
        premultipliedAlpha: true,
        color: 0x0f0f0f,
        // side: THREE.DoubleSide
    });
    materialSphereMetalNew = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: image2,
        transparent: true,
        roughness: 0.5,
        metalness: 1,
        opacity: 0.7,
    });

    sphereIn = sphere(sphereR, 0, 0, 165, materialSphereMetal);
    sphereOut = sphere(sphereR + 70, 0, 0, 165, materialSphere);


    renderer.render(scene, camera);
}

function sphere(radius, x, y, z, material) {
    var geometry = new THREE.SphereGeometry(radius, 64, 64);
    var sphereObj = new THREE.Mesh(geometry, material);
    sphereObj.position.set(x, y, z);
    scene.add(sphereObj);
    return sphereObj;
}


setInterval(function () {
    if (settings.step == 'videoEnd') {
        if (settings.timeAnim == true) {
            settings.time += 5;
        }
        else if (settings.timeAnim == false && settings.time > settings.starttime) {
            settings.time -= 5;
        }
    }
}, 35)


function animation() {
    // stats.begin();
    if (settings.step == 'videoEnd') {
        render();
    }
    else if (settings.step == 'videoBang') {
        render2();
    }
    else if (settings.step == 'videoError') {
        render3();
    }
    // stats.end();
    requestAnimationFrame(animation);
}
function render() {
    f += s / 2;
    light.position.x = 400 * Math.sin(f);
    light.position.y = 100 * Math.cos(f) + 500;
    directionalLight.position.x = -400 * Math.sin(f);
    directionalLight.position.y = -100 * Math.cos(f) - 500;
    renderer.setClearColor(new THREE.Color(0x646464));
    sphereOut.visible = false;
    sphereIn.visible = false;
    mirrorCamera.updateCubeMap(renderer, scene);
    sphereOut.visible = true;
    sphereIn.visible = true;
    elemRender();
    renderer.setClearColor(new THREE.Color(0x0e141e));


    if (settings.time <= -700) {
        sphereIn.scale.set(1, 1, 1);
        sphereOut.scale.set(1, 1, 1);
        sphereIn.position.x = sphereIn.position.y = sphereOut.position.x = sphereOut.position.y = 0;
        var pos = rand(-(settings.time + 900) / 200, (settings.time + 900) / 200);
        sphereIn.position.x += pos;
        sphereIn.position.y += pos;
        sphereOut.position.x += pos;
        sphereOut.position.y += pos;
    }


    else {
        var scaleShape = 1 + ((settings.time + 700) / timeDel);
        sphereIn.position.x = sphereIn.position.y = sphereOut.position.x = sphereOut.position.y = 0;
        var pos = rand(-(settings.time + 900) / 200, (settings.time + 900) / 200);
        sphereIn.position.x += pos;
        sphereIn.position.y += pos;
        sphereOut.position.x += pos;
        sphereOut.position.y += pos;
        if (settings.time <= 300) {
            sphereIn.scale.set(scaleShape, scaleShape, scaleShape);
            sphereOut.scale.set(scaleShape, scaleShape, scaleShape);
        }
    }
    renderer.render(scene, camera);
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function initElements(length) {
    for (var i = 0; i < length; i++) {
        elem_1 = objects.glass.clone();
        elem_2 = objects.glass1.clone();
        elem_3 = objects.elem1.clone();
        f += s;
        addElements(elem_1, f, i);
        addElements(elem_2, f, i);
        addElements(elem_3, f, i);

        Elements.push(elem_1);
        Elements.push(elem_2);
        Elements.push(elem_3);
    }
    for (var i = 0; i < Elements.length; i++) {
        Elements[i].traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = materialSphereElem;

            }
        });
        scene.add(Elements[i]);
    }
}


function initElements2(length) {
    for (var i = 0; i < length; i++) {
        elem_1 = objects.elem1.clone();
        elem_2 = objects.elem2.clone();
        elem_3 = objects.elem3.clone();
        f += s;
        addElements(elem_1, f, i);
        addElements(elem_2, f, i);
        addElements(elem_3, f, i);

        Elements2.push(elem_1);
        Elements2.push(elem_2);
        Elements2.push(elem_3);

    }
    for (var i = 0; i < Elements2.length; i++) {
        Elements2[i].traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = materialSphereElem;

            }
        });
        Elements2[i].position.y = rand(-200, 200);
        Elements2[i].position.x = rand(-400, 400);
        Elements2[i].position.z = 900;
        Elements2[i].scale.set(100, 100, 100);

        scene.add(Elements2[i]);
    }
}

function addElements(elem, f, i) {
    elem.rotation.z = rand(1, 50);
    elem.rotation.x = rand(1, 50);
    elem.rotation.y = rand(1, 50);
    elem.scale.set(rand(50, 50), rand(50, 50), rand(50, 50));
    elem.radius = rand(i * 5 - 20, i * 5 + 20);
    elem.position.x = elem.radius * Math.sin(f + i / 2);
    elem.position.y = elem.radius * Math.cos(f + i / 2);
    elem.position.z = i * 10;
    elem.startposition = {
        z: elem.position.z,
        r: elem.radius
    }
}

function elemRender() {
    for (var i = 0; i < Elements.length; i++) {
        if (Elements[i].position.z <= 200) {
            Elements[i].position.z = Elements[i].startposition.z - settings.time;
            Elements[i].visible = false;
        }
        else {
            Elements[i].visible = true;
            Elements[i].radius = Elements[i].startposition.r - settings.time;
            Elements[i].position.z = Elements[i].startposition.z - settings.time;
            Elements[i].position.x = Elements[i].radius * Math.sin(f + i);
            Elements[i].position.y = Elements[i].radius * Math.cos(f + i);
            // Elements[i].rotation.z -= 0.01;
        }
    }
}


function render2() {
    if (sphereOut.visible == true) {
        sphereOut.visible = false;
        sphereIn.visible = false;
        for (var i = 0; i < Elements.length; i++) {
            Elements[i].visible = false;
        }
    }
    threeObjAnim(e_1, circle_1);
    threeObjAnim(e_2, circle_2);
    threeObjAnim(e_3, circle_3);
    for (var i = 0; i < Elements2.length; i++) {
        threeObjAnim2(Elements2[i]);
        Elements2[i].visible = true;
    }
    renderer.render(scene, camera);
}

function threeObjAnim2(e) {

    e.rotation.x += .01;
    e.rotation.y += .01;
    e.rotation.z += .01;
}


window.addEventListener('touchstart', function (event) {
    if (settings.step == 'videoBang') {

        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        mouse.x = ( event.touches[0].clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = -( event.touches[0].clientY / renderer.domElement.clientHeight ) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            INTERSECTED = intersects[0].object;
            INTERSECTED.hover = true;


            if (e_1.hover == true) {
                settings.step = 'videoError';
                $('.btn_in.e_1').click();

            }
            if (e_2.hover == true) {
                settings.step = 'videoError';
                $('.btn_in.e_2').click();

            }
            if (e_3.hover == true) {
                settings.step = 'videoError';
                $('.btn_in.e_3').click();

            }


        }
        else {
            e_1.hover = e_2.hover = e_3.hover = false;
        }


    }
    else if (settings.step == 'videoError') {
        $('.info, .replay').hide();
        $('.texting').stop().fadeOut();
        animateOut(e_1);
        animateOut(e_2);
        animateOut(e_3);
        $('.site-noise').fadeIn();
        if (errorInterval) {
            clearInterval(errorInterval);
            picdirection = false;
            cadr = 1;
            animVideo();
        }

        setTimeout(function () {
            settings.step = 'videoBang';
            e_1.hover = e_2.hover = e_3.hover = false;
            $('.info, .replay, .btn').show();
        }, 1000);
    }
});

function threeObjAnim(e, around) {
    if (e.hover == false) {
        if (e.rotationAnim == false) {
            e.rotation.z += .01;
        }
        else {
            e.rotation.z -= .01;
        }
        if (e.rightAnim == false) {
            e.animate.x += rand(.2, .5)
            if (e.animate.x > e.animateMax.x) {
                e.rightAnim = true;
                e.rotationAnim = !e.rotationAnim;
            }
        }
        else {
            e.animate.x -= rand(.2, .5)
            ;
            if (e.animate.x < e.animateMin.x) {
                e.rightAnim = false;
                e.rotationAnim = !e.rotationAnim;
            }
        }


        if (e.topAnim == false) {
            e.animate.y += rand(.2, .5)
            if (e.animate.y > e.animateMax.y) {
                e.topAnim = true;
                e.rotationAnim = !e.rotationAnim;
            }
        }
        else {
            e.animate.y -= rand(.2, .5)
            ;
            if (e.animate.y < e.animateMin.y) {
                e.topAnim = false;
                e.rotationAnim = !e.rotationAnim;
            }
        }
        e.position.x = e.animate.x;
        e.position.y = e.animate.y;
        around.position.x = e.animate.x;
        around.position.y = e.animate.y;
        // around.material = materialAround;

    }
    if (e.hover == true) {
        // around.material = materialAroundHover;
        around.rotation.z -= .05;
    }
}
function threeObjInit() {
    raycaster = new THREE.Raycaster();
    e_1 = objects.elem1.clone();
    e_2 = objects.elem2.clone();
    e_3 = objects.elem3.clone();

    e_1.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            e_1 = child;
            child.material = materialGlass;
        }
    });
    e_2.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            e_2 = child;
            child.material = materialGlass;
        }
    });
    e_3.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            e_3 = child;
            child.material = materialGlass;
        }
    });


    e_1.position.x = 30;
    e_1.position.y = 30;
    e_1.animateMax = {x: 30, y: 90};
    e_1.animateMin = {x: -30, y: 30};
    e_1.start = {x: 100, y: 120};
    e_2.position.x = -30;
    e_2.position.y = 30;
    e_2.animateMax = {x: 30, y: 30};
    e_2.animateMin = {x: -30, y: -30};
    e_2.start = {x: -100, y: 120};
    e_3.position.x = 0;
    e_3.position.y = -30;
    e_3.animateMax = {x: 30, y: -30};
    e_3.animateMin = {x: -30, y: -90};
    e_3.start = {x: 0, y: -120};
    var geometry = new THREE.CircleBufferGeometry(3, 32);
    circle_1 = new THREE.Mesh(geometry, materialAround);
    circle_2 = new THREE.Mesh(geometry, materialAround);
    circle_3 = new THREE.Mesh(geometry, materialAround);
    // inittextLine()
    elemOptions(e_1, circle_1);
    elemOptions(e_2, circle_2);
    elemOptions(e_3, circle_3);
    scene.add(e_1);
    scene.add(e_2);
    scene.add(e_3);


    circle_1.position.z = 1002;
    circle_2.position.z = 1002;
    circle_3.position.z = 1002;

    scene.add(circle_1);
    scene.add(circle_2);
    scene.add(circle_3);


}


function elemOptions(e, around) {
    e.visible = false;
    around.visible = false;
    // text.visible = false;
    // texts.visible = false;
    e.scale.z = 200;
    e.scale.x = 200;
    e.scale.y = 200;
    e.position.z = 1000;
    e.hover = false;
    e.animate = {x: e.start.x, y: e.start.y};
    e.rightAnim = false;
    e.topAnim = false;
    e.rotationAnim = false;
    e.elemHover = around;
    // e.text = text;
    // e.texts = texts;
}


function render3() {
    circle_1.position.x = e_1.position.x;
    circle_1.position.y = e_1.position.y;
    circle_2.position.x = e_2.position.x;
    circle_2.position.y = e_2.position.y;
    circle_3.position.x = e_3.position.x;
    circle_3.position.y = e_3.position.y;


    renderer.render(scene, camera);
}


function animateTo(obj) {
    obj.elemHover.visible = false;

    TweenLite.to(obj.position, 1, {
        x: 0,
        y: 0,
        z: 1050
    });
    TweenLite.to(obj.rotation, 1, {
        x: 0,
        y: 0,
        z: 0,
    });
    TweenLite.to(obj.scale, 4, {
        x: 5000,
        y: 5000,
        z: 5000,
    });
}
function animateOut(obj) {
    obj.elemHover.visible = true;
    TweenLite.to(obj.position, 1, {
        x: obj.animate.x,
        y: obj.animate.y,
        z: 1000
    });
    TweenLite.to(obj.scale, 1, {
        x: 200,
        y: 200,
        z: 200,
    });
}





