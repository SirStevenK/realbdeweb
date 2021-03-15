import { TestomonialElementProps } from "@/types/utils";
import Testimonial from "./Testimonial";

type Props = {
  listTestimonials: TestomonialElementProps[];
};

const Testimonials: React.FC<Props> = ({ listTestimonials }) => {
  if (listTestimonials.length === 0) return null;
  else
    return (
      <div id="testimonials" className="flex flex-col items-center">
        <h1 className="font-display font-bold text-2xl text-primary text-center">
          Anciens Étudiants
        </h1>
        <div className="mt-6 mb-1 px-4">
          <Testimonial content={listTestimonials[0]} />
        </div>
      </div>
    );
};

export default Testimonials;
