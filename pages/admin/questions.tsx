import ProtectedPage from "@/components/Admin/ProtectedPage";
import Button from "@/components/Button/Button";
import { Plus, Save, Trash } from "@/components/icons";
import InputText from "@/components/InputText/InputText";
import MainDisplay from "@/components/MainDisplay/MainDisplay";
import SelectStyles from "@/components/Select/SelectStyle";
import TextArea from "@/components/TextArea/TextArea";
import { QuestionElementProps } from "@/types/utils";
import axios from "axios";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useCallback, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { NavChoices } from "./index";

const QuestionsPage: NextPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [listQuestions, setListQuestions] = useState<QuestionElementProps[]>(
    []
  );

  const [valueInputQuestion, setValueInputQuestion] = useState("");
  const [valueInputAnswer, setValueInputAnswer] = useState("");

  const question = useMemo<QuestionElementProps>(
    () => ({
      answer: valueInputAnswer,
      question: valueInputQuestion,
    }),
    [valueInputAnswer, valueInputQuestion]
  );

  const options = useMemo(() => {
    return [{ label: "+ Nouvelle Question", value: "" }].concat(
      listQuestions.map(({ _id, question }) => ({
        label: `${(_id as string).substring(0, 10)} - ${question}`,
        value: _id as string,
      }))
    );
  }, [listQuestions]);

  const resetSelectedQuestion = useCallback(() => setSelectedQuestion(""), []);

  const getQuestions = useCallback(
    () =>
      axios
        .get<QuestionElementProps[]>("/api/question")
        .then(({ data }) => setListQuestions(data)),
    []
  );

  const submitQuestion = useCallback(() => {
    const isValidQuestion =
      question.answer.length > 0 && question.question.length > 0;
    if (isValidQuestion) {
      if (selectedQuestion) {
        axios
          .put(`/api/question/${selectedQuestion}`, question)
          .then(resetSelectedQuestion)
          .then(getQuestions)
          .catch(() => "L'??lement n'a pas pu ??tre modifi??");
      } else {
        axios
          .post(`/api/question`, question)
          .then(resetSelectedQuestion)
          .then(getQuestions)
          .catch(() => "L'??lement n'a pas pu ??tre ajout??");
      }
    } else {
      alert("La question n'est pas valide");
    }
  }, [question, selectedQuestion, getQuestions, resetSelectedQuestion]);

  const deleteQuestion = useCallback(() => {
    if (selectedQuestion && confirm("Valider la suppression")) {
      axios
        .delete(`/api/question/${selectedQuestion}`)
        .catch(() => alert("L'??l??ment n'a pas pu ??tre supprim??"))
        .finally(resetSelectedQuestion)
        .finally(getQuestions);
    }
  }, [selectedQuestion, getQuestions, resetSelectedQuestion]);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  useEffect(() => {
    if (selectedQuestion === "") {
      setValueInputQuestion("");
      setValueInputAnswer("");
    } else {
      const { answer, question } = listQuestions.find(
        ({ _id }) => _id === selectedQuestion
      ) as QuestionElementProps;
      setValueInputQuestion(question);
      setValueInputAnswer(answer);
    }
  }, [listQuestions, selectedQuestion]);

  return (
    <ProtectedPage>
      <NextSeo title="Admin - BDE EvryBody" noindex nofollow />
      <MainDisplay background="secondary" choices={NavChoices} hideSocialIcons>
        <div className="flex flex-col space-y-4 px-2 lg:px-8 xl:px-12">
          <h1 className="font-display font-bold text-2xl text-secondary uppercase text-center">
            FAQ
          </h1>
          <form className="flex flex-col items-center space-y-3">
            <div
              className="space-y-3"
              style={{ maxWidth: "640px", width: "100%" }}
            >
              <h2 className="font-display font-bold text-xl text-secondary text-center">
                {`S??lection d'une question`}
              </h2>
              <Select
                options={options}
                value={options.find(({ value }) => value === selectedQuestion)}
                onChange={(question) =>
                  setSelectedQuestion(question?.value as string)
                }
                styles={SelectStyles}
              />
              <h2 className="font-display font-bold text-xl text-secondary text-center">
                {`${
                  selectedQuestion === "" ? "Cr??ation" : "Modification"
                } d'une question`}
              </h2>
              <InputText
                className="font-body"
                onChange={(e) => setValueInputQuestion(e.currentTarget.value)}
                placeholder="Question"
                value={valueInputQuestion}
                style={{ width: "100%" }}
              />
              <TextArea
                className="font-body"
                onChange={(e) => setValueInputAnswer(e.currentTarget.value)}
                placeholder="R??ponse"
                value={valueInputAnswer}
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex flex-col items-stretch space-y-2">
              <Button type="button" onClick={submitQuestion}>
                {selectedQuestion === "" ? "Ajouter" : "Modifier"}{" "}
                {selectedQuestion === "" ? <Plus /> : <Save />}
              </Button>
              <Button
                hidden={selectedQuestion === ""}
                type="button"
                color={"warning"}
                onClick={deleteQuestion}
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

export default QuestionsPage;
