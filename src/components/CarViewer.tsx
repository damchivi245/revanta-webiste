import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";

interface CarViewerProps {
  modelPath: string;
}

const CarViewer: React.FC<CarViewerProps> = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
};

const CarModelViewer: React.FC<CarViewerProps> = ({ modelPath }) => {
  return (
    <div className="flex flex-col items-center w-full h-screen">
      <Canvas
        shadows
        camera={{ position: [0, 2, 7], fov: 50 }}
        className="size-full"
      >
        <Suspense fallback={null}>
          {/* Ánh sáng và môi trường */}
          <ambientLight intensity={0.5} />
          <directionalLight castShadow position={[10, 10, 5]} intensity={2} />
          {/* <Sky sunPosition={[100, 20, 100]} /> */}
          <Environment preset="sunset" />
          <OrbitControls enableZoom />
          <CarViewer modelPath={modelPath} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CarModelViewer;
