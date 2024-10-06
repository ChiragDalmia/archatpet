"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const ARScene = dynamic(() => import("@/components/ARScene"), {
  ssr: false,
  loading: () => <p>Loading AR Scene...</p>,
});

export default function ScenePage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const encodedPetName = params.name as string;
  const encodedModelUrl = searchParams.get("modelUrl");

  if (!encodedModelUrl) {
    return <div>Error: No model URL provided</div>;
  }

  const petName = decodeURIComponent(encodedPetName);
  const modelUrl = decodeURIComponent(encodedModelUrl);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">AR Scene for {petName}</h1>
      <div className="mb-4 text-sm">
        <p className="font-bold mt-2">Model URL:</p>
        <p className="break-all">{modelUrl}</p>
      </div>
      <Suspense fallback={<div>Loading AR Scene...</div>}>
        <ARScene modelURL={modelUrl} petName={petName} />
      </Suspense>
    </main>
  );
}
