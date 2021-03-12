import { NextPage } from "next";
import { NextSeo } from "next-seo";
import FAQ from "@/components/FAQ/FAQ";
import Agenda from "@/components/Agenda/Agenda";
import Contact from "@/components/Contact/Contact";
import Testimonial from "@/components/Testimonial/Testimonial";
import MainDisplay from "@/components/MainDisplay/MainDisplay";

const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo title="BDE EvryBody" description="La Home Page" />
      <MainDisplay>
        <div>
          <h1
            id="pres"
            className="font-display font-bold text-2xl text-primary text-center"
          >
            Présentation du BDE
          </h1>
          <p
            className="mx-auto font-body mt-4 px-2 text-center text-sm sm:text-base"
            style={{ maxWidth: "960px" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            egestas tincidunt mi, vel bibendum ante bibendum nec. Etiam ligula
            leo, dictum ac pretium suscipit, sollicitudin vel est. Ut et massa a
            justo accumsan eleifend. Aenean risus ante, mollis eu lectus quis,
            aliquet consectetur eros
          </p>
        </div>
        <div id="calendar">
          <h1 className="font-display font-bold text-2xl text-primary text-center">
            Calendrier
          </h1>
          <Agenda />
        </div>
        <div id="testimonial" className="flex flex-col items-center">
          <h1 className="font-display font-bold text-2xl text-primary text-center">
            Anciens Étudiants
          </h1>
          <div className="mt-6 mb-1 px-4">
            <Testimonial />
          </div>
        </div>
        <FAQ />
        <Contact />
      </MainDisplay>
    </>
  );
};

export default HomePage;
