"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { SPEObject } from "@splinetool/runtime";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPComponentProps {
  childRef: React.RefObject<SPEObject>;
}

export default function GSAPComponent({ childRef }: GSAPComponentProps) {
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
      childRef.current,
      {
        rotation: "-12.86deg, 0deg, 5deg",
        x: -200,
        y: -400,
        scale: 3,
        scrollTrigger: {
          trigger: "#about",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      },
      "about"
    );

    // Sponsors section
    tl.to(
      childRef.current,
      {
        rotation: "0deg, 45deg, 0deg",
        x: 400,
        y: -200,
        z: -500,
        scale: 2,
        scrollTrigger: {
          trigger: "#sponsors",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      },
      "feature"
    );

    // Join Discord section
    tl.to(
      childRef.current,
      {
        rotation: "30deg, 0deg, -22.5deg",
        x: -300,
        y: -300,
        z: 0,
        scale: 2.5,
        scrollTrigger: {
          trigger: "#join-discord",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      },
      "feature2"
    );

    // FAQ section
    tl.to(
      childRef.current,
      {
        rotation: "0deg, 90deg, 18deg",
        x: -200,
        y: -100,
        z: 200,
        scale: 1.5,
        scrollTrigger: {
          trigger: "#faq",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      },
      "feature3"
    );

    // Footer section (reset to initial position)
    tl.to(
      childRef.current,
      {
        rotation: "0deg, 17.19deg, 0deg",
        x: 0,
        y: -301.01,
        z: 0,
        scale: 1.99,
        scrollTrigger: {
          trigger: "#footer",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      },
      "footer"
    );

    return () => {
      tl.kill();
    };
  }, [childRef]);

  return null;
}
