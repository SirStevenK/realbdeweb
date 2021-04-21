import { NextPage } from "next";
import { NextSeo } from "next-seo";
import MainDisplay from "@/components/MainDisplay/MainDisplay";
import { NavChoices } from "./index";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProtectedPage from "@/components/Admin/ProtectedPage";
import { AdministratorElementProps } from "@/types/utils";
import ValidateEmail from "@/lib/scripts/ValidateEmail";
import InputAdmin from "@/components/InputAdmin/InputAdmin";
import { Trash } from "@/components/icons";
import { useUser } from "@/hooks/UseUser";

const UserPage: NextPage = () => {
  const { user } = useUser();
  const [administrators, setAdministrators] = useState<
    AdministratorElementProps[]
  >([]);
  const [newAdminInput, setNewAdminInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const isEmailValid = useMemo(() => ValidateEmail(newAdminInput), [
    newAdminInput,
  ]);

  const getAdministrators = useCallback(() => {
    axios
      .get<AdministratorElementProps[]>("/api/administrator")
      .then(({ data }) => {
        setAdministrators(data);
      });
  }, []);

  const AddAdministrator = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isEmailValid) return;

      setLoading(true);

      axios
        .post("/api/administrator", { email: newAdminInput.toLowerCase() })
        .then(() => {
          setNewAdminInput("");
        })
        .catch(() => {
          setAlreadyExists(true);
        })
        .finally(() => {
          getAdministrators();
          setLoading(false);
        });
    },
    [getAdministrators, isEmailValid, newAdminInput]
  );

  const DeleteAdministrator = useCallback(
    async (admin: AdministratorElementProps) => {
      if (confirm(`Êtes-vous sûr de vouloir supprimer "${admin.email}"`)) {
        axios
          .delete("/api/administrator/" + admin._id)
          .catch(() => {
            alert("L'utilisateur n'a pas pu être supprimé");
          })
          .finally(() => {
            getAdministrators();
          });
      }
    },
    [getAdministrators]
  );

  useEffect(() => {
    getAdministrators();
  }, [getAdministrators]);

  useEffect(() => {
    setAlreadyExists(false);
  }, [newAdminInput]);

  return (
    <ProtectedPage>
      <NextSeo title="Admin - BDE EvryBody" noindex nofollow />
      <MainDisplay background="secondary" choices={NavChoices} hideSocialIcons>
        <div className="flex flex-col space-y-4 px-2 lg:px-8 xl:px-12">
          <h1 className="font-display font-bold text-2xl text-secondary uppercase text-center">
            Utilisateurs
          </h1>
          <form className="w-full p-2" onSubmit={AddAdministrator}>
            <h2 className="font-display font-bold text-xl text-secondary text-center">
              Ajouter un administrateur
            </h2>
            <InputAdmin
              disabled={!isEmailValid}
              loading={loading}
              onChange={setNewAdminInput}
              value={newAdminInput}
              placeholder="Adresse email"
              labelButton="Ajouter"
            />
            <span className="mt-2 block font-display text-center text-secondary">
              {alreadyExists
                ? "Un administrateur correspond déjà à cette adresse email"
                : ""}
            </span>
          </form>
          <h2 className="font-display font-bold text-xl text-secondary text-center">
            Liste des administrateurs
          </h2>
          <div className="flex flex-col items-center">
            {administrators.map((admin) => (
              <div key={admin.email} className="flex items-center">
                <span className="font-bold text-center">{admin.email}</span>
                <Trash
                  className="text-secondary ml-2 md:ml-4"
                  hidden={user?.email === admin.email}
                  onClick={() => DeleteAdministrator(admin)}
                />
              </div>
            ))}
          </div>
        </div>
      </MainDisplay>
    </ProtectedPage>
  );
};

export default UserPage;
