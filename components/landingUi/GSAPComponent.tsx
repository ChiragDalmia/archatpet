"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ChildRefObject {
  rotation: { x: number; y: number; z: number };
  position: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
}

interface GSAPComponentProps {
  childRef: React.RefObject<ChildRefObject>;
}
const sections = [
  {
    name: "about",
    rotation: [-Math.PI / 14, 0, Math.PI / 36],
    position: [-500, -400, 0],
    scale: 3,
  },
  {
    name: "sponsors",
    rotation: [0, Math.PI / 4, 0],
    position: [500, -200, -500],
    scale: 2,
  },
  {
    name: "joinDiscord",
    rotation: [Math.PI / 6, 0, -Math.PI / 8],
    position: [-500, -300, 0],
    scale: 2.5,
  },
  {
    name: "faq",
    rotation: [0, 0, 0],
    position: [500, -100, 200],
    scale: 2,
  },
  {
    name: "location",
    rotation: [-Math.PI / 12, -Math.PI / 4, 0],
    position: [-400, -300, -100],
    scale: 2,
  },
  {
    name: "footer",
    rotation: [0, 0, 0],
    position: [0, -600, 0],
    scale: 1.99,
  },
];
const GSAPComponent: React.FC<GSAPComponentProps> = ({ childRef }) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!childRef.current) return;

    const timeline = gsap.timeline();
    timelineRef.current = timeline;

    const animateSection = (
      section: string,
      rotation: number[],
      position: number[],
      scale: number
    ) => {
      timeline
        .to(
          childRef.current!.rotation,
          { x: rotation[0], y: rotation[1], z: rotation[2] },
          section
        )
        .to(
          childRef.current!.position,
          { x: position[0], y: position[1], z: position[2] },
          section
        )
        .to(childRef.current!.scale, { x: scale, y: scale, z: scale }, section);
    };

    sections.forEach((section) =>
      animateSection(
        section.name,
        section.rotation,
        section.position,
        section.scale
      )
    );

    ScrollTrigger.create({
      animation: timeline,
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      markers: false,
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
