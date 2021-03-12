import NavSide from "@/components/NavSide/NavSide";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/dist/client/router";
import FAQ from "@/components/FAQ/FAQ";
import Agenda from "@/components/Agenda/Agenda";

const HomePage: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <NextSeo title="BDE EvryBody" description="La Home Page" />
      <div className="flex">
        <NavSide />
        <div className="bg-white mt-8 flex-1 rounded-tl-lg shadow-MAIN py-6 px-10 z-10 space-y-6">
          <div className="justify-between items-center">
            <h1 className="font-display font-bold text-3xl text-primary text-center">
              Présentation du BDE
            </h1>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              egestas tincidunt mi, vel bibendum ante bibendum nec. Etiam ligula
              leo, dictum ac pretium suscipit, sollicitudin vel est. Ut et massa
              a justo accumsan eleifend. Aenean risus ante, mollis eu lectus
              quis, aliquet consectetur eros
            </p>
          </div>
          <div className="justify-between items-center">
            <h1 className="font-display font-bold text-3xl text-primary text-center">
              Membres
            </h1>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              egestas tincidunt mi, vel bibendum ante bibendum nec. Etiam ligula
              leo, dictum ac pretium suscipit, sollicitudin vel est. Ut et massa
              a justo accumsan eleifend. Aenean risus ante, mollis eu lectus
              quis, aliquet consectetur eros
            </p>
          </div>
          <div className="justify-between items-center">
            <h1 className="font-display font-bold text-3xl text-primary text-center">
              Calendrier
            </h1>
            <Agenda />
          </div>
          <div className="justify-between items-center">
            <h1 className="font-display font-bold text-3xl text-primary text-center">
              Anciens Étudiants
            </h1>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              egestas tincidunt mi, vel bibendum ante bibendum nec. Etiam ligula
              leo, dictum ac pretium suscipit, sollicitudin vel est. Ut et massa
              a justo accumsan eleifend. Aenean risus ante, mollis eu lectus
              quis, aliquet consectetur eros
            </p>
          </div>
          <FAQ />
          <div className="justify-between items-center">
            <h1 className="font-display font-bold text-3xl text-primary text-center">
              Contact
            </h1>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              egestas tincidunt mi, vel bibendum ante bibendum nec. Etiam ligula
              leo, dictum ac pretium suscipit, sollicitudin vel est. Ut et massa
              a justo accumsan eleifend. Aenean risus ante, mollis eu lectus
              quis, aliquet consectetur eros
            </p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              egestas tincidunt mi, vel bibendum ante bibendum nec. Etiam ligula
              leo, dictum ac pretium suscipit, sollicitudin vel est. Ut et massa
              a justo accumsan eleifend. Aenean risus ante, mollis eu lectus
              quis, aliquet consectetur eros
            </p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              egestas tincidunt mi, vel bibendum ante bibendum nec. Etiam ligula
              leo, dictum ac pretium suscipit, sollicitudin vel est. Ut et massa
              a justo accumsan eleifend. Aenean risus ante, mollis eu lectus
              quis, aliquet consectetur eros
            </p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              egestas tincidunt mi, vel bibendum ante bibendum nec. Etiam ligula
              leo, dictum ac pretium suscipit, sollicitudin vel est. Ut et massa
              a justo accumsan eleifend. Aenean risus ante, mollis eu lectus
              quis, aliquet consectetur eros
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
