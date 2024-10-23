import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";
import Cloud from "@/components/landingUi/Cloud";
import Model from "@/components/landingUi/Model";
import SmoothScrolling from "@/components/landingUi/SmoothScrolling";

interface SectionProps {
  id: string;
  title: string;
  description: string;
  align?: "left" | "center" | "right";
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  description,
  align = "center",
}) => (
  <section
    id={id}
    className={`w-full min-h-screen flex flex-col justify-center ${
      align === "left"
        ? "items-start"
        : align === "right"
        ? "items-end"
        : "items-center"
    } p-6 space-y-4`}
  >
    <div className={`max-w-2xl ${align === "center" ? "text-center" : ""}`}>
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-3d text-white text-transparent bg-clip-text">
        {title}
      </h2>
      <p className="text-xl md:text-2xl text-sky-700 mt-4 font-semibold">
        {description}
      </p>
    </div>
  </section>
);

interface SocialLinkProps {
  href: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-primary transition-colors"
    aria-label={label}
  >
    <Github size={24} />
  </a>
);

export default function Home() {
  return (
    <SmoothScrolling>
      <main className="bg-background text-foreground relative">
        <div className="fixed inset-0 z-0">
          <Cloud />
          <Model />
        </div>
        <div className="relative z-10">
          <header className="w-full h-screen flex flex-col justify-center items-center text-center">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-3d text-white text-transparent bg-clip-text">
                PORTAPET
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                Bringing your pets to life through immersive technology, keeping
                your bond strong no matter the distance.
              </p>
              <Link href="/app">
                <Button className="text-white font-bold px-8 py-6 text-xl rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </header>

          <div className="container mx-auto">
            <Section
              id="about"
              title="What is it?"
              description="PortaPet is an innovative platform that uses AI and 3D visualization to let you interact with virtual representations of your pets. Upload an image of your pet, and we'll bring them to life in augmented reality."
              align="right"
            />
            <Section
              id="features"
              title="Key Features"
              description="Engage in AI-driven conversations with your pet, visualize cherished memories through immersive 3D renderings, and maintain an emotional connection even when you're apart or dealing with loss."
              align="left"
            />
            <Section
              id="howto"
              title="How to use it"
              description="Simply upload an image of your pet, and our AI will create a 3D model. Interact using voice commands - just say your pet's name to start a conversation. Experience your pet in augmented reality on any device."
              align="right"
            />
            <Section
              id="technology"
              title="How we made it"
              description="We built PortaPet using Next.js, TypeScript, Three.js, and WebXR for the frontend. The backend utilizes Vercel Blob for storage, MeshyAPI for 3D rendering, CloudFlare AI for conversations, and ElevenLabs for voice synthesis."
              align="left"
            />
            <Section
              id="future"
              title="What's Next"
              description="We're working on importing multiple pets into one world, creating a memory system for re-experiencing events with your pet, and integrating haptic feedback for an even stronger connection."
              align="right"
            />
          </div>

          <footer className="w-full min-h-screen flex flex-col justify-center items-center text-center space-y-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-3d text-white text-transparent bg-clip-text">
              Connect With Us
            </h2>
            <div className="flex space-x-6">
              <SocialLink
                href="https://github.com/ChiragDalmia"
                label="Chirag Dalmia's GitHub"
              />
              <SocialLink
                href="https://github.com/Ibrahim-Siddique"
                label="Ibrahim Siddique's GitHub"
              />
              <SocialLink
                href="https://github.com/krishnacheemalapati"
                label="Krishna Cheemalapati's GitHub"
              />
              <SocialLink
                href="https://github.com/Edddro"
                label="Edddro's GitHub"
              />
            </div>
          </footer>
        </div>
      </main>
    </SmoothScrolling>
  );
}
