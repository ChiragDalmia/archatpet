"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Spline from "@splinetool/react-spline";
import type { Application, SPEObject } from "@splinetool/runtime";
import { Object3D } from "three";

const GSAPComponent = dynamic(() => import("./GSAPComponent"), { ssr: false });

interface SplineObjectWrapper extends Object3D {
  splineObject: SPEObject;
}

export default function ModelClient() {
  const [isLoaded, setIsLoaded] = useState(false);
  const childRef = useRef<SplineObjectWrapper | null>(null);

  const onLoad = useCallback((spline: Application) => {
    const obj = spline.findObjectByName("child");
    if (obj) {
      const wrapper = new Object3D() as SplineObjectWrapper;
      wrapper.splineObject = obj;
      childRef.current = wrapper;
      setIsLoaded(true);
    } else {
      console.error("Spline object 'child' not found");
    }
  }, []);

  useEffect(() => {
    return () => {
      if (childRef.current) {
        childRef.current.clear();
      }
    };
  }, []);

  return (
    <div id="model" className="w-full h-screen" aria-label="3D model container">
      <Spline
        scene="https://prod.spline.design/7CobhRJFJAnjKcN0/scene.splinecode"
        onLoad={onLoad}
      />
      {isLoaded && <GSAPComponent childRef={childRef} />}
    </div>
  );
}
