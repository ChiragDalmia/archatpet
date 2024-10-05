import dynamic from "next/dynamic";

// const ARScene = dynamic(() => import("@/components/ARScene"), { ssr: false });
const RecordAudio = dynamic(() => import("@/components/RecordAudio"), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <ARScene /> */}
      <RecordAudio characterName="John" />
    </main>
  );
}
