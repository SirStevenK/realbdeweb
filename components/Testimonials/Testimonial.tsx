import { TestomonialElementProps } from "@/types/utils";
import NextImage from "next/image";

type Props = {
  content: TestomonialElementProps;
};

const Testimonial: React.FC<Props> = ({
  content: { content, description, firstname, lastname },
}) => {
  return (
    <div
      className="rounded-md overflow-hidden bg-white"
      style={{
        boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.3)",
        minWidth: "280px",
        maxWidth: "540px",
      }}
    >
      <div className="ml-2 py-3 px-2 space-y-2">
        <i aria-hidden className="fas fa-quote-left text-primary text-xl" />
        <p className="pr-2 font-body text-sm md:text-base">{content}</p>
      </div>
      <div className="flex justify-center items-center p-2 bg-primary bg-opacity-25">
        <NextImage
          className="rounded-full overflow-hidden shadow-TESTIMONIAL-PIC"
          src="/images/sampropic.png"
          alt=""
          height={"64px"}
          width={"64px"}
        />
        <div className="ml-4">
          <span className="block text-primary font-display font-bold">
            {firstname} <span className="uppercase">{lastname}</span>
          </span>
          <span className="block text-primary font-display text-sm">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
