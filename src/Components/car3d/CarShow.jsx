import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GroundProjectedSkybox } from "three/addons/objects/GroundProjectedSkybox.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../app/sellCar/style.scss";
import Loader from "./Loader";

export default function CarShow() {
  const { state } = useLocation();
  let camera, scene, renderer, skybox, controls;
  const navigate = useNavigate();
  let car = state.car;
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const loadingManager = new THREE.LoadingManager();

  loadingManager.onStart = () => {
    document.querySelector(".loading").style.display = "block";
  };
  /* loadingManager.onProgress = (url, loaded, total) => {
    console.log(url);
    console.log(loaded);
    console.log(total);
  }; */
  loadingManager.onLoad = () => {
    document.querySelector(".loading").style.display = "none";
  };

  init().then(render);

  async function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(10, 7, 30);
    camera.lookAt(0, 4, 0);

    scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const hdrLoader = new RGBELoader();
    const envMap = await hdrLoader.loadAsync(
      new URL("/src/assets/cars3d/hdri/street.hdr", import.meta.url).href
    );
    envMap.mapping = THREE.EquirectangularReflectionMapping;

    skybox = new GroundProjectedSkybox(envMap);
    skybox.scale.setScalar(100);
    scene.add(skybox);

    scene.environment = envMap;

    const loader = new GLTFLoader(loadingManager);
    loader.load(
      new URL(`/src/assets/cars3d/${car}`, import.meta.url).href,
      function (gltf) {
        const model = gltf.scene;
        model.scale.multiplyScalar(3);
        model.position.y = -0.5;
        model.name = "car";
        scene.add(gltf.scene);
        render();
      }
    );

    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render);
    controls.target.set(0, 2, 0);
    controls.maxPolarAngle = THREE.MathUtils.degToRad(88);
    controls.maxDistance = 80;
    //controls.minDistance = 20;
    controls.enablePan = true;
    controls.autoRotate = true;

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
    const newCar = e.target.value;
    scene.remove(scene.getObjectByName("car"));
    car = newCar;
    loadNewCar(e.target.value);
    renderer.render(scene, camera);
  };

  function loadNewCar(model) {
    const loader = new GLTFLoader(loadingManager);
    loader.load(
      new URL(`/src/assets/cars3d/${model}`, import.meta.url).href,
      function (gltf) {
        const model = gltf.scene;
        model.scale.multiplyScalar(3);
        model.position.y = -0.5;
        model.name = "car";
        scene.add(gltf.scene);
        render();
      }
    );
  }
  function handleResetCamera() {
    controls.reset();
    camera.position.set(10, 10, 30);
    camera.updateProjectionMatrix();
    controls.update();
  }

  useEffect(() => {
    document.querySelector("#scene3d").appendChild(renderer.domElement);
    document.querySelector("#select-car").value = car;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [car, renderer.domElement]);

  return (
    <div className="show-room">
      <div id="info">
        <select name="car" id="select-car" onChange={handleChangeModel}>
          <option value="m4.glb">BMW M4 COMPETITION COUPÉ</option>
          <option value="corvette.glb">CHEVROLET CORVETTE STINGRAY</option>
          <option value="bentley.glb">BENTLEY CONTINENTAL GT</option>
          <option value="porsche.glb">PORSCHE CARRERA GT</option>
          <option value="mclaren.glb">MCLAREN MP4</option>
          <option value="aventador.glb">LAMBORGUINI AVENTADOR SVJ</option>
        </select>
        <button onClick={handleResetCamera} style={{ backgroundColor: "#000" }}>
          Resetear Cámara
        </button>
        <button
          style={{ backgroundColor: "#000" }}
          onClick={() => {
            var elem = document.querySelector(".show-room");
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
          Pantalla Completa
        </button>
        <button
          onClick={() => {
            navigate("/venta");
          }}
          style={{ backgroundColor: "#000" }}
        >
          Volver
        </button>
      </div>
      <div id="scene3d" style={{ position: "relative" }}>
        <div
          className="loading"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Loader />
        </div>
      </div>
    </div>
  );
}
