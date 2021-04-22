import MobileContext from "@/contexts/MobileContext";
import colors from "@/styles/colors.json";
import { NavChoiceProps } from "@/types/utils";
import { useCallback, useEffect, useState } from "react";
import MobileHeader from "@/components/MobileMenu/MobileHeader";
import NavSide from "@/components/NavSide/NavSide";

type Props = {
  background?: string;
  choices?: NavChoiceProps[];
  hideSocialIcons?: boolean;
};

const MainDisplay: React.FC<Props> = ({
  children,
  background = "primary",
  choices = [],
  hideSocialIcons,
}) => {
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

  useEffect(() => {
    document.body.style.backgroundColor = colors[background];
  }, [background]);

  return (
    <MobileContext.Provider
      value={{
        statusMenu: displayMobileMenu,
        hideMobileMenu,
        toggleStatusMenu,
      }}
    >
      <div className={`md:flex bg-${background}`}>
        <NavSide
          choices={choices}
          color={background}
          hideSocialIcons={hideSocialIcons}
        />
        <div
          id="main"
          className={`z-10 flex-1 flex flex-col top-0 bottom-0 w-full fixed md:pl-2 md:relative ${
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
          <div className="bg-white md:mt-8 rounded-t-lg md:min-h-full md:rounded-tr-none py-6 px-2 shadow-MAIN md:px-10 space-y-6 flex-1 relative">
            {children}
          </div>
        </div>
      </div>
    </MobileContext.Provider>
  );
};

export default MainDisplay;
