import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { NavChoices } from "./index";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import Button from "@/components/Button/Button";
import MainDisplay from "@/components/MainDisplay/MainDisplay";
import { TestomonialElementProps } from "@/types/utils";
import InputText from "@/components/InputText/InputText";
import TextArea from "@/components/TextArea/TextArea";
import SelectStyles from "@/components/Select/SelectStyle";
import axios from "axios";
import ProtectedPage from "@/components/Admin/ProtectedPage";
import { Plus, Save, Trash } from "@/components/icons";
import Image from "@/components/Image/Image";
import ClientUploadFile from "@/lib/aws/ClientUploadFile";
import colors from "@/styles/colors.json";
import { FadeLoader } from "react-spinners";

const prefixImage = process.env.NEXT_PUBLIC_IMAGE_PREFIX as string;

const TestimonialsPage: NextPage = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState("");
  const [listTestimonials, setListTestimonials] = useState<
    TestomonialElementProps[]
  >([]);

  const [imageLoading, setImageLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [valueInputContent, setValueInputContent] = useState("");
  const [valueInputDescription, setValueInputDescription] = useState("");
  const [valueInputImage, setValueInputImage] = useState("");
  const [valueInputFirstName, setValueInputFirstName] = useState("");
  const [valueInputLastName, setValueInputLastName] = useState("");

  const testimonial = useMemo<TestomonialElementProps>(
    () => ({
      content: valueInputContent,
      description: valueInputDescription,
      image: valueInputImage,
      firstname: valueInputFirstName,
      lastname: valueInputLastName,
    }),
    [
      valueInputContent,
      valueInputDescription,
      valueInputImage,
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

  const uploadByFile = useCallback((file: File) => {
    setImageUploading(true);
    ClientUploadFile(file)
      .then(({ success, file }) => {
        if (success === 1 && file) {
          setValueInputImage(file.url.substring(prefixImage.length));
          setImageLoading(true);
        } else throw "err";
      })
      .catch(() => alert("L'image n'a pas pu être chargée"))
      .then(() => setImageUploading(false));
  }, []);

  useEffect(() => {
    getTestimonials();
  }, [getTestimonials]);

  useEffect(() => {
    if (selectedTestimonial === "") {
      setValueInputContent("");
      setValueInputDescription("");
      setValueInputImage("");
      setValueInputFirstName("");
      setValueInputLastName("");
    } else {
      const { content, description, image, firstname, lastname } =
        listTestimonials.find(
          ({ _id }) => _id === selectedTestimonial
        ) as TestomonialElementProps;
      setValueInputContent(content);
      setValueInputDescription(description);
      setValueInputImage(image);
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
              <div className="flex items-center space-x-4 justify-center">
                <FadeLoader
                  color={colors.secondary}
                  loading={imageLoading}
                  css="height: 64px; width: 64px;"
                />
                <Image
                  className="rounded-full overflow-hidden"
                  src={valueInputImage}
                  height={64}
                  width={64}
                  hidden={valueInputImage.length === 0 || imageLoading}
                  onLoad={() => setImageLoading(false)}
                />
                <div className="flex space-x-4">
                  <div>
                    <label
                      htmlFor="imagefile"
                      className="block bg-primary text-light py-3 px-4 cursor-pointer font-body font-bold rounded-lg shadow-TESTIMONIAL-PIC select-none"
                    >
                      {valueInputImage
                        ? "Changer l'image"
                        : "Choisir une image"}
                    </label>
                    <input
                      type="file"
                      id="imagefile"
                      className="opacity-0 absolute"
                      disabled={imageUploading}
                      value=""
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files) uploadByFile(e.target.files[0]);
                      }}
                      style={{ zIndex: -1 }}
                    />
                  </div>
                  <input
                    className="bg-warning text-light py-3 px-4 cursor-pointer font-body font-bold rounded-lg shadow-TESTIMONIAL-PIC select-none"
                    type="button"
                    hidden={!valueInputImage}
                    value="Enlever l'image"
                    onClick={() => setValueInputImage("")}
                  />
                </div>
              </div>
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
