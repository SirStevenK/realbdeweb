import { NextPage } from "next";
import { NextSeo } from "next-seo";
import MainDisplay from "@/components/MainDisplay/MainDisplay";
import { NavChoices } from "../index";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@/components/Button/Button";
import { EmailProps } from "@/types/utils";
import Select from "react-select";
import InputText from "@/components/InputText/InputText";
import SelectStyles from "@/components/Select/SelectStyle";
import axios from "axios";
import ProtectedPage from "@/components/Admin/ProtectedPage";
import { PaperPlane, Save, Trash } from "@/components/icons";
import { OutputData } from "@editorjs/editorjs";
import dynamic from "next/dynamic";

const NoSSREmailEditor = dynamic(
  () => import("@/components/EmailEditor/EmailEditor"),
  {
    ssr: false,
  }
);

const EmailPage: NextPage = () => {
  const [keyEmailEditor, setKeyEmailEditor] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [listEmails, setListEmails] = useState<EmailProps[]>([]);

  const [valueInputTitle, setValueInputTitle] = useState("");
  const [valueInputTo, setValueInputTo] = useState("");
  const [valueInputContent, setValueInputContent] = useState<OutputData>({
    blocks: [],
  });

  const email = useMemo<EmailProps>(
    () => ({
      title: valueInputTitle,
      to: valueInputTo,
      content: valueInputContent,
    }),
    [valueInputTitle, valueInputTo, valueInputContent]
  );

  const options = useMemo(() => {
    return [{ label: "+ Nouvel Email", value: "" }].concat(
      listEmails.map(({ _id, title }) => ({
        label: `${title}`,
        value: _id as string,
      }))
    );
  }, [listEmails]);

  const resetSelectedEmail = useCallback(() => {
    setKeyEmailEditor("--reset");
    setSelectedEmail("");
  }, []);

  const getEmails = useCallback(
    () =>
      axios
        .get<EmailProps[]>("/api/email")
        .then(({ data }) => setListEmails(data)),
    []
  );

  const saveEmail = useCallback(async () => {
    if (email.title.length === 0) {
      alert("L'email doit avoir un titre pour être sauvegardé");
      return "";
    } else {
      if (selectedEmail) {
        return await axios
          .put<string>(`/api/email/${selectedEmail}`, email)
          .then(getEmails)
          .then(() => selectedEmail)
          .catch(() => {
            alert("L'élement n'a pas pu être modifié");
            return "";
          });
      } else {
        let email_id: string;
        return await axios
          .post<string>(`/api/email`, email)
          .then((res) => (email_id = res.data))
          .then(getEmails)
          .then(() => setSelectedEmail(email_id))
          .then(() => email_id)
          .catch(() => {
            alert("L'élement n'a pas pu être ajouté");
            return "";
          });
      }
    }
  }, [email, selectedEmail, getEmails]);

  const submitEmail = useCallback(async () => {
    if (!confirm("Valider l'envoi")) return;
    const email_id = await saveEmail();

    if (!email_id) alert("L'email ne peut pas être envoyé");
    else {
      axios
        .post(`/api/email/${email_id}`)
        .then(() => alert("L'email a bien été envoyé"))
        .catch((err) => alert(err.response.data));
    }
  }, [saveEmail]);

  const deleteEmail = useCallback(() => {
    if (selectedEmail && confirm("Valider la suppression")) {
      axios
        .delete(`/api/email/${selectedEmail}`)
        .catch(() => alert("L'élément n'a pas pu être supprimé"))
        .finally(resetSelectedEmail)
        .finally(getEmails);
    }
  }, [selectedEmail, getEmails, resetSelectedEmail]);

  useEffect(() => {
    getEmails();
  }, [getEmails]);

  useEffect(() => {
    setKeyEmailEditor(selectedEmail);
  }, [selectedEmail, valueInputContent]);

  useEffect(() => {
    if (selectedEmail === "") {
      setValueInputTitle("");
      setValueInputTo("");
      setValueInputContent({ blocks: [] });
    } else {
      const { content, title, to } = listEmails.find(
        ({ _id }) => _id === selectedEmail
      ) as EmailProps;
      setValueInputTitle(title);
      setValueInputTo(to);
      setValueInputContent(content);
    }
  }, [listEmails, selectedEmail]);

  return (
    <ProtectedPage>
      <NextSeo title="Admin - BDE EvryBody" noindex nofollow />
      <MainDisplay background="secondary" choices={NavChoices} hideSocialIcons>
        <div className="flex flex-col space-y-4 px-2 lg:px-8 xl:px-12">
          <h1 className="font-display font-bold text-2xl text-secondary uppercase text-center">
            Emails
          </h1>
          <form className="flex flex-col items-center space-y-3">
            <div
              className="space-y-3"
              style={{ maxWidth: "640px", width: "100%" }}
            >
              <h2 className="font-display font-bold text-xl text-secondary text-center">
                {`Sélection d'un email`}
              </h2>
              <Select
                options={options}
                value={options.find(({ value }) => value === selectedEmail)}
                onChange={(email) => setSelectedEmail(email?.value as string)}
                styles={SelectStyles}
              />
              <h2 className="font-display font-bold text-xl text-secondary text-center">
                {`${
                  selectedEmail === "" ? "Création" : "Modification"
                } d'un email`}
              </h2>
              <InputText
                className="font-body"
                onChange={(e) => setValueInputTo(e.currentTarget.value)}
                placeholder="Cible de l'email"
                value={valueInputTo}
                style={{ width: "100%" }}
              />
              <InputText
                className="font-body"
                type="text"
                onChange={(e) => setValueInputTitle(e.currentTarget.value)}
                placeholder="Titre de l'email"
                value={valueInputTitle}
                style={{ width: "100%" }}
              />
              <NoSSREmailEditor
                key={keyEmailEditor}
                data={valueInputContent}
                onChange={setValueInputContent}
              />
            </div>
            <div className="flex flex-col items-stretch space-y-2">
              <Button type="button" color="success" onClick={submitEmail}>
                Envoyer
                <PaperPlane />
              </Button>
              <Button type="button" onClick={saveEmail}>
                {selectedEmail === "" ? "Enregistrer" : "Modifier"}
                <Save />
              </Button>
              <Button
                hidden={selectedEmail === ""}
                type="button"
                color={"warning"}
                onClick={deleteEmail}
              >
                Supprimer
                <Trash />
              </Button>
            </div>
          </form>
        </div>
      </MainDisplay>
    </ProtectedPage>
  );
};

export default EmailPage;
