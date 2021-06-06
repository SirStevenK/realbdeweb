import MobileContext from "@/contexts/MobileContext";
import mq, { breakpoints } from "@/styles/mq";
import styled from "@emotion/styled";
import Scroll from "react-scroll";
import { useCallback, useContext, useEffect, useState } from "react";
import { NavChoiceProps } from "@/types/utils";
import NavChoice from "./NavChoice";
import Image from "@/components/Image/Image";
import RowSocials from "../Social/RowSocials";
import PopinNewsletterContext from "@/contexts/PopinNewsletterContext";

const Wrapper = styled.div({
  width: "250px",
  position: "fixed",
  left: "-250px",
  transition: "left 1.5s",
  [mq[1]]: {
    position: "sticky",
    width: "auto",
    top: "0px",
    left: "0px",
  },
  "&.active": {
    left: "0px",
    transition: "left 1.5s",
  },
});

type Props = {
  choices: NavChoiceProps[];
  color?: string;
  hideSocialIcons?: boolean;
};

const NavSide: React.FC<Props> = ({
  choices,
  color = "primary",
  hideSocialIcons,
}) => {
  const { statusMenu, hideMobileMenu } = useContext(MobileContext);
  const { setDisplayNewsletter } = useContext(PopinNewsletterContext);
  const [innerHeight, setInnerHeight] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [elementScrollTo, setElementScrollTo] = useState("");

  const updateInnerSize = useCallback(() => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);
  }, []);

  const updateScrollY = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  const scrollTo = useCallback(
    (id: string) => {
      hideMobileMenu();
      setElementScrollTo(id);
    },
    [hideMobileMenu]
  );

  useEffect(() => {
    updateInnerSize();
    updateScrollY();
    window.addEventListener("resize", updateInnerSize);
    window.addEventListener("scroll", updateScrollY);
    return () => {
      window.removeEventListener("resize", updateInnerSize);
      window.removeEventListener("scroll", updateScrollY);
    };
  }, [updateInnerSize, updateScrollY]);

  useEffect(() => {
    if (elementScrollTo && !statusMenu) {
      Scroll.scroller.scrollTo(elementScrollTo, {
        duration: 1500,
        delay: innerWidth < breakpoints[1] ? 300 : 0,
        smooth: true,
        offset: -20,
        containerId: innerWidth < breakpoints[1] ? "main" : "",
      });
      setElementScrollTo("");
    }
  }, [elementScrollTo, innerWidth, statusMenu]);

  return (
    <Wrapper
      className={`md:px-12 top-0 bg-back flex flex-col items-center ${
        statusMenu ? "active" : ""
      } flex-shrink-0 z-0`}
      style={{
        height: `${innerHeight}px`,
        paddingTop: `${Math.max(4, 32 - scrollY)}px`,
      }}
    >
      <div className={`flex flex-col h-full items-center py-4`}>
        <div className={`${innerHeight > 480 ? "block" : "hidden"}`}>
          <Image
            src="/logofox_short.png"
            alt="Logo du BDE"
            height={140}
            width={107}
          />
        </div>
        <ul
          className={`flex-1 flex flex-col ${
            innerHeight > 480 ? "mt-4 md:mt-8 mb-2" : "mt-0"
          }`}
        >
          {choices.map((choice, index) => (
            <li
              key={choice.label + choice.value}
              className={`text-light font-body font-bold cursor-pointer ${
                choice.displayBottom &&
                choices.findIndex(({ displayBottom }) => displayBottom) ===
                  index
                  ? "mt-auto"
                  : "mt-4"
              }`}
            >
              <NavChoice choice={choice} color={color} scrollTo={scrollTo} />
            </li>
          ))}
        </ul>
        <span
          className={`${
            hideSocialIcons ? "hidden" : "block"
          } select-none font-body text-light hover:underline hover:cursor-pointer mb-1`}
          onClick={() => setDisplayNewsletter(true)}
        >
          Rejoignez notre newsletter
        </span>
        <RowSocials hidden={hideSocialIcons} />
      </div>
    </Wrapper>
  );
};

export default NavSide;
