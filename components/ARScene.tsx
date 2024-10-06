"use client";

import { Suspense, useRef, useCallback, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  XR,
  useXR,
  createXRStore,
  XROrigin,
  TeleportTarget,
} from "@react-three/xr";
import { useGLTF, Environment, useProgress, Html } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import * as THREE from "three";
import { AudioManager } from "./AudioManager";

// Extend THREE to R3F
extend(THREE);

const store = createXRStore({
  controller: { teleportPointer: true },
});

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
  const groupRef = useRef<THREE.Group>(null);
  const xr = useXR();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...position);
      groupRef.current.rotation.set(...rotation);
    }
  });

  const handleSelect = useCallback(() => {
    if (xr.session && groupRef.current) {
      // Apply a small upward movement when selected in XR mode
      groupRef.current.position.y += 0.1;
    }
  }, [xr.session]);

  return (
    <group ref={groupRef} onClick={handleSelect}>
      <primitive object={scene} scale={0.5} />
    </group>
  );
}

function Plane(props: JSX.IntrinsicElements["mesh"]) {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} {...props}>
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

function ARScene({
  modelURL = "/racoon.glb",
  petName = "jellybean",
}: {
  modelURL?: string;
  petName?: string;
}) {
  const [position, setPosition] = useState(() => new THREE.Vector3());

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
              <XROrigin position={position}>
                <Environment preset="sunset" />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} castShadow />
                <Model
                  url={modelURL}
                  position={[0, 0, -1]}
                  rotation={[0, 0, 0]}
                />
                <TeleportTarget onTeleport={setPosition}>
                  <mesh scale={[10, 1, 10]} position={[0, -0.5, 0]}>
                    <boxGeometry />
                    <meshBasicMaterial color="green" />
                  </mesh>
                </TeleportTarget>
                <AudioManager characterName={petName} />
                <Plane position={[0, -0.5, 0]} />
              </XROrigin>
            </ErrorBoundary>
          </Suspense>
        </XR>
      </Canvas>
    </div>
  );
}

export default ARScene;
