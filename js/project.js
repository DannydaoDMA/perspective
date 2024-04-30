
import * as THREE from 'three';

import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';

// STATS MODULE NOT IMPORTING WITH CDN 
// import { Stats } from 'https://unpkg.com/three@0.162.0/examples/jsm/libs/stats.module.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~Set up scene, camera, + renderer~~~~~~~~~~~~~~~~

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// // ~~~~~~~~~~~~~~~~ Add Lights ~~~~~~~~~~~~~~~~

// ambient light which is for the whole scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
ambientLight.castShadow = true;
scene.add(ambientLight);

// directional light - parallel sun rays
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// // directionalLight.castShadow = true;
// directionalLight.position.set(0, 32, 64);
// scene.add(directionalLight);


// // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();
loader.load('assets/THREEJS.gltf', function (gltf) {
    const character = gltf.scene;
    scene.add(character);
    character.scale.set(10,10,10)
    gltf.scene.position.set(0,-10,0)
})


// const axesHelper = new THREE.AxesHelper(16);
// scene.add(axesHelper);


// // ~~~~~~~~~~~~~~~~Position Camera~~~~~~~~~~~~~~~~
camera.position.z = 1200;

// // ~~~~~~~~~~~~~~~~Particles ~~~~~~~~~~~~~~~~~~~~
const geometry = new THREE.CapsuleGeometry( 10, 1, 10, 100 ); 
const material = new THREE.PointsMaterial({
    size: 0.2
})

const capsule = new THREE.Points( geometry, material );
scene.add( capsule );

const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 100000;

const posArray = new Float32Array(particlesCnt * 3);

for(let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 1000
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

const particlesMaterial = new THREE.PointsMaterial({
    size: 1,
})

const sphere = new THREE.Points(geometry,material);
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(sphere, particlesMesh);


document.addEventListener('mousemove',animateParticles)

let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
    mouseX = event.clientX
    mouseY = event.clientY
}


// // ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~


function animate() {
    requestAnimationFrame(animate); 

    capsule.rotation.y += .05;

    particlesMesh.rotation.x = mouseX * 0.001
    particlesMesh.rotation.y = mouseY * 0.001

    renderer.render(scene, camera);

}

animate(); 

