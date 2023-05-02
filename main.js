import * as THREE from 'three';
import { InteractionManager } from 'three.interactive';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { gsap ,Power3} from "gsap";

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

let isDetailView = false;
let isRotatingDrummers = true;





function toggleIsDetail(){
    isDetailView = !isDetailView;
}

function createRenderer() {
    const app = document.getElementById("world")
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.autoClear = false;

    renderer.setSize( window.innerWidth, window.innerHeight );
    //renderer.setClearColor( 0x000000, 0 ); // the default
    app.appendChild( renderer.domElement );
    return renderer;
}

function createScene() {
    const scene = new THREE.Scene();
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );    
    scene.add(new THREE.GridHelper(10, 10));
    scene.position.set(0,-100,0);
   
   // gsap.to(camera.position,{x:90,y:30,z:0, duration:2,ease:Power3.easeInOut});

//    scene.background = new THREE.Color(0xffffff);
    return scene;
}




function createCamera() {
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    //camera.position.setScalar(50);
    camera.position.set(0,-50,0);    
    camera.lookAt(0,0,0);
    return camera;
}


function createLighting(){

    var ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);

    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.5);
    scene.add( light );

    var lights = [];
    lights[0] = new THREE.DirectionalLight( 0xffffff, 1 );
    lights[0].position.set( 1, 0, 0 );
    lights[1] = new THREE.DirectionalLight( 0x11E8BB, 1 );
    lights[1].position.set( 0.75, 1, 0.5 );
    lights[2] = new THREE.DirectionalLight( 0x8200C9, 1 );
    lights[2].position.set( -0.75, -1, 0.5 );
    scene.add( lights[0] );
    scene.add( lights[1] );
    scene.add( lights[2] );
};


// this is run on load
const renderer = createRenderer();
renderer.autoClear = false;
const scene = createScene();
const camera = createCamera();

const lighting = createLighting();
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.enableZoom = false;



// Enable horizontal panning and disable vertical panning
controls.enableRotate = true; // Enable camera rotation
controls.enablePan = true; // Enable camera panning
controls.minPolarAngle = Math.PI / 3; // Set minimum polar angle to 90 degrees
controls.maxPolarAngle = Math.PI / 2; // Set maximum polar angle to 90 degrees

controls.update();
const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement
);


// document.addEventListener('mousemove', onDocumentMouseMove)
// let mouseX = 0
// let mouseY = 0
// let targetX = 0
// let targetY = 0
// let rotation = 0;
// const windowX = window.innerWidth / 2
// const windowY = window.innerHeight / 2


const myObjects = [
    'public/models/bear.obj', 
    'public/models/cubone.obj',
    'public/models/cuphead.obj',
    'public/models/Orangutan.obj',
    'public/models/Pickelo.obj',
    'public/models/racoon.obj',
    'public/models/SheriffHat.obj',
    'public/models/teddy.obj', 
];


const myMeshes = [];

const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader();




// //Load all OBJ files and store the meshes in an array
// myObjects.forEach(function (objFile) {
//     mtlLoader.load( objFile, function (materials) {
//         materials.preload();
//         objLoader.setMaterials(materials);
//         objLoader.load( objFile, function (object) {
//         scene.add(object);
//         myMeshes.push(object);
//         });
//     });
// });
// console.log(myMeshes)


function tiltLeft(){
    const rot = drumCircle.rotation.z;
    gsap.to(drumCircle.rotation,{z:(rot - 0.1), duration:1,ease:Power3.easeInOut});
    return
};

function tiltRight(){
    const rot = drumCircle.rotation.z;
    gsap.to(drumCircle.rotation,{z:(rot + 0.1), duration:1,ease:Power3.easeInOut});
};


// function onDocumentMouseMove (event)  {
//     mouseX = (event.clientX - windowX);
//     mouseY = (event.clientY - windowY);

//     // console.log('x',mouseX );
//     // console.log('y',mouseY );

//     if (mouseX < 0){
//         console.log('x --',mouseX );
//         tiltLeft();
//     }else if (mouseX > 0){
//         console.log('x ++',mouseX );
//         tiltRight();

//     }
//     if (mouseY > 0){
//         console.log('y --',mouseY );
//     }else if (mouseY < 0){
//         console.log('y ++',mouseY );
//     }
// }




