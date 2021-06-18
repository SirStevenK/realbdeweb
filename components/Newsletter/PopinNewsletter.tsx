import { CheckCircle, Times } from "@/components/icons";
import RowSocials from "@/components/Social/RowSocials";
import PopinNewsletterContext from "@/contexts/PopinNewsletterContext";
import ValidateEmail from "@/lib/scripts/ValidateEmail";
import axios from "axios";
import { useCallback, useContext, useState } from "react";

const PopinNewsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [sended, setSended] = useState(false);
  const { displayNewsletter, setDisplayNewsletter } = useContext(
    PopinNewsletterContext
  );
  const [errors, setErrors] = useState<string[]>([]);

  const Subscribe = useCallback(() => {
    if ([email].every((e) => e.length > 0) && ValidateEmail(email))
      axios
        .post("/api/subscriber", { email })
        .then(() => setSended(true))
        .catch(() => alert("Votre email n'a pas pu être enregistré"))
        .finally(() => setErrors([]));
    else {
      setErrors(() => {
        const errors: string[] = [];
        if (email.length === 0 || !ValidateEmail(email)) errors.push("email");
        return errors;
      });
    }
  }, [email]);

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

          <form
            className="flex flex-col space-y-4 mt-4"
            onSubmit={(e) => {
              Subscribe();
              e.preventDefault();
            }}
          >
            <input
              type="email"
              className={`font-body py-2 px-2 border ${
                errors.includes("email") ? "border-warning" : "border-primary"
              }`}
              placeholder="Adresse Email"
              disabled={sended}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <input
              type="submit"
              className={`bg-primary cursor-pointer text-light font-display font-bold py-2 ${
                sended ? "hidden" : "block"
              }`}
            />
            <span
              className={`flex items-center justify-center text-lg font-display ${
                sended ? "block" : "hidden"
              }`}
            >
              Envoyé <CheckCircle className="ml-2" />
            </span>
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
