import * as THREE from "three";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import { convert as convertColor, compare as compareColor } from "color-sorter";

import ApiService from "./lib/api.js";
import CoordinateGenerator from "./lib/coordinate-generator.js";

import { default as BlockMaker } from "./lib/block-maker.js";

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
setInterval(buildUp, 5000);
buildUp();

async function fetchData() {
  try {
    blocks = await ApiService.get("/blocks");
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
 * Set bricks horizontally, with optional sorting
 */
function build() {
  clearBlocks();

  const geometry = new THREE.BoxGeometry();
  geometry.translate(0, 0.5, 0);

  for (const block of blocks) {
    block.convertedColor = convertColor(
      "#" + BlockMaker.convertColorToHex(block.color),
    );
  }
  // BlockMaker.sortByHeight(blocks);
  blocks.sort((a, b) => compareColor(a.convertedColor, b.convertedColor));

  // const coords = CoordinateGenerator.getSquareSpiral(blocks.length, 20);
  const coords = CoordinateGenerator.getArchimedeanSpiral(blocks.length);

  for (const block of blocks) {
    const material = new THREE.MeshPhongMaterial({
      color: block.color,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const coord = coords.shift();
    mesh.scale.x = block.scale.x;
    mesh.scale.y = block.scale.y;
    mesh.scale.z = block.scale.z;
    mesh.position.x = coord.x;
    mesh.position.y = coord.y;
    mesh.position.z = coord.z;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
  }
}

/**
 * Set bricks grouped by colors into columns
 */
function buildUp() {
  clearBlocks();

  const geometry = new THREE.BoxGeometry();
  geometry.translate(0, 0.5, 0);

  for (const block of blocks) {
    block.convertedColor = convertColor(
      "#" + BlockMaker.convertColorToHex(block.color),
    );
  }
  blocks.sort((a, b) => compareColor(a.convertedColor, b.convertedColor));

  // const coords = CoordinateGenerator.getSquareSpiral(blocks.length, 20);
  const coords = CoordinateGenerator.getArchimedeanSpiral(
    blocks.length,
    2,
    2,
    5,
  );

  const stepSize = 20;
  let top = 0,
    step = 1;
  let coord = coords.shift();

  for (const block of blocks) {
    const material = new THREE.MeshPhongMaterial({
      color: block.color,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.x = block.scale.x;
    mesh.scale.y = block.scale.y;
    mesh.scale.z = block.scale.z;

    if (block.convertedColor.hue < stepSize * step) {
      coord.y = top;
    } else {
      step++;
      top = 0;
      coord = coords.shift();
    }
    top += block.scale.y;

    mesh.position.x = coord.x;
    mesh.position.y = coord.y;
    mesh.position.z = coord.z;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    bricks.push(mesh);
    scene.add(mesh);
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
