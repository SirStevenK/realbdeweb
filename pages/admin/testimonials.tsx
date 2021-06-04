import { NextPage } from "next";
import { NextSeo } from "next-seo";
import MainDisplay from "@/components/MainDisplay/MainDisplay";
import { NavChoices } from "./index";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@/components/Button/Button";
import { TestomonialElementProps } from "@/types/utils";
import Select from "react-select";
import InputText from "@/components/InputText/InputText";
import TextArea from "@/components/TextArea/TextArea";
import SelectStyles from "@/components/Select/SelectStyle";
import axios from "axios";
import ProtectedPage from "@/components/Admin/ProtectedPage";
import { Plus, Save, Trash } from "@/components/icons";

const TestimonialsPage: NextPage = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState("");
  const [listTestimonials, setListTestimonials] = useState<
    TestomonialElementProps[]
  >([]);

  const [valueInputContent, setValueInputContent] = useState("");
  const [valueInputDescription, setValueInputDescription] = useState("");
  const [valueInputFirstName, setValueInputFirstName] = useState("");
  const [valueInputLastName, setValueInputLastName] = useState("");

  const testimonial = useMemo<TestomonialElementProps>(
    () => ({
      content: valueInputContent,
      description: valueInputDescription,
      firstname: valueInputFirstName,
      lastname: valueInputLastName,
    }),
    [
      valueInputContent,
      valueInputDescription,
      valueInputFirstName,
      valueInputLastName,
    ]
  );

  const options = useMemo(() => {
    return [{ label: "+ Nouveau Témoignage", value: "" }].concat(
      listTestimonials.map(({ _id, firstname, lastname, description }) => ({
        label: `${firstname} ${lastname} - ${description}`,
        value: _id as string,
      }))
    );
  }, [listTestimonials]);

  const resetSelectedTestimonial = useCallback(
    () => setSelectedTestimonial(""),
    []
  );

  const getTestimonials = useCallback(
    () =>
      axios
        .get<TestomonialElementProps[]>("/api/testimonial")
        .then(({ data }) => setListTestimonials(data)),
    []
  );

  const submitTestimonial = useCallback(() => {
    const isValidTestimonial =
      testimonial.content.length > 0 &&
      testimonial.description.length > 0 &&
      testimonial.firstname.length > 0 &&
      testimonial.lastname.length > 0;

    if (isValidTestimonial) {
      if (selectedTestimonial) {
        axios
          .put(`/api/testimonial/${selectedTestimonial}`, testimonial)
          .then(resetSelectedTestimonial)
          .then(getTestimonials)
          .catch(() => "L'élement n'a pas pu être modifié");
      } else {
        axios
          .post(`/api/testimonial`, testimonial)
          .then(resetSelectedTestimonial)
          .then(getTestimonials)
          .catch(() => "L'élement n'a pas pu être ajouté");
      }
    } else {
      alert("Le témoignage n'est pas valide");
    }
  }, [
    testimonial,
    selectedTestimonial,
    getTestimonials,
    resetSelectedTestimonial,
  ]);

  const deleteTestimonial = useCallback(() => {
    if (selectedTestimonial && confirm("Valider la suppression")) {
      axios
        .delete(`/api/testimonial/${selectedTestimonial}`)
        .catch(() => alert("L'élément n'a pas pu être supprimé"))
        .finally(resetSelectedTestimonial)
        .finally(getTestimonials);
    }
  }, [selectedTestimonial, getTestimonials, resetSelectedTestimonial]);

  useEffect(() => {
    getTestimonials();
  }, [getTestimonials]);

  useEffect(() => {
    if (selectedTestimonial === "") {
      setValueInputContent("");
      setValueInputDescription("");
      setValueInputFirstName("");
      setValueInputLastName("");
    } else {
      const { content, description, firstname, lastname } =
        listTestimonials.find(
          ({ _id }) => _id === selectedTestimonial
        ) as TestomonialElementProps;
      setValueInputContent(content);
      setValueInputDescription(description);
      setValueInputFirstName(firstname);
      setValueInputLastName(lastname);
    }
  }, [listTestimonials, selectedTestimonial]);

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
                {`Sélection d'un témoignage`}
              </h2>
              <Select
                options={options}
                value={options.find(
                  ({ value }) => value === selectedTestimonial
                )}
                onChange={(testimonial) =>
                  setSelectedTestimonial(testimonial?.value as string)
                }
                styles={SelectStyles}
              />
              <h2 className="font-display font-bold text-xl text-secondary text-center">
                {`${
                  selectedTestimonial === "" ? "Création" : "Modification"
                } d'un témoignage`}
              </h2>
              <div className="flex space-x-4">
                <InputText
                  type="text"
                  className="w-full font-bold text-center"
                  placeholder="Prénom"
                  onChange={(e) =>
                    setValueInputFirstName(e.currentTarget.value)
                  }
                  value={valueInputFirstName}
                />
                <InputText
                  type="text"
                  className="w-full font-bold text-center"
                  placeholder="Nom de famille"
                  onChange={(e) => setValueInputLastName(e.currentTarget.value)}
                  value={valueInputLastName}
                />
              </div>
              <InputText
                className="font-body"
                onChange={(e) =>
                  setValueInputDescription(e.currentTarget.value)
                }
                placeholder="Description"
                value={valueInputDescription}
                style={{ width: "100%" }}
              />
              <TextArea
                className="font-body"
                onChange={(e) => setValueInputContent(e.currentTarget.value)}
                placeholder="Contenu du témoignage"
                value={valueInputContent}
                style={{ width: "100%" }}
              />
            </div>
            <div className="flex flex-col items-stretch space-y-2">
              <Button type="button" onClick={submitTestimonial}>
                {selectedTestimonial === "" ? "Ajouter" : "Modifier"}{" "}
                {selectedTestimonial === "" ? <Plus /> : <Save />}
              </Button>
              <Button
                hidden={selectedTestimonial === ""}
                type="button"
                color={"warning"}
                onClick={deleteTestimonial}
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

export default TestimonialsPage;
