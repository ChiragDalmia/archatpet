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
            pet to life.
          </p>
        </div>
      </section>
      <section className="sectionLeft" id="feature">
        <div className="flex justify-center flex-col items-center">
          Chat With Your Pet
          <p>
            Engage in lifelike conversations with your pet, keeping their memory
            alive through interactive, AI-driven dialogue.
          </p>
        </div>
      </section>
      <section className="sectionRight" id="feature2">
        <div className="flex justify-center flex-col items-center">
          Virtualize Cherished Ones
          <p>
            Preserve and relive memories by creating virtual creations of loved
            ones, offering comfort and connection.
          </p>
        </div>
      </section>
      <section className="sectionLeft" id="feature3">
        <div className="flex justify-center flex-col items-center">
          Relive Memories
          <p>
            Explore and view treasured moments with your pet through
            interactive, immersive 3D visualizations.
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
