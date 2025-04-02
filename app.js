import * as THREE from "three";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import ApiService from "./module/api.js";

let camera, controls, scene, renderer;
let blocks,
  bricks = [];

ApiService.useMock();

// fetch data
setInterval(fetchData, 5000);
await fetchData();

// create scene
init();
//render(); // remove when using animation loop

// draw city
setInterval(draw, 5000);
draw();

async function fetchData() {
  try {
    const mapData = await ApiService.get("/map");
    blocks = mapData.blocks;
  } catch (error) {
    console.error("API Error:", error);
  }
}

function clearBlocks() {
  if (bricks.length > 0) {
    scene.remove(...bricks);
    for (let brick of bricks) {
      brick.geometry.dispose();
      brick.material.dispose();
      brick = null;
    }
  }
}

/**
 * Draw map from json data
 */
function draw() {
  clearBlocks();

  const geometry = new THREE.BoxGeometry();
  geometry.translate(0, 0.5, 0);

  for (const block of blocks) {
    const material = new THREE.MeshPhongMaterial({
      color: block.color,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.x = block.scale.x;
    mesh.scale.y = block.scale.y;
    mesh.scale.z = block.scale.z;
    mesh.position.x = block.position.x;
    mesh.position.y = block.position.y;
    mesh.position.z = block.position.z;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
    bricks.push(mesh);
  }
}

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcccccc);
  // scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );
  camera.position.set(0, 40, -40);

  // controls

  controls = new MapControls(camera, renderer.domElement);

  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;
  controls.zoomToCursor = true;

  controls.minDistance = 40;
  controls.maxDistance = 200;

  controls.maxPolarAngle = Math.PI / 2;

  // grid

  const gridHelper = new THREE.GridHelper(100, 100);
  scene.add(gridHelper);

  // lights

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
  dirLight1.position.set(-1, -1, -1);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x002288, 3);
  dirLight2.position.set(1, 1, 1);
  scene.add(dirLight2);

  const ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);

  //

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

  render();
}

function render() {
  renderer.render(scene, camera);
}
