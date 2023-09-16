import { useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import Loader from "./Loader";

function Model(props) {
  const model = props.model;
  const glbUrl = new URL(`/src/assets/cars3d/${model}`, import.meta.url).href;
  const { scene } = useGLTF(glbUrl);
  scene.rotation.x = 0.2;
  scene.rotation.y = 0.2;

  useEffect(() => {
    return () => {
      useGLTF.clear(glbUrl);
    };
  }, [glbUrl]);

  return <primitive object={scene} {...props} />;
}

export default function Car(props) {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas className="car-container" dpr={[1, 2]}>
        <ambientLight intensity={0.5} color="white" />
        <Environment
          files={
            new URL(`/src/assets/cars3d/hdri/warehouse.hdr`, import.meta.url)
              .href
          }
        />
        <Model {...props} />
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
    </Suspense>
  );
}
