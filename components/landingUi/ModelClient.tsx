"use client";

import React, { useRef, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Spline from "@splinetool/react-spline";

const GSAPComponent = dynamic(() => import("./GSAPComponent"), { ssr: false });

interface SplineInstance {
  findObjectByName: (name: string) => SplineObject | null;
}

interface SplineObject {
  rotation: { x: number; y: number; z: number };
  position: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
}

const ModelClient: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const childRef = useRef<SplineObject | null>(null);

  const onLoad = useCallback((spline: SplineInstance) => {
    const obj = spline.findObjectByName("child"); // Replace "child" with the actual object name
    if (obj) {
      childRef.current = obj;
      setIsLoaded(true);
    } else {
      console.error("Spline object 'child' not found");
    }
  }, []);

  return (
    <div id="model">
      <Spline
        scene="https://prod.spline.design/7CobhRJFJAnjKcN0/scene.splinecode"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onLoad={onLoad}
      />
      {isLoaded && <GSAPComponent childRef={childRef} />}
    </div>
  );
};

export default ModelClient;
