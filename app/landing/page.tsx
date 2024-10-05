"use client";
import Cloud from "@/components/Cloud";
import Model from "@/components/Model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  return (
    <main className="">
      <Model />
      <header>
        <Cloud />
        <div className="flex justify-center flex-col items-center">
          Title
          <button
            type="button"
            className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-4 me-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              console.log("hello");
            }}
          >
            Get Started
          </button>
        </div>
      </header>
      <section className="sectionRight" id="about">
        <div className="flex justify-center flex-col items-center">
          <p>
            Immerse yourself in a lifelike, virtual experience that brings your
            pet to life, allowing you to engage in meaningful interactions and
            relive cherished moments. With cutting-edge technology, our platform
            recreates the unique personality and behaviour of your beloved
            companion, fostering a deep emotional connection that transcends
            time and distance. Experience the joy of playful conversations,
            heartfelt exchanges, and the warmth of shared memories, all within a
            stunningly realistic virtual environment that feels just like home.
          </p>
        </div>
      </section>
      <section className="sectionLeft" id="feature">
        <div className="flex justify-center flex-col items-center">
          Chat With Your Pet
          <p>
            Engage in lifelike conversations with your pet through our
            innovative platform, which leverages advanced AI technology to
            create dialogue. This feature allows you to keep their memory alive.
            by mimicking the unique personality and behaviour of your beloved
            companion. Whether it's sharing stories, asking questions, or simply
            enjoying their playfulness, you can cherish those heartfelt moments,
            ensuring that their presence remains an important part of your daily
            life.
          </p>
        </div>
      </section>
      <section className="sectionRight" id="feature2">
        <div className="flex justify-center flex-col items-center">
          Virtualize Cherished Ones
          <p>
            Preserve and relive the memories of your loved ones by creating
            beautifully rendered virtual representations that capture their
            essence and personality. Our platform offers a comforting way to
            maintain connections, allowing you to interact with lifelike avatars
            that reflect the joy and love you shared. Whether celebrating
            special occasions or simply enjoying cherished moments, this feature
            brings a sense of warmth and nostalgia, helping you honour the
            legacy of those who have touched your life.
          </p>
        </div>
      </section>
      <section className="sectionLeft" id="feature3">
        <div className="flex justify-center flex-col items-center">
          Relive Memories
          <p>
            Explore and view treasured moments with your pet through
            interactive, immersive 3D visualizations. This feature allows you to
            navigate through beautifully crafted environments that encapsulate
            the joy of your time together, whether it's a fun day at the park or
            a cozy evening at home. With the ability to engage with these
            immersive scenes, you can revisit those special occasions and
            experience the emotions attached to them, ensuring that the bond you
            shared continues to flourish.
          </p>
        </div>
      </section>
      <footer className="flex flex-col items-center justify-center">
        <p>Made with ❤️</p>
        <div className="flex space-x-4 mt-2">
          <a
            href="https://github.com/ChiragDalmia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} className="custom-icon" />
          </a>
          <a
            href="https://github.com/Ibrahim-Siddique"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} className="custom-icon" />
          </a>
          <a
            href="https://github.com/krishnacheemalapati"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} className="custom-icon" />
          </a>
          <a
            href="https://github.com/Edddro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} className="custom-icon" />
          </a>
        </div>
      </footer>
    </main>
  );
}
