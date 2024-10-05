import PetModelCreator from "@/components/pet-model-creator";
import dynamic from "next/dynamic";

const ARScene = dynamic(() => import("@/components/ARScene"), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PetModelCreator />
      <ARScene />
    </main>
  );
}
