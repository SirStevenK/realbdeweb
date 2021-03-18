import { NextPage } from "next";
import { NextSeo } from "next-seo";
import MainDisplay from "@/components/MainDisplay/MainDisplay";
import { NavChoiceProps } from "@/types/utils";

export const NavChoices: NavChoiceProps[] = [
  { type: "link", label: "Présentation", value: "/admin/introduction" },
  { type: "link", label: "Calendrier", value: "/admin/calendar" },
  { type: "link", label: "Anciens Étudiants", value: "/admin/testimonials" },
  { type: "link", label: "FAQ", value: "/admin/questions" },
  { type: "scroll", label: "Sauvegardes", value: "saves", displayBottom: true },
  {
    type: "link",
    label: "Voir le site",
    value: "/",
    displayBottom: true,
  },
  {
    type: "scroll",
    label: "Déconnexion",
    value: "faq",
    displayBottom: true,
  },
];

const AdminPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Admin - BDE EvryBody" noindex nofollow />
      <MainDisplay background="secondary" choices={NavChoices} hideSocialIcons>
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
          <h1 className="font-display font-bold text-2xl text-secondary uppercase text-center">
            Partie Admin
          </h1>
        </div>
      </MainDisplay>
    </>
  );
};

export default AdminPage;
