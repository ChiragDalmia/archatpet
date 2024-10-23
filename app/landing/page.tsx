
import Cloud from "@/components/landingUi/Cloud";
import Model from "@/components/landingUi/Model";
import SmoothScrolling from "@/components/landingUi/SmoothScrolling";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <SmoothScrolling>
      <main className="">
        <Model />
        <header className="w-full h-[100svh] flex justify-center items-center text-center text-8xl relative">
          <Cloud />
          <div className=" z-10">
            <h1 className="text-3d text-white text-transparent bg-clip-text  ">
              PORTAPET
            </h1>
            <Link href="/">
              <Button className=" text-white font-bold p-6 text-2xl rounded-full">
                Get Started
              </Button>
            </Link>
          </div>
        </header>
        <div className="container">
          <section
            className="w-full h-[100svh] flex justify-center text-center text-8xl relative z-[1] md:justify-end md:px-6"
            id="about"
          >
            What is it?
          </section>
          <section
            className="w-full h-[100svh] flex justify-center text-center text-8xl relative md:justify-start md:px-6"
            id="sponsors"
          >
            Why portapet
          </section>
          <section
            className="w-full h-[100svh] flex justify-center text-center text-8xl relative md:justify-end md:px-6"
            id="joinDiscord"
          >
            How to use it
          </section>
          <section
            className="w-full h-[100svh] flex justify-center text-center text-8xl relative md:justify-start md:px-6"
            id="faq"
          >
            How we made it
          </section>
          <section
            className="w-full h-[100svh] flex justify-center text-center text-8xl relative md:justify-end md:px-6"
            id="location"
          >
            Faq
          </section>
        </div>
        <footer className="w-full h-[100svh] flex flex-col justify-center text-center text-8xl relative">
          Socials
          <div className="flex flex-col text-3xl ">

          <a
            href="https://github.com/ChiragDalmia"
            target="_blank"
            rel="noopener noreferrer"
          >
            icon
          </a>
          <a
            href="https://github.com/Ibrahim-Siddique"
            target="_blank"
            rel="noopener noreferrer"
          >
            icon
          </a>
          <a
            href="https://github.com/krishnacheemalapati"
            target="_blank"
            rel="noopener noreferrer"
          >
            icon
          </a>
          <a
            href="https://github.com/Edddro"
            target="_blank"
            rel="noopener noreferrer"
          >
            Icon
          </a>
          </div>
        </footer>
      </main>
    </SmoothScrolling>
  );
}
