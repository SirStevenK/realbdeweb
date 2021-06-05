import { createContext } from "react";

type PopinNewsletterContextProps = {
  displayNewsletter: boolean;
  setDisplayNewsletter: (value: boolean) => void;
};

const PopinNewsletterContext = createContext<PopinNewsletterContextProps>({
  displayNewsletter: false,
  setDisplayNewsletter: () => null,
});

export default PopinNewsletterContext;
