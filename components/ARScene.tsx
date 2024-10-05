"use client";

import { Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { useGLTF, Environment, useProgress, Html } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import { AudioManager } from "./AudioManager";

const store = createXRStore();

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.5} position={[0, 0, -7]} />;
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <Html center>
      <div className="text-destructive font-bold">
        <h2 className="text-2xl mb-2">Error loading model:</h2>
        <p>{error.message}</p>
      </div>
    </Html>
  );
}

function ARScene({ modelURL = "/racoon.glb" }: { modelURL?: string }) {
  const handleEnterAR = useCallback(() => {
    store.enterAR();
  }, []);

  return (
    <div className="ar-scene w-full h-screen bg-background relative">
      <button
        onClick={handleEnterAR}
       className="absolute top-4 right-4 z-10 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-200 font-sans text-lg font-bold"
      >
        Enter AR
      </button>
      <Canvas>
        <XR store={store}>
          <Suspense fallback={<Loader />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Environment preset="sunset" />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Model url={modelURL} />
            </ErrorBoundary>
          </Suspense>
        </XR>
      </Canvas>
      <AudioManager characterName="John" />
    </div>
  );
}

export default ARScene;
