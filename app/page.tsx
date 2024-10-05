import PetModelCreator from "@/components/pet-model-creator";
<<<<<<< HEAD
=======
import dynamic from "next/dynamic";

const ARScene = dynamic(() => import("@/components/ARScene"), { ssr: false });
>>>>>>> a3e4e21 (Update audiomanager)

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
      <PetModelCreator />
<<<<<<< HEAD
     
      {/* <RecordAudio characterName="John" /> */}
=======
      <ARScene />
>>>>>>> a3e4e21 (Update audiomanager)
    </main>
  );
}
