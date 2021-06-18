import LoggedIn from "@/components/Admin/LoggedIn";
import Login from "@/components/Admin/Login";
import MainDisplay from "@/components/MainDisplay/MainDisplay";
import { useUser } from "@/hooks/UseUser";
import { NavChoiceProps } from "@/types/utils";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

export const NavChoices: NavChoiceProps[] = [
  { type: "link", label: "Présentation", value: "/admin/introduction" },
  { type: "link", label: "Calendrier", value: "/admin/calendar" },
  { type: "link", label: "Anciens Étudiants", value: "/admin/testimonials" },
  { type: "link", label: "FAQ", value: "/admin/questions" },
  { type: "link", label: "Emails", value: "/admin/email" },
  {
    type: "link",
    label: "Utilisateurs",
    value: "/admin/users",
    displayBottom: true,
  },
  // { type: "scroll", label: "Sauvegardes", value: "saves", displayBottom: true },
  {
    type: "link",
    label: "Voir le site",
    value: "/",
    displayBottom: true,
  },
  {
    type: "function",
    label: "Déconnexion",
    value: "logout",
    displayBottom: true,
  },
];

const AdminPage: NextPage = () => {
  const { user } = useUser();

  return (
    <>
      <NextSeo title="Admin - BDE EvryBody" noindex nofollow />
      <MainDisplay
        background="secondary"
        choices={user ? NavChoices : [NavChoices[7]]}
        hideSocialIcons
      >
        <div className="absolute top-0 left-0 h-full w-full flex items-center">
          {user ? <LoggedIn /> : <Login />}
        </div>
      </MainDisplay>
    </>
  );
};

export default AdminPage;
