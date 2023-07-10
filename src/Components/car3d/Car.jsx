import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";

export default function Car(props) {
  const model = props.model;
  const glbUrl = new URL(`/src/assets/cars3d/${model}`, import.meta.url).href;
  const { scene } = useGLTF(glbUrl);
  scene.rotation.x = 0.1;
  scene.rotation.y = 0.2;

  function Model() {
    return <primitive object={scene} {...props} />;
  }

  useEffect(() => {
    return () => {
      useGLTF.clear(glbUrl);
    };
  }, [glbUrl]);

  return (
    <Canvas className="car-container" dpr={[1, 2]}>
      <Stage environment="warehouse" /* environment={null} */>
        <Model />
      </Stage>
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
  );
}

/* renderer.dispose();
    renderer.forceContextLoss(); */
