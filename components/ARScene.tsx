"use client";

import { Suspense, useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import {
  useGLTF,
  Environment,
  useProgress,
  Html,
  DragControls,
} from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import * as THREE from "three";
import { AudioManager } from "./AudioManager";

const store = createXRStore();

function Model({
  url,
  position,
  rotation,
}: {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const { scene } = useGLTF(url);
  const [ref, api] = useBox(() => ({ mass: 1, position, rotation }));
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      api.position.subscribe((v) =>
        ref.current!.position.set(v[0], v[1], v[2])
      );
      api.rotation.subscribe((v) =>
        ref.current!.rotation.set(v[0], v[1], v[2])
      );
    }
  });

  return (
    <group ref={groupRef}>
      <DragControls>
        <group
          ref={ref as unknown as React.RefObject<THREE.Group>}
          dispose={null}
        >
          <primitive object={scene} scale={0.5} />
        </group>
      </DragControls>
    </group>
  );
}

function Plane(props: JSX.IntrinsicElements["mesh"]) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
    ...props,
  }));
  return (
    <mesh ref={ref as unknown as React.RefObject<THREE.Mesh>} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <shadowMaterial color="#171717" transparent opacity={0.4} />
    </mesh>
  );
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
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <XR store={store}>
          <Suspense fallback={<Loader />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Physics>
                <Environment preset="sunset" />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} castShadow />
                <Model
                  url={modelURL}
                  position={[0, 5, 0]}
                  rotation={[0, 0, 0]}
                />
                <Plane position={[0, 0, 0]} />
              </Physics>
            </ErrorBoundary>
          </Suspense>
        </XR>
      </Canvas>
      <AudioManager characterName="John" />
    </div>
  );
}

export default ARScene;
