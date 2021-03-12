import MobileContext from "@/contexts/MobileContext";
import mq, { breakpoints } from "@/styles/mq";
import styled from "@emotion/styled";
import NextImage from "next/image";
import Link from "next/link";
import Scroll from "react-scroll";
import { useCallback, useContext, useEffect, useState } from "react";
import NavIcon from "./NavIcon";

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

const NavSide: React.FC = () => {
  const { statusMenu, hideMobileMenu } = useContext(MobileContext);
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
          <NextImage
            src="/images/logofox_short.png"
            alt="icone Mr EsKa"
            height={140}
            width={107}
          />
        </div>
        <ul
          className={`flex-1 space-y-4 ${
            innerHeight > 480 ? "mt-8 md:mt-12" : "mt-0"
          }`}
        >
          <li className="text-light font-body font-bold cursor-pointer">
            <div className="flex items-center" onClick={() => scrollTo("pres")}>
              <NavIcon icon="fas fa-horizontal-rule" />
              <span className="ml-3 text-lg font-display">Présentation</span>
            </div>
          </li>
          <li className="text-light font-body font-bold cursor-pointer">
            <div
              className="flex items-center"
              onClick={() => scrollTo("calendar")}
            >
              <NavIcon icon="fas fa-horizontal-rule" />
              <span className="ml-3 text-lg font-display">Calendrier</span>
            </div>
          </li>
          <li className="text-light font-body font-bold cursor-pointer">
            <div
              className="flex items-center"
              onClick={() => scrollTo("testimonial")}
            >
              <NavIcon icon="fas fa-horizontal-rule" />
              <span className="ml-3 text-lg font-display">
                Anciens Étudiants
              </span>
            </div>
          </li>
          <li className="text-light font-body font-bold cursor-pointer">
            <div className="flex items-center" onClick={() => scrollTo("faq")}>
              <NavIcon icon="fas fa-horizontal-rule" />
              <span className="ml-3 text-lg font-display">FAQ</span>
            </div>
          </li>
          <li className="text-light font-body font-bold cursor-pointer">
            <div
              className="flex items-center"
              onClick={() => scrollTo("contact")}
            >
              <NavIcon icon="fas fa-horizontal-rule" />
              <span className="ml-3 text-lg font-display">Contact</span>
            </div>
          </li>
        </ul>
        <ul className="flex space-x-4 mt-4">
          <li className="text-light text-2xl font-display font-bold text-center cursor-pointer">
            <Link href="https://twitter.com/RealMrEsKa">
              <a target="_new">
                <i className="fab fa-facebook-square" aria-hidden />
              </a>
            </Link>
          </li>
          <li className="text-light text-2xl font-display font-bold text-center cursor-pointer">
            <Link href="https://www.instagram.com/kilian_braquin">
              <a target="_new">
                <i className="fab fa-instagram" aria-hidden />
              </a>
            </Link>
          </li>
          <li className="text-light text-2xl font-display font-bold text-center cursor-pointer">
            <Link href="/">
              <a target="_new">
                <i className="fab fa-discord" aria-hidden />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default NavSide;
