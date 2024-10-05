"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PetModelCreator() {
  const [images, setImages] = useState<string[]>([]);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [petName, setPetName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const router = useRouter();

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
        setImages((prevImages) => [...prevImages, imageDataUrl]);
      }
    }
  };

  const toggleCamera = async () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      await startCamera();
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
      }
    } catch (err) {
      console.error("Error accessing the camera", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
      setIsCameraOn(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const createModel = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // We'll use the first image for this example
      const imageUrl = images[0];

      const response = await fetch("https://api.meshy.ai/v1/image-to-3d", {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_API_KEY_HERE",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: imageUrl,
          enable_pbr: true,
          ai_model: "meshy-4", // Using meshy-4 for better quality
          topology: "quad",
          target_polycount: 30000, // Maximum for free users
        }),
      });

      const data = await response.json();
      if (data.result) {
        // Store the task ID
        const taskId = data.result;
        // Poll for task completion
        await pollTaskCompletion(taskId);
      } else {
        console.error("Error creating 3D model:", data.message);
      }
    } catch (error) {
      console.error("Error creating 3D model:", error);
    } finally {
      setLoading(false);
      // Navigate to the pet details page after model creation
      router.push(`/scene/${encodeURIComponent(petName)}`);
    }
  };

  const pollTaskCompletion = async (taskId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(
          `https://api.meshy.ai/v1/image-to-3d/${taskId}`,
          {
            headers: {
              Authorization: "Bearer YOUR_API_KEY_HERE",
            },
          }
        );

        const data = await response.json();
        if (data.status === "SUCCEEDED") {
          clearInterval(pollInterval);
          setModelUrl(data.model_urls.glb);
        } else if (data.status === "FAILED") {
          clearInterval(pollInterval);
          console.error("Task failed:", data.task_error.message);
        }
      } catch (error) {
        console.error("Error polling task:", error);
      }
    }, 5000); // Poll every 5 seconds
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create 3D Model of Your Pet</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={createModel} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pet-name">Pet Name</Label>
            <Input
              id="pet-name"
              placeholder="Enter your pet's name"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
          </div>
          <div className="flex space-x-2">
            <Button type="button" onClick={toggleCamera}>
              {isCameraOn ? "Stop Camera" : "Start Camera"}
            </Button>
            <Button type="button" onClick={captureImage} disabled={!isCameraOn}>
              Capture Image
            </Button>
          </div>
          <video
            ref={videoRef}
            width="640"
            height="480"
            autoPlay
            className="mx-auto"
            style={{ display: isCameraOn ? "block" : "none" }}
          ></video>
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{ display: "none" }}
          ></canvas>
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt={`Pet ${index + 1}`}
                  width={200}
                  height={150}
                  className="rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="submit"
            disabled={images.length === 0 || loading || !petName.trim()}
            className="w-full"
          >
            {loading ? "Creating 3D Model..." : "Create 3D Model"}
          </Button>
        </form>
        {modelUrl && (
          <div className="text-center mt-4">
            <h3 className="text-lg font-semibold mb-2">
              Your 3D Model of {petName} is Ready!
            </h3>
            <Button asChild>
              <a href={modelUrl} target="_blank" rel="noopener noreferrer">
                View 3D Model
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
