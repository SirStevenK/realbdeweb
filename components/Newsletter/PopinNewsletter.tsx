import PopinNewsletterContext from "@/contexts/PopinNewsletterContext";
import { useContext } from "react";
import Times from "../icons/Times";
import RowSocials from "../Social/RowSocials";

type Props = {
  hidden?: boolean;
};

const PopinNewsletter: React.FC<Props> = ({ hidden }) => {
  const { displayNewsletter, setDisplayNewsletter } = useContext(
    PopinNewsletterContext
  );
  return (
    <div
      className={`${
        displayNewsletter ? "fixed" : "hidden"
      } z-30 inset-0 bg-dark bg-opacity-60 background flex justify-center items-center`}
      onClick={(e) => {
        const target = e.target as Partial<HTMLElement>;
        if (
          typeof target.className === "string" &&
          target.className.includes("background")
        )
          setDisplayNewsletter(false);
      }}
    >
      <div className="relative w-[320px] shadow-MAIN bg-light rounded-lg overflow-hidden flex">
        <div
          className="w-[84px] h-[84px] bg-primary rounded-full absolute right-[-36px] top-[-36px] cursor-pointer"
          onClick={() => setDisplayNewsletter(false)}
        >
          <div className="relative h-full w-full">
            <Times
              className="absolute left-[15px] bottom-[15px] text-light"
              size={24}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col px-4">
          <span className="font-bold font-display text-lg mt-[30px] text-center text-primary">
            Abonnez-vous à notre newsletter
          </span>
          <span className="font-body text-center mt-2">
            Soyez informés de nos dernières actualités et de nos prochains
            événements.
          </span>

          <form className="flex flex-col space-y-4 mt-4">
            <input
              type="email"
              className="font-body py-2 px-2 border border-primary"
              placeholder="Adresse Email"
            />
            <input
              type="submit"
              className="bg-primary text-light font-display font-bold py-2 "
            />
          </form>

          <div className="py-4 flex justify-center">
            <RowSocials color="primary" disableMargin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopinNewsletter;
