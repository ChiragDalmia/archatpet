"use client";

import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { Suspense } from "react";
import { useGLTF, Environment } from "@react-three/drei";

const store = createXRStore();

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.5} position={[0, 0, -7]} />;
}

function ARScene() {

  return (
    <div className="ar-scene w-full h-screen">
      <button
        onClick={() => store.enterAR()}
        className="absolute top-4 left-4 z-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Enter AR
      </button>
      <Canvas>
        <XR store={store}>
          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            {/* Your 3D model */}
            <Model url="/racoon.glb" />
          </Suspense>
        </XR>
      </Canvas>
    </div>
  );
}

export default ARScene;
