import { QuoteLeft } from "@/components/icons";
import { TestomonialElementProps } from "@/types/utils";
import Image from "@/components/Image/Image";

type Props = {
  content: TestomonialElementProps;
  hidden?: boolean;
};

const Testimonial: React.FC<Props> = ({
  content: { content, description, firstname, lastname },
  hidden = false,
}) => {
  return (
    <div
      className={`rounded-md overflow-hidden bg-white ${
        hidden ? "opacity-0 hidden" : "animate-fadein opacity-100"
      }`}
      style={{
        boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.3)",
        width: "100%",
      }}
    >
      <div className="ml-2 py-3 px-2 space-y-2">
        <QuoteLeft className="text-primary" />
        <p className="pr-2 font-body text-sm md:text-base">{content}</p>
      </div>
      <div className="flex justify-center items-center p-2 bg-primary bg-opacity-25">
        <Image
          className="rounded-full overflow-hidden shadow-TESTIMONIAL-PIC"
          src="/sampropic.png"
          alt=""
          height={64}
          width={64}
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
