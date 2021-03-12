export type AgendaElementProps = {
  color: string;
  date: Date;
  name: string;
};

export const AgendaEvents: AgendaElementProps[] = [
  {
    color: "orange",
    date: new Date("2021-01-01T00:00:00"),
    name: "Soirée de présentation du BDE",
  },
  {
    color: "gray",
    date: new Date("2021-02-01T00:00:00"),
    name: "Préparation d’un tournoi E-Sport",
  },
  {
    color: "blue",
    date: new Date("2021-03-01T00:00:00"),
    name: "Atelier CV / Simulations d’entretiens",
  },
  {
    color: "green",
    date: new Date("2021-04-01T00:00:00"),
    name: "Mise en place de l’entraide en ligne",
  },
  {
    color: "yellow",
    date: new Date("2021-05-01T00:00:00"),
    name: "Hackaton",
  },
  {
    color: "orange",
    date: new Date("2021-06-01T00:00:00"),
    name: "Mise en place d’entraide en présentiel",
  },
  {
    color: "purple",
    date: new Date("2021-07-01T00:00:00"),
    name: "Soirée de fin d’année",
  },
];
