"use client";

import React, { useRef, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Spline from "@splinetool/react-spline";
import type { Application, SPEObject } from "@splinetool/runtime";

const GSAPComponent = dynamic(() => import("./GSAPComponent"), { ssr: false });

export default function ModelClient() {
  const [isLoaded, setIsLoaded] = useState(false);
  const childRef = useRef<SPEObject | null>(null);

  const onLoad = useCallback((spline: Application) => {
    const obj = spline.findObjectByName("child"); // Replace "child" with the actual object name
    if (obj) {
      childRef.current = obj;
      setIsLoaded(true);
    } else {
      console.error("Spline object 'child' not found");
    }
  }, []);

  return (
    <div id="model" className="w-full h-screen">
      <Spline
        scene="https://prod.spline.design/7CobhRJFJAnjKcN0/scene.splinecode"
        onLoad={onLoad}
      />
      {isLoaded && <GSAPComponent childRef={childRef} />}
    </div>
  );
}
