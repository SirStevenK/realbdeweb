import { TestomonialElementProps } from "@/types/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";
import MoreTestimonial from "./MoreTestimonial";
import Testimonial from "./Testimonial";

type Props = {
  listTestimonials: TestomonialElementProps[];
};

const Testimonials: React.FC<Props> = ({ listTestimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(listTestimonials.length + 1);
  }, [listTestimonials]);

  if (listTestimonials.length === 0) return null;
  else
    return (
      <div id="testimonials" className="flex flex-col items-center">
        <div
          style={{
            width: "100%",
            minWidth: "280px",
            maxWidth: "540px",
          }}
        >
          <Link href="/etudiants">
            <a>
              <h2 className="font-display font-bold text-2xl text-primary text-center hover:underline hover:cursor-pointer">
                Anciens Étudiants
              </h2>
            </a>
          </Link>
          <div className="mt-6 px-4 w-full flex justify-center">
            {listTestimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                content={testimonial}
                hidden={currentIndex !== index}
              />
            ))}
            <MoreTestimonial hidden={currentIndex !== count - 1} />
          </div>
          <div className="relative mt-5 mb-1 flex justify-center">
            <ArrowLeft
              className="absolute cursor-pointer text-primary left-[18px]"
              onClick={() => setCurrentIndex((cur) => Math.max(0, cur - 1))}
            />
            <ArrowRight
              className="absolute cursor-pointer text-primary right-[18px]"
              onClick={() =>
                setCurrentIndex((cur) => Math.min(count - 1, cur + 1))
              }
            />
            {Array.from({ length: count }, (_, i) => (
              <div
                key={i}
                className={`mt-[4px] h-[16px] w-[16px] rounded-full cursor-pointer ${
                  currentIndex === i ? "bg-primary" : "bg-gray"
                } ${i === 0 ? "" : "ml-2"}`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    );
};

export default Testimonials;
