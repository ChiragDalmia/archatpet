import dynamic from "next/dynamic";

const ARScene = dynamic(() => import("@/components/ARScene"), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">ARChatPet</h1>
      <ARScene />
    </main>
  );
}
