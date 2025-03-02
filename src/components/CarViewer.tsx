/* eslint-disable @typescript-eslint/no-explicit-any */
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense, useEffect, useState, useRef } from "react";

interface CarViewerProps {
  modelPath: string;
  color: string;
}

const CarViewer: React.FC<CarViewerProps> = ({ modelPath, color }) => {
  const { scene } = useGLTF(modelPath);
  const [scale, setScale] = useState(window.innerWidth < 768 ? 1 : 1.75);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);
  const originalColors = useRef<Map<string, any>>(new Map()); // Dùng useRef để tránh re-render

  useEffect(() => {
    if (scene && originalColors.current.size === 0) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          originalColors.current.set(child.uuid, child.material.color.clone());
        }
      });
    }
  }, [scene]);

  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          if (color === "default" && originalColors.current.has(child.uuid)) {
            child.material.color.copy(originalColors.current.get(child.uuid)); // Reset màu gốc
          } else {
            child.material.color.set(color); // Đổi màu theo lựa chọn
          }
        }
      });
    }
  }, [color, scene]);

  useEffect(() => {
    const updateScale = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        setScale(window.innerWidth < 768 ? 1 : 1.75);
      }, 150);
    };

    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return <primitive object={scene} scale={scale} position={[0, 0, 0]} />;
};
const CarModelViewer: React.FC<{ modelPath: string; colors: string }> = ({
  modelPath,
  colors,
}) => {
  return (
    <div className="flex flex-col items-center size-full">
      <Canvas
        shadows
        camera={{ position: [0, 2, 7], fov: 50 }}
        className="size-full"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight castShadow position={[10, 10, 5]} intensity={2} />
          <Environment preset="sunset" />
          <OrbitControls enableZoom minDistance={4} maxDistance={7} />
          <CarViewer modelPath={modelPath} color={colors} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CarModelViewer;