function meshFactory() {
    const color5 = new THREE.Color( 'pink' );

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(4, 32, 32),
        new THREE.MeshPhongMaterial({
            color:"pink",
            wireframe:false,
            transparent: true,
        }),
    );
    sphere.castShadow = true;
    return sphere;
}

function meshFactory2() {
    const color5 = new THREE.Color( 'purple' );

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(4, 32, 32),
        new THREE.MeshPhongMaterial({
            color:color5,
            wireframe:false,
            transparent: true,
        }),
    );
    sphere.castShadow = true;
    return sphere;
}


function stickFactory() {
    const stick = new THREE.Mesh(
        new THREE.BoxGeometry(1, 100, 1),
    );
    stick.castShadow = true;
    return stick;
}

function objFactory(i) {
    const obj = new THREE.Group();
    objLoader.load(
        myObjects[i],  
        function (object) {  
            obj.add(object);
        },
    
        // called while loading is in progress
        function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
    
        // called if an error occurs while loading
        function (error) {
        console.log('An error occurred while loading the OBJ file:', error);
        }
    );
//     const box = new THREE.Box3().setFromObject(obj); // Calculate bounding box
// const size = new THREE.Vector3();
// size.set(2000, 200, 20); // Set the dimensions to (2, 2, 2)

// box.getSize(size); // Get the dimensions of the bounding box

// // Calculate the maximum dimension (x, y, or z)
// const maxDimension = Math.max(size.x, size.y, size.z);

// // Calculate the scale factor to make the maximum dimension 1
// const scaleFactor = 1 / maxDimension;

// // Scale the group uniformly
// obj.scale.set(scaleFactor, scaleFactor, scaleFactor);
    return obj;
}



// function preloadObjects(){
//     for (let i = 0; i < myObjects.length; i++) {

//         objLoader.load(
//           myObjects[i],     
//           function (object) {
//             myMeshes.push(object);
//             //scene.add(object);
//           },
      
//           // called while loading is in progress
//           function (xhr) {
//             console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//           },
      
//           // called if an error occurs while loading
//           function (error) {
//             console.log('An error occurred while loading the OBJ file:', error);
//           }
//         );
//       }     
//       console.log('-----------',myMeshes);

// }
//preloadObjects();

function createDrumCircle() {
    const drumCircle = new THREE.Group();
   // const objectCount = 10;
    const offset = THREE.MathUtils.degToRad(360 / (myObjects.length) / 2);
    drumCircle.rotation.set(THREE.MathUtils.degToRad(90), 0, offset);
    drumCircle.position.set(0,0,0);
   // drumCircle.add(circle);
   for (let i = 0; i < myObjects.length; i++) {
   
    var spoke = new THREE.Group();

    var s = stickFactory();
    var h = meshFactory();
    var o = objFactory(i);
            
   // spoke.add(s);
  //  s.position.set(0,0,0);

    spoke.add(o);
    o.position.set(0,50,0);
    var seg = (360 / (myObjects.length));
    var rot = THREE.MathUtils.degToRad( i * seg );

    spoke.position.set(0,0,0);
    spoke.rotation.z = (rot);
    console.log(rot);

    o.addEventListener('mouseover', (event) => {
     event.target.material.color.set(0xff0000);
    isRotatingDrummers = false;

    document.body.style.cursor = 'pointer';
    });
    o.addEventListener('mouseout', (event) => {
        isRotatingDrummers = true;

    // event.target.material.color.set(0xffffff);
    document.body.style.cursor = 'default';
    });
    o.addEventListener('mousedown', (event) => {
    event.target.scale.set(1.1, 1.1, 1.1);
    });
      o.addEventListener('click', (event) => {
        event.target.scale.set(1.0, 1.0, 1.0);
       // createDrummer();
        setCameraToDetail();
        toggleIsDetail();
      });
    
    //scene.add( cube );
    interactionManager.add(h);
    drumCircle.add( spoke );

    }
    return drumCircle;
}




