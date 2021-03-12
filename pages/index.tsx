import NavSide from "@/components/NavSide/NavSide";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import FAQ from "@/components/FAQ/FAQ";
import Agenda from "@/components/Agenda/Agenda";
import Contact from "@/components/Contact/Contact";
import Declaration from "@/components/Declaration/Declaration";

const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo title="BDE EvryBody" description="La Home Page" />
      <div className="flex">
        <NavSide />
        <div className="bg-white mt-8 flex-1 rounded-tl-lg shadow-MAIN py-6 px-10 z-10 space-y-6">
          <div>
            <h1 className="font-display font-bold text-2xl text-primary text-center">
              Présentation du BDE
            </h1>
            <p className="mt-4 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              egestas tincidunt mi, vel bibendum ante bibendum nec. Etiam ligula
              leo, dictum ac pretium suscipit, sollicitudin vel est. Ut et massa
              a justo accumsan eleifend. Aenean risus ante, mollis eu lectus
              quis
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              egestas tincidunt mi, vel bibendum ante bibendum nec. Etiam ligula
              leo, dictum ac pretium suscipit, sollicitudin vel est. Ut et massa
              a justo accumsan eleifend. Aenean risus ante, mollis eu lectus
              quis
            </p>
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-primary text-center">
              Calendrier
            </h1>
            <Agenda />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-display font-bold text-2xl text-primary text-center">
              Anciens Étudiants
            </h1>
            <div className="mt-4">
              <Declaration />
            </div>
          </div>
          <FAQ />
          <Contact />
        </div>
      </div>
    </>
  );
};

export default HomePage;
