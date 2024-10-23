"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define a type for the 3D object
interface ChildRefObject {
  rotation: { x: number; y: number; z: number };
  position: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
}

interface GSAPComponentProps {
  childRef: React.RefObject<ChildRefObject>;
}

const GSAPComponent: React.FC<GSAPComponentProps> = ({ childRef }) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!childRef.current) {
      console.error("Child ref is not set");
      return;
    }

    timelineRef.current = gsap.timeline();
    const timeline = timelineRef.current;

    // About section
    timeline
      .to(
        childRef.current.rotation,
        { x: -Math.PI / 14, z: Math.PI / 36 },
        "about"
      )
      .to(childRef.current.position, { x: -200, y: -400 }, "about")
      .to(childRef.current.scale, { x: 3, y: 3, z: 3 }, "about");

    // ... (rest of the animation code remains the same)

    // Set up ScrollTrigger for the entire timeline
    ScrollTrigger.create({
      animation: timeline,
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      markers: true,
      invalidateOnRefresh: true,
      pinSpacing: false,
      fastScrollEnd: true,
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [childRef]);

  return null;
};

export default GSAPComponent;
