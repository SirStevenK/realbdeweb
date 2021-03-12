import { createContext } from "react";

type MobileContextProps = {
  statusMenu: boolean;
  hideMobileMenu: () => void;
  toggleStatusMenu: () => void;
};

const MobileContext = createContext<MobileContextProps>({
  statusMenu: false,
  hideMobileMenu: () => null,
  toggleStatusMenu: () => null,
});

export default MobileContext;
