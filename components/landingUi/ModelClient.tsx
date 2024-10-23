"use client";

import React, { useRef, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Spline from "@splinetool/react-spline";
import { Application } from "@splinetool/runtime";

const GSAPComponent = dynamic(() => import("./GSAPComponent"), { ssr: false });

// Define a type for the childRef
type ChildRefObject = {
  rotation: { x: number; y: number; z: number };
  position: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
};

const ModelClient: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const childRef = useRef<ChildRefObject | null>(null);

  const onLoad = useCallback((spline: Application) => {
    const obj = spline.findObjectByName("child"); // Replace "child" with the actual object name
    if (obj) {
      // Ensure the object has the required properties
      if ("rotation" in obj && "position" in obj && "scale" in obj) {
        childRef.current = {
          rotation: obj.rotation,
          position: obj.position,
          scale: obj.scale,
        };
        setIsLoaded(true);
      } else {
        console.error(
          "Spline object 'child' does not have required properties"
        );
      }
    } else {
      console.error("Spline object 'child' not found");
    }
  }, []);

  return (
    <div id="model">
      <Spline
        scene="https://prod.spline.design/7CobhRJFJAnjKcN0/scene.splinecode"
        onLoad={onLoad}
      />
      {isLoaded && childRef.current && <GSAPComponent childRef={childRef} />}
    </div>
  );
};

export default ModelClient;
