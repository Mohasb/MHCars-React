import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GroundProjectedSkybox } from "three/addons/objects/GroundProjectedSkybox.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../app/sellCar/style.scss";
import Loader from "./Loader";
import clickHold from "/src/assets/clickHold.png";

export default function CarShow() {
  const { state } = useLocation();
  let camera, scene, renderer, skybox, controls;
  const navigate = useNavigate();
  let car = state.car;
  const loadingManager = new THREE.LoadingManager();
  let isDragging = false;
  const clickHoldRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  loadingManager.onStart = () => {
    document.querySelector(".loading").style.display = "block";
    document.querySelector(".loading").style.opacity = "1";
  };
  loadingManager.onLoad = () => {
    document.querySelector(".loader-main").style.opacity = "0";
    document.querySelector(".loading").style.opacity = "0";
    setTimeout(() => {
      document.querySelector(".loader-main").style.display = "none";
      document.querySelector(".loading").style.display = "none";
    }, 2100);
  };

  init().then(render);

  async function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mouseup", onMouseUp);

    function onMouseDown(event) {
      isDragging = true;
    }

    function onMouseUp(event) {
      isDragging = false;
    }
    function update() {
      if (isDragging) {
        console.log("EEEEEEEEEEEEEEEEEEEeeee");
      }
    }

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
        model.scale.multiplyScalar(4);
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
    if (isDragging) {
      clickHoldRef.current.classList.add("click-hold-fade");
    }
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
        <button className="reset" onClick={handleResetCamera}>
          Resetear Cámara
        </button>
        <button
          className="full-screen"
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
          className="return"
          onClick={() => {
            navigate("/venta");
          }}
          style={{ backgroundColor: "#000" }}
        >
          Volver
        </button>
        <audio
          style={{ width: "100%" }}
          src={new URL("/src/assets/ShowRoomMusic.mp3", import.meta.url).href}
          controls
          autoPlay
          loop
          muted
        />
      </div>
      <div id="scene3d" style={{ position: "relative" }}>
        <div ref={clickHoldRef} className="click-hold">
          <img src={clickHold} alt="Click and hold icon" />
        </div>
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
        <BigLoader />
      </div>
    </div>
  );
}

export function BigLoader() {
  useEffect(() => {
    document.querySelector("#nav").scrollIntoView();
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="loader-main">
      <Loader />
    </div>
  );
}
