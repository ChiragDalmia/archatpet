
import Cloud from "@/components/landingUi/Cloud";
import Model from "@/components/landingUi/Model";
import SmoothScrolling from "@/components/landingUi/SmoothScrolling";

export default function Home() {
  return (
    <SmoothScrolling>
      <main className="">
        <Model />
        <header>
          <Cloud />
          <div className=" z-10">
            <h1 className="text-3d text-white text-transparent bg-clip-text  ">
              PORTAPET
            </h1>
          </div>
        </header>
        <section className="sectionRight" id="about">
          About
        </section>
        <section className="sectionLeft" id="sponsors">
          Sponsors & Partners
        </section>
        <section className="sectionRight" id="joinDiscord">
          Join Discord
        </section>
        <section className="sectionLeft" id="faq">
          FAQ
        </section>
        <section className="sectionRight" id="location">
          Location
        </section>
        <footer>Footer</footer>
      </main>
    </SmoothScrolling>
  );
}
