import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import MainDisplay from "@/components/MainDisplay/MainDisplay";
import { NavChoices } from "./index";
import db from "@/lib/lowdb/DB_Website";
import TextArea from "@/components/TextArea/TextArea";
import { useState } from "react";
import Button from "@/components/Button/Button";

type Props = {
  currentValue: string;
};

const IntroductionPage: NextPage<Props> = ({ currentValue }) => {
  const [newValue, setNewValue] = useState(currentValue);
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
              value={newValue}
              onChange={(e) => setNewValue(e.currentTarget.value)}
            />
            <Button>
              Sauvegarder <i className="fas fa-save icon" aria-hidden />
            </Button>
          </form>
        </div>
      </MainDisplay>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      currentValue: db.getIntroduction(),
    },
  };
};

export default IntroductionPage;
