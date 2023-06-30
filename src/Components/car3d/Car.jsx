import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls, Loader } from "@react-three/drei";

function LoaderComponent() {
  return <div>Cargando...</div>; // Puedes personalizar este componente con un spinner u otra indicación visual de carga
}

export default function Car(props) {
  const model = props.model;
  const { scene } = useGLTF(`/src/assets/cars3d/${model}`);
  scene.rotation.x = 0.1;
  scene.rotation.y = 0.2;
  scene.scale.set(0.4, 0.4, 0.4);

  function Model() {
    return <primitive object={scene} {...props} />;
  }

  return (
   <>
    <Canvas className="car-container" dpr={[1, 2]} camera={{ fov: 80 }}>
      <Suspense fallback={null}>
        <Stage environment="warehouse" shadows={null}>
          <Model />
        </Stage>
      </Suspense>
      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.5}
      />
    </Canvas>
    <Loader />
    </>
  );
}
