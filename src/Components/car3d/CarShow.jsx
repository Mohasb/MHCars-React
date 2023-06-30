import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GroundProjectedSkybox } from "three/addons/objects/GroundProjectedSkybox.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { useEffect } from "react";
import * as TWEEN from "@tweenjs/tween.js";
import { gsap } from "gsap";
import Logo from "/src/assets/MHIcon.svg";

let camera, scene, renderer, skybox, controls;
const loadingManager = new THREE.LoadingManager();

init().then(render);

async function init() {
  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  //

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(-20, 7, 20);
  camera.lookAt(0, 4, 0);

  scene = new THREE.Scene();

  const hdrLoader = new RGBELoader(loadingManager);
  const envMap = await hdrLoader.loadAsync(
    "src/assets/cars3d/hdri/wide_street_02_2k.hdr"
  );
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  skybox = new GroundProjectedSkybox(envMap);
  skybox.scale.setScalar(100);
  scene.add(skybox);

  scene.environment = envMap;

  const loader = new GLTFLoader(loadingManager).setPath("src/assets/cars3d/");
  loader.load("m4.glb", function (gltf) {
    const model = gltf.scene;
    model.scale.multiplyScalar(3);
    model.position.y = -0.5;
    model.name = "car";
    scene.add(gltf.scene);
    render();
  });

  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  controls.target.set(0, 2, 0);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(88);
  controls.maxDistance = 80;
  //controls.minDistance = 20;
  controls.enablePan = true;
  controls.autoRotate = true;
  //controls.update();

  //

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {
  renderer.render(scene, camera);
}

const handleChangeModel = (e) => {
  console.log(controls.object.position);
  console.log(e.target.value);
  console.log(scene);
  scene.remove(scene.getObjectByName("car"));
  loadNewCar(e.target.value);
  renderer.render(scene, camera);
};

function loadNewCar(model) {
  const loader = new GLTFLoader(loadingManager).setPath("src/assets/cars3d/");
  loader.load(model, function (gltf) {
    const model = gltf.scene;

    /* var w = window.innerWidth;
    var h = window.innerHeight; */

    model.scale.multiplyScalar(3);
    model.position.y = -0.5;
    model.name = "car";
    scene.add(gltf.scene);
    render();
  });
}
function handleResetCamera() {
  controls.reset();
  camera.position.set(-20, 7, 20);
  camera.updateProjectionMatrix();
  controls.update();
}

export default function CarShow() {
  useEffect(() => {
    document.querySelector("#scene3d").appendChild(renderer.domElement);

    const loaderWrapper = document.querySelector("#loader-wrapper");
    loadingManager.onLoad = () => {
      loaderWrapper.style.display = "none";
    };
    loadingManager.onStart = () => {
      loaderWrapper.style.display == "none"
        ? (loaderWrapper.style.display = "block")
        : (loaderWrapper.style.display = "none");
    };
  });
  return (
    <>
      {/*  <label htmlFor="progress-bar">Loading...</label>
        <progress id="progress-bar" value="0" max="100"></progress> */}
      <div id="loader-wrapper">
        <div className="loader">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="subline"></div>
          <div className="subline"></div>
          <div className="subline"></div>
          <div className="subline"></div>
          <div className="subline"></div>
          <div className="loader-circle-1">
            <div className="loader-circle-2"></div>
          </div>
          <div className="needle"></div>
          <div className="loading">
            <img className="logo-loading" src={Logo} alt="Icon loading" />
          </div>
        </div>
      </div>
      <div id="info">
        <label htmlFor="select-car">Coche:</label>
        <select name="car" id="select-car" onChange={handleChangeModel}>
          <option value="m4.glb">M4</option>
          <option value="aventador.glb">Aventador</option>
          <option value="bmw.glb">BMW</option>
        </select>
        <button onClick={handleResetCamera} style={{ backgroundColor: "#000" }}>
          Reset Camera
        </button>
        <button
          onClick={() => {
            controls.autoRotate = !controls.autoRotate;
            render();
          }}
          style={{ backgroundColor: "#000" }}
        >
          Rotation
        </button>
        <button
          style={{ backgroundColor: "#000" }}
          onClick={() => {
            var elem = document.querySelector(".container-3dcars");
            if (elem.requestFullscreen) {
              elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
              elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
              elem.msRequestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }}
        >
          Fullscreen
        </button>
      </div>
      <div id="scene3d"></div>
    </>
  );
}
