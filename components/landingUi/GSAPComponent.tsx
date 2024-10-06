"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three"
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPComponentProps {
  childRef: React.RefObject<THREE.Object3D>;
}

const GSAPComponent: React.FC<GSAPComponentProps> = ({ childRef }) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!childRef.current) {
      console.error("Child ref is not set");
      return;
    }

    timelineRef.current = gsap.timeline();
    const tl = timelineRef.current;

    // About section
    tl.to(
      childRef.current.rotation,
      { x: -Math.PI / 14, z: Math.PI / 36 },
      "about"
    )
      .to(childRef.current.position, { x: -200, y: -400 }, "about")
      .to(childRef.current.scale, { x: 3, y: 3, z: 3 }, "about");

    // Sponsors section
    tl.to(childRef.current.rotation, { x: 0, y: Math.PI / 4, z: 0 }, "feature")
      .to(childRef.current.position, { x: 400, y: -200, z: -500 }, "feature")
      .to(childRef.current.scale, { x: 2, y: 2, z: 2 }, "feature");

    // Join Discord section
    tl.to(
      childRef.current.rotation,
      { x: Math.PI / 6, y: 0, z: -Math.PI / 8 },
      "feature2"
    )
      .to(childRef.current.position, { x: -300, y: -300, z: 0 }, "feature2")
      .to(childRef.current.scale, { x: 2.5, y: 2.5, z: 2.5 }, "feature2");

    // FAQ section
    tl.to(
      childRef.current.rotation,
      { x: 0, y: Math.PI / 2, z: Math.PI / 10 },
      "feature3"
    )
      .to(childRef.current.position, { x: -200, y: -100, z: 200 }, "feature3")
      .to(childRef.current.scale, { x: 1.5, y: 1.5, z: 1.5 }, "feature3");

    // Footer section (reset to initial position)
    tl.to(childRef.current.rotation, { x: 0, y: 0.3, z: 0 }, "footer")
      .to(childRef.current.position, { x: 0, y: -301.01, z: 0 }, "footer")
      .to(childRef.current.scale, { x: 1.99, y: 1.95, z: 1.68 }, "footer");

    // Set up ScrollTrigger for the entire timeline
    ScrollTrigger.create({
      animation: tl,
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      invalidateOnRefresh: true,
      pinSpacing: false,
      fastScrollEnd: true,
    });
  }, [childRef]);

  return null;
};

export default GSAPComponent;
