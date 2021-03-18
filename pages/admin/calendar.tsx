import { NextPage } from "next";
import { NextSeo } from "next-seo";
import MainDisplay from "@/components/MainDisplay/MainDisplay";
import { NavChoices } from "./index";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@/components/Button/Button";
import { CalendarElementProps } from "@/types/utils";
import Select from "react-select";
import InputText from "@/components/InputText/InputText";
import SelectStyles from "@/components/Select/SelectStyle";
import axios from "axios";

const CalendarPage: NextPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [listEvents, setListEvents] = useState<CalendarElementProps[]>([]);

  const [valueInputName, setValueInputName] = useState("");
  const [valueInputDate, setValueInputDate] = useState("");
  const [valueInputMonth, setValueInputMonth] = useState("");
  const [valueInputYear, setValueInputYear] = useState("");

  const event = useMemo<Omit<CalendarElementProps, "id">>(
    () => ({
      date: `${valueInputYear}-${valueInputMonth.padStart(
        2,
        "0"
      )}-${valueInputDate.padStart(2, "0")}T22:00:00.000Z`,
      name: valueInputName,
    }),
    [valueInputDate, valueInputMonth, valueInputName, valueInputYear]
  );

  const options = useMemo(() => {
    return [{ label: "+ Nouvel Evénement", value: "" }].concat(
      listEvents.map(({ id, date, name }) => ({
        label: `${date.substring(0, 10)} - ${name}`,
        value: id,
      }))
    );
  }, [listEvents]);

  const resetSelectedEvent = useCallback(() => setSelectedEvent(""), []);

  const getEvents = useCallback(
    () =>
      axios
        .get<CalendarElementProps[]>("/api/event")
        .then(({ data }) => setListEvents(data)),
    []
  );

  const submitEvent = useCallback(() => {
    const isValidEvent =
      event.date.length === 24 &&
      new Date(event.date).toISOString() === event.date &&
      event.name.length > 0;
    if (isValidEvent) {
      if (selectedEvent) {
        axios
          .put(`/api/event/${selectedEvent}`, event)
          .then(resetSelectedEvent)
          .then(getEvents)
          .catch(() => "L'élement n'a pas pu être modifié");
      } else {
        axios
          .post(`/api/event`, event)
          .then(resetSelectedEvent)
          .then(getEvents)
          .catch(() => "L'élement n'a pas pu être ajouté");
      }
    } else {
      alert("L'événement n'est pas valide");
    }
  }, [event, selectedEvent, getEvents, resetSelectedEvent]);

  const deleteEvent = useCallback(() => {
    if (selectedEvent && confirm("Valider la suppression")) {
      axios
        .delete(`/api/event/${selectedEvent}`)
        .catch(() => alert("L'élément n'a pas pu être supprimé"))
        .finally(resetSelectedEvent)
        .finally(getEvents);
    }
  }, [selectedEvent, getEvents, resetSelectedEvent]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  useEffect(() => {
    if (selectedEvent === "") {
      setValueInputName("");
      setValueInputDate("");
      setValueInputMonth("");
      setValueInputYear("");
    } else {
      const { name, date } = listEvents.find(
        ({ id }) => selectedEvent === id
      ) as CalendarElementProps;
      setValueInputName(name);
      const elementDate = date.substring(0, 10).split("-");
      setValueInputYear(elementDate[0]);
      setValueInputMonth(elementDate[1]);
      setValueInputDate(elementDate[2]);
    }
  }, [listEvents, selectedEvent]);

  return (
    <>
      <NextSeo title="Admin - BDE EvryBody" noindex nofollow />
      <MainDisplay background="secondary" choices={NavChoices} hideSocialIcons>
        <div className="flex flex-col space-y-4 px-2 lg:px-8 xl:px-12">
          <h1 className="font-display font-bold text-2xl text-secondary uppercase text-center">
            Calendrier
          </h1>
          <form className="flex flex-col items-center space-y-3">
            <div
              className="space-y-3"
              style={{ maxWidth: "640px", width: "100%" }}
            >
              <h2 className="font-display font-bold text-xl text-secondary text-center">
                {`Sélection d'un événement`}
              </h2>
              <Select
                options={options}
                value={options.find(({ value }) => value === selectedEvent)}
                onChange={(event) => setSelectedEvent(event?.value as string)}
                styles={SelectStyles}
              />
              <h2 className="font-display font-bold text-xl text-secondary text-center">
                {`${
                  selectedEvent === "" ? "Création" : "Modification"
                } d'un événement`}
              </h2>
              <InputText
                className="font-body"
                onChange={(e) => setValueInputName(e.currentTarget.value)}
                value={valueInputName}
                placeholder="Nom de l'événement"
                style={{ width: "100%" }}
              />
              <div className="flex space-x-4">
                <InputText
                  type="text"
                  className="w-full font-bold text-center"
                  placeholder="Jour"
                  onChange={(e) => setValueInputDate(e.currentTarget.value)}
                  value={valueInputDate}
                  maxLength={2}
                />
                <InputText
                  type="text"
                  className="w-full font-bold text-center"
                  placeholder="Mois"
                  onChange={(e) => setValueInputMonth(e.currentTarget.value)}
                  value={valueInputMonth}
                  maxLength={2}
                />
                <InputText
                  type="text"
                  className="w-full font-bold text-center"
                  placeholder="Année"
                  onChange={(e) => setValueInputYear(e.currentTarget.value)}
                  value={valueInputYear}
                  maxLength={4}
                />
              </div>
            </div>
            <div className="flex flex-col items-stretch space-y-2">
              <Button type="button" onClick={submitEvent}>
                {selectedEvent === "" ? "Ajouter" : "Modifier"}{" "}
                <i
                  className={`fas fa-${
                    selectedEvent === "" ? "plus" : "save"
                  } icon`}
                  aria-hidden
                />
              </Button>
              <Button
                hidden={selectedEvent === ""}
                type="button"
                color={"warning"}
                onClick={deleteEvent}
              >
                Supprimer
                <i className={`fas fa-trash-alt icon`} aria-hidden />
              </Button>
            </div>
          </form>
        </div>
      </MainDisplay>
    </>
  );
};

export default CalendarPage;
