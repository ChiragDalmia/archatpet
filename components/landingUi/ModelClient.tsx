"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Spline from "@splinetool/react-spline";

const GSAPComponent = dynamic(() => import("./GSAPComponent"), { ssr: false });

const ModelClient: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const childRef = useRef<any>(null);

  const onLoad = useCallback((spline: any) => {
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
        onLoad={onLoad}
      />
      {isLoaded && <GSAPComponent childRef={childRef} />}
    </div>
  );
};

export default ModelClient;