function createDrummer() {
    var m = meshFactory2();
    m.position.set(0,-100,0);

        m.addEventListener('mouseover', (event) => {
        // event.target.material.color.set(0xff0000);
        document.body.style.cursor = 'pointer';
        });
        m.addEventListener('mouseout', (event) => {
    

        // event.target.material.color.set(0xffffff);
        document.body.style.cursor = 'default';
        });
        m.addEventListener('mousedown', (event) => {
        event.target.scale.set(1.1, 1.1, 1.1);
        });
    m.addEventListener('click', (event) => {
        console.log('fff');
        event.target.scale.set(1.0, 1.0, 1.0);
        setCameraToDrumCircle();
        toggleIsDetail();
    });
    interactionManager.add(m);
    return m;
}



function createSplash() {
    var m = meshFactory();
    m.position.set(0,100,0);

    m.addEventListener('mouseover', (event) => {
    // event.target.material.color.set(0xff0000);
    document.body.style.cursor = 'pointer';
    });
    m.addEventListener('mouseout', (event) => {
    // event.target.material.color.set(0xffffff);
    document.body.style.cursor = 'default';
    });
    m.addEventListener('mousedown', (event) => {
    event.target.scale.set(1.1, 1.1, 1.1);
    });
    m.addEventListener('click', (event) => {
        console.log('fff');
        event.target.scale.set(1.0, 1.0, 1.0);
        setCameraToDrumCircle();
    });
    interactionManager.add(m);
    return m;
}


const splash = createSplash();
scene.add(splash);

const drumCircle = createDrumCircle();
scene.add(drumCircle);

const drummer = createDrummer();
scene.add(drummer);





function setCameraToStart() {
    gsap.to(controls.target,{x:0,y:-100,z:0, duration:2,ease:Power3.easeInOut});
    gsap.to(camera.position,{x:90,y:30,z:0, duration:2,ease:Power3.easeInOut});
}


function setCameraToDrumCircle() {
    gsap.to(controls.target,{x:0,y:-90,z:0, duration:2,ease:Power3.easeInOut});
  //  gsap.to(camera.position,{x:100,y:-80,z:0, duration:2,ease:Power3.easeInOut});
    gsap.to(camera.position,{x:0,y:-120,z:0, duration:2,ease:Power3.easeInOut});
    gsap.to(camera.lookAt,{x:0,y:0,z:0, duration:2,ease:Power3.easeInOut});
       // camera2.lookAt(0,0,0);


  
    //camera.position.set(0,30,0);    
   //camera.lookAt(scene.position);
  // default  camera.position.set(90,30,0);    
}


function setCameraToDetail() {
    gsap.to(controls.target,{x:0,y:-180,z:0, duration:2,ease:Power3.easeInOut});
    gsap.to(camera.position,{x:60,y:-180,z:0, duration:2,ease:Power3.easeInOut});
  // default  camera.position.set(90,30,0);    
}

// Set the animation parameters
const speed = 0.1; // Set the speed of the animation
let direction = 1; // Set the initial direction of the animation

function rotateDrumCircle(){
    
    if(isRotatingDrummers){
        drumCircle.rotation.z += 0.0013;
    }
  
}

function wiggleDrummers(){
    drumCircle.children.forEach((object,index) => {
    object.position.z += speed * direction;

    // Reverse the direction if the object reaches the top or bottom of the screen
    if (object.position.z > 3 || object.position.z < -5) {
        direction *= -1;
    }
    })
}






    const scene2 = new THREE.Scene();
    scene2.position.set(300,-50,10);
    //scene2.background = new THREE.Color('red');


    const geometry = new THREE.BoxGeometry( 100, 100, 100 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const mesh = new THREE.Mesh( geometry, material );
    scene2.add( mesh );
    // var loader = new THREE.TextureLoader();
    // var material = new THREE.MeshLambertMaterial({
    // map: loader.load('https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg')
    // });

    // var geometry = new THREE.PlaneGeometry(10, 10*.75);    
    // var mesh = new THREE.Mesh(geometry, material);
    // scene2.add(mesh);

   const camera2 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
   //camera.position.setScalar(50);
   camera2.position.set(0,-50,0);    
   camera2.lookAt(1000,10,10);

animate()

function animate() {

    rotateDrumCircle();

	requestAnimationFrame( animate );
    render();
    interactionManager.update();
	controls.update();
   
}

function render() {
    renderer.clear();
    renderer.render(scene2, camera2);

   // renderer.clearDepth(); // important! clear the depth buffer
    renderer.render(scene, camera);


}

animate();

