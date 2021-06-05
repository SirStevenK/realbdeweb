import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import MainDisplay from "@/components/MainDisplay/MainDisplay";
import {
  MainContentProps,
  NavChoiceProps,
  TestomonialElementProps,
} from "@/types/utils";
import RemoveObjectID from "@/lib/scripts/RemoveObjectID";
import GetTestimonials from "@/lib/services/testimonial/GetTestimonials";
import Testimonial from "@/components/Testimonials/Testimonial";

export const NavChoices: NavChoiceProps[] = [
  { type: "link", label: "Présentation", value: "/#intro" },
  { type: "link", label: "Calendrier", value: "/#calendar" },
  { type: "link", label: "Anciens Étudiants", value: "/#testimonials" },
  { type: "link", label: "FAQ", value: "/#faq" },
  { type: "link", label: "Contact", value: "/#contact" },
];

type Props = {
  testimonials: TestomonialElementProps[];
};

const HomePage: NextPage<MainContentProps> = ({ testimonials }) => {
  return (
    <>
      <NextSeo
        title="Anciens Etudiants - BDE EvryBody"
        description="Liste témoignages des anciens étudiants"
      />
      <MainDisplay choices={NavChoices}>
        <h1 className="font-display font-bold text-2xl text-primary text-center">
          Anciens Étudiants
        </h1>
        <div className="flex justify-center flex-wrap">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="max-w-[600px] w-full px-2 pb-6 md:px-4 lg:px-6 md:pb-8"
            >
              <Testimonial key={index} content={testimonial} />
            </div>
          ))}
        </div>
      </MainDisplay>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const testimonials = (await GetTestimonials()).map(RemoveObjectID);
  return {
    props: {
      testimonials,
    },
  };
};

export default HomePage;
