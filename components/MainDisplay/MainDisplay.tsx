import MobileContext from "@/contexts/MobileContext";
import { useCallback, useEffect, useState } from "react";
import MobileHeader from "../MobileMenu/MobileHeader";
import NavSide from "../NavSide/NavSide";

const MainDisplay: React.FC = ({ children }) => {
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);

  const hideMobileMenu = useCallback(() => {
    setDisplayMobileMenu(() => {
      document.body.style.overflow = "";
      return false;
    });
  }, []);

  const toggleStatusMenu = useCallback(() => {
    setDisplayMobileMenu((prevState) => {
      if (prevState) document.body.style.overflow = "";
      else {
        document.body.style.overflow = "hidden";
        const MainElement = document.getElementById("main") as HTMLElement;
        MainElement.scrollTop = 0;
        MainElement.scrollLeft = 0;
      }
      return !prevState;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", hideMobileMenu);
    return () => {
      window.removeEventListener("resize", hideMobileMenu);
    };
  }, [hideMobileMenu]);

  return (
    <MobileContext.Provider
      value={{
        statusMenu: displayMobileMenu,
        hideMobileMenu,
        toggleStatusMenu,
      }}
    >
      <div className="md:flex">
        <NavSide />
        <div
          id="main"
          className={`z-10 flex-1 top-0 bottom-0 fixed md:pl-2 md:relative ${
            displayMobileMenu
              ? "overflow-hidden"
              : "overflow-y-scroll md:overflow-y-hidden "
          }`}
          onClick={() => displayMobileMenu && hideMobileMenu()}
          style={
            displayMobileMenu
              ? {
                  paddingLeft: "7px", // For BoxShadow
                  WebkitTransform: "translate(270px, 0)",
                  transform: "translate(270px, 0)",
                  transition: "transform 1.5s",
                }
              : {
                  transition: "transform 1.5s",
                }
          }
        >
          <MobileHeader />
          <div className="bg-white md:mt-8 rounded-t-lg md:rounded-tr-none py-6 px-2 shadow-MAIN md:px-10 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </MobileContext.Provider>
  );
};

export default MainDisplay;
