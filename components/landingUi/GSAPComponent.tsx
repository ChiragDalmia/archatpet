"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface GSAPComponentProps {
  childRef: React.RefObject<any>;
}

const GSAPComponent: React.FC<GSAPComponentProps> = ({ childRef }) => {
  useGSAP(() => {
    if (!childRef.current) {
      console.error("Child ref is not set");
      return;
    }

    const timeline = gsap.timeline();

    // About section
    timeline
      .to(
        childRef.current.rotation,
        { x: -Math.PI / 14, z: Math.PI / 36 },
        "about"
      )
      .to(childRef.current.position, { x: -200, y: -400 }, "about")
      .to(childRef.current.scale, { x: 3, y: 3, z: 3 }, "about");

    // Sponsors section
    timeline
      .to(childRef.current.rotation, { x: 0, y: Math.PI / 4, z: 0 }, "sponsors")
      .to(childRef.current.position, { x: 400, y: -200, z: -500 }, "sponsors")
      .to(childRef.current.scale, { x: 2, y: 2, z: 2 }, "sponsors");

    // Join Discord section
    timeline
      .to(
        childRef.current.rotation,
        { x: Math.PI / 6, y: 0, z: -Math.PI / 8 },
        "joinDiscord"
      )
      .to(childRef.current.position, { x: -300, y: -300, z: 0 }, "joinDiscord")
      .to(childRef.current.scale, { x: 2.5, y: 2.5, z: 2.5 }, "joinDiscord");

    // FAQ section
    timeline
      .to(
        childRef.current.rotation,
        { x: 0, y: Math.PI / 2, z: Math.PI / 10 },
        "faq"
      )
      .to(childRef.current.position, { x: -200, y: -100, z: 200 }, "faq")
      .to(childRef.current.scale, { x: 1.5, y: 1.5, z: 1.5 }, "faq");

    // Location section
    timeline
      .to(
        childRef.current.rotation,
        { x: -Math.PI / 12, y: -Math.PI / 4, z: 0 },
        "location"
      )
      .to(childRef.current.position, { x: -100, y: -300, z: -100 }, "location")
      .to(childRef.current.scale, { x: 2, y: 2, z: 2 }, "location");

    // Footer section (reset to initial position)
    timeline
      .to(childRef.current.rotation, { x: 0, y: 0.3, z: 0 }, "footer")
      .to(childRef.current.position, { x: 0, y: -301.01, z: 0 }, "footer")
      .to(childRef.current.scale, { x: 1.99, y: 1.95, z: 1.68 }, "footer");

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
  }, []);

  return null;
};

export default GSAPComponent;
