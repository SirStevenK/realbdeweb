import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import FAQ from "@/components/FAQ/FAQ";
import Calendar from "@/components/Calendar/Calendar";
import Contact from "@/components/Contact/Contact";
import MainDisplay from "@/components/MainDisplay/MainDisplay";
import db from "@/lib/lowdb/DB_Website";
import { MainContentProps, NavChoiceProps } from "@/types/utils";
import Testimonials from "@/components/Testimonials/Testimonials";
import Introduction from "@/components/Introduction/Introduction";

const NavChoices: NavChoiceProps[] = [
  { type: "scroll", label: "Présentation", value: "intro" },
  { type: "scroll", label: "Calendrier", value: "calendar" },
  { type: "scroll", label: "Anciens Étudiants", value: "testimonials" },
  { type: "scroll", label: "FAQ", value: "faq" },
  { type: "scroll", label: "Contact", value: "contact" },
];

const HomePage: NextPage<MainContentProps> = ({
  events,
  introduction,
  questions,
  testimonials,
}) => {
  return (
    <>
      <NextSeo title="BDE EvryBody" description="La Home Page" />
      <MainDisplay choices={NavChoices}>
        <Introduction text={introduction} />
        <Calendar listEvents={events} />
        <Testimonials listTestimonials={testimonials} />
        <FAQ listQuestions={questions} />
        <Contact />
      </MainDisplay>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<MainContentProps> = async () => {
  return {
    props: {
      events: db.getEvents(),
      introduction: db.getIntroduction(),
      questions: db.getQuestions(),
      testimonials: db.getTestimonials(),
    },
  };
};

export default HomePage;
