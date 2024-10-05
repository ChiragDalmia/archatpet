"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { PutBlobResult } from "@vercel/blob";

interface ModelData {
  status: string;
  model_urls?: {
    glb: string;
  };
  task_error?: {
    message: string;
  };
}

export default function PetModelCreator() {
  const [images, setImages] = useState<PutBlobResult[]>([]);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [petName, setPetName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const router = useRouter();

  const captureImage = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const blob = await new Promise<Blob>((resolve) =>
          canvasRef.current!.toBlob(resolve as BlobCallback, "image/jpeg")
        );
        await uploadImage(blob, `captured-image-${Date.now()}.jpg`);
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

  const uploadImage = async (file: File | Blob, fileName: string) => {
    try {
      const response = await fetch(`/api/upload?filename=${fileName}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;
      setImages((prevImages) => [...prevImages, newBlob]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        await uploadImage(files[i], files[i].name);
      }
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
const createModel = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    const imageUrl = images[0].url;
    const response = await fetch("/api/create-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await response.json();
    if (data.result) {
      const modelData = await pollTaskCompletion(data.result);
      if (modelData && modelData.model_urls && modelData.model_urls.glb) {
        setModelUrl(modelData.model_urls.glb);
        router.push(
          `/scene/${encodeURIComponent(petName)}?modelUrl=${encodeURIComponent(
            modelData.model_urls.glb
          )}`
        );
      } else {
        console.error("Model URL not found in the response");
      }
    } else {
      console.error("Error creating 3D model:", data.message);
    }
  } catch (error) {
    console.error("Error creating 3D model:", error);
  } finally {
    setLoading(false);
  }
};
  const pollTaskCompletion = async (taskId: string): Promise<ModelData> => {
    return new Promise((resolve, reject) => {
      const pollInterval = setInterval(async () => {
        try {
          const response = await fetch(`/api/create-model?taskId=${taskId}`);
          const data = (await response.json()) as ModelData;
          if (data.status === "SUCCEEDED") {
            clearInterval(pollInterval);
            resolve(data);
          } else if (data.status === "FAILED") {
            clearInterval(pollInterval);
            reject(new Error(data.task_error?.message || "Task failed"));
          }
        } catch (error) {
          console.error("Error polling task:", error);
          clearInterval(pollInterval);
          reject(error);
        }
      }, 5000);
    });
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
                  src={image.url}
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
