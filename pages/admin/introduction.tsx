import { NextPage } from "next";
import { NextSeo } from "next-seo";
import MainDisplay from "@/components/MainDisplay/MainDisplay";
import { NavChoices } from "./index";
import TextArea from "@/components/TextArea/TextArea";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import axios from "axios";

const IntroductionPage: NextPage = () => {
  const [currentValue, setCurrentValue] = useState("");
  const [inputContent, setInputContent] = useState("");

  const getIntroduction = useCallback(() => {
    axios.get<string>("/api/introduction").then(({ data }) => {
      setCurrentValue(data);
      setInputContent(data);
    });
  }, []);

  const submitIntroduction = useCallback(() => {
    axios
      .post("/api/introduction", { content: inputContent })
      .then(getIntroduction)
      .catch(() => alert("La mise à jour a échoué"));
  }, [inputContent, getIntroduction]);

  useEffect(() => {
    getIntroduction();
  }, [getIntroduction]);

  return (
    <>
      <NextSeo title="Admin - BDE EvryBody" noindex nofollow />
      <MainDisplay background="secondary" choices={NavChoices} hideSocialIcons>
        <div className="flex flex-col space-y-4 px-2 lg:px-8 xl:px-12">
          <h1 className="font-display font-bold text-2xl text-secondary uppercase text-center">
            Présentation du BDE
          </h1>
          <h2 className="font-display font-bold text-xl text-secondary text-center">
            Texte Actuel
          </h2>
          <p className="font-body">{currentValue}</p>
          <h2 className="font-display font-bold text-xl text-secondary text-center">
            Nouveau Texte
          </h2>
          <form className="flex flex-col items-center space-y-3">
            <TextArea
              className="w-full"
              value={inputContent}
              onChange={(e) => setInputContent(e.currentTarget.value)}
            />
            <Button type="button" onClick={submitIntroduction}>
              Sauvegarder <i className="fas fa-save icon" aria-hidden />
            </Button>
          </form>
        </div>
      </MainDisplay>
    </>
  );
};

export default IntroductionPage;
