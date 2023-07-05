import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GroundProjectedSkybox } from "three/addons/objects/GroundProjectedSkybox.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { useEffect, useState } from "react";
import Logo from "/src/assets/MHIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";

export default function CarShow(props) {
  const { state } = useLocation();
  console.log(state);
  let camera, scene, renderer, skybox, controls;
  const loadingManager = new THREE.LoadingManager();
  const navigate = useNavigate();
  const [car, setCar] = useState(props.car);

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
    loader.load(car, function (gltf) {
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
    setCar(e.target.value);
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
  }, [loadingManager, renderer.domElement]);
  return (
    <>
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
        {console.log(props)}
        <select
          name="car"
          id="select-car"
          onChange={handleChangeModel}
          value={car}
        >
          <option value="m4.glb">BMW M4 COMPETITION COUPÉ</option>
          <option value="bentley.glb">BENTLEY CONTINENTAL GT</option>
          <option value="mustang.glb">MUSTANG GT</option>
          <option value="ftype.glb">JAGUAR F-TYPE</option>
          <option value="db.glb">ASTON MARTIN DB11</option>
          <option value="aventador.glb">LAMBORGUINI AVENTADOR SVJ</option>
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
        <button
          onClick={() => {
            props.setCarShowRoom("");
            navigate("/venta");
          }}
          style={{ backgroundColor: "#000" }}
        >
          Volver
        </button>
      </div>
      <div id="scene3d"></div>
    </>
  );
}
