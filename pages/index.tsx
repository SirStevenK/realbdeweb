import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import FAQ from "@/components/FAQ/FAQ";
import Calendar from "@/components/Calendar/Calendar";
import Contact from "@/components/Contact/Contact";
import MainDisplay from "@/components/MainDisplay/MainDisplay";
import { MainContentProps, NavChoiceProps } from "@/types/utils";
import Testimonials from "@/components/Testimonials/Testimonials";
import Introduction from "@/components/Introduction/Introduction";
import GetEvents from "@/lib/services/event/GetEvents";
import GetIntroduction from "@/lib/services/introduction/GetIntroduction";
import GetQuestions from "@/lib/services/question/GetQuestions";
import GetTestimonials from "@/lib/services/testimonial/GetTestimonials";
import RemoveObjectID from "@/lib/scripts/RemoveObjectID";

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

export const getServerSideProps: GetServerSideProps<MainContentProps> =
  async () => {
    let props: MainContentProps = {
      events: [],
      introduction: "",
      questions: [],
      testimonials: [],
    };

    await Promise.all([
      GetEvents(),
      GetIntroduction(),
      GetQuestions(),
      GetTestimonials(),
    ])
      .then((values) => {
        props = {
          events: values[0].map(RemoveObjectID),
          introduction: values[1],
          questions: values[2].map(RemoveObjectID),
          testimonials: values[3].map(RemoveObjectID),
        };
      })
      .catch();

    return {
      props,
    };
  };

export default HomePage;
