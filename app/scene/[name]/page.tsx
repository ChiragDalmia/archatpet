"use client"

import { useParams, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import dynamic from "next/dynamic"

const ARScene = dynamic(() => import("@/components/ARScene"), {
  ssr: false,
  loading: () => <p>Loading AR Scene...</p>,
})

export default function ScenePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const petName = params.name as string
  const modelUrl = searchParams.get("modelUrl")

  if (!modelUrl) {
    return <div>Error: No model URL provided</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">AR Scene for {petName}</h1>
      <Suspense fallback={<div>Loading AR Scene...</div>}>
        <ARScene />
      </Suspense>
    </main>
  )
}