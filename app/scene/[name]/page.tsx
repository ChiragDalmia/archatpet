"use client";

import {useParams, useSearchParams } from "next/navigation";
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
    <main className="">
      <Suspense fallback={<div>Loading AR Scene...</div>}>
        <ARScene modelURL={modelUrl} petName={petName}/>
      </Suspense>
    </main>
  );
}
