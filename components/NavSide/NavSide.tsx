import ThemeContext from "@/contexts/ThemeContext";
import NextImage from "next/image";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import NavIcon from "./NavIcon";

const NavSide: React.FC = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const [scrollY, setScrollY] = useState(0);

  const updateScrollY = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateScrollY);
    return () => {
      window.removeEventListener("scroll", updateScrollY);
    };
  }, [updateScrollY]);

  return (
    <div
      className="px-12 h-screen sticky top-0 bg-back"
      style={{ paddingTop: `${Math.max(4, 32 - scrollY)}px` }}
    >
      <div className="flex flex-col h-full items-center py-4">
        <NextImage
          src="/images/logofox_short.png"
          alt="icone Mr EsKa"
          height={140}
          width={107}
        />
        <ul className="flex-1 space-y-4 mt-12">
          <li className="text-light font-body font-bold cursor-pointer">
            <Link href="/">
              <a className="flex items-center">
                <NavIcon icon="fad fa-horizontal-rule" />
                <span className="ml-3 text-lg">Présentations</span>
              </a>
            </Link>
          </li>
          <li className="text-light font-body font-bold cursor-pointer">
            <Link href="/">
              <a className="flex items-center">
                <NavIcon icon="fad fa-horizontal-rule" />
                <span className="ml-3 text-lg">Membres</span>
              </a>
            </Link>
          </li>
          <li className="text-light font-body font-bold cursor-pointer">
            <Link href="/">
              <a className="flex items-center">
                <NavIcon icon="fad fa-horizontal-rule" />
                <span className="ml-3 text-lg">Calendrier</span>
              </a>
            </Link>
          </li>
          <li className="text-light font-body font-bold cursor-pointer">
            <Link href="/">
              <a className="flex items-center">
                <NavIcon icon="fad fa-horizontal-rule" />
                <span className="ml-3 text-lg">Anciens Étudiants</span>
              </a>
            </Link>
          </li>
          <li className="text-light font-body font-bold cursor-pointer">
            <Link href="/">
              <a className="flex items-center">
                <NavIcon icon="fad fa-horizontal-rule" />
                <span className="ml-3 text-lg">FAQ</span>
              </a>
            </Link>
          </li>
          <li className="text-light font-body font-bold cursor-pointer">
            <Link href="/">
              <a className="flex items-center">
                <NavIcon icon="fad fa-horizontal-rule" />
                <span className="ml-3 text-lg">Contact</span>
              </a>
            </Link>
          </li>
        </ul>
        <div
          className="mb-2 flex text-light cursor-pointer items-center"
          onClick={toggleTheme}
        >
          <div style={{ marginBottom: "-3px" }}>
            {darkTheme ? (
              <i
                className="fal fa-toggle-on"
                style={{ fontSize: "42px" }}
                aria-hidden
              />
            ) : (
              <i
                className="fal fa-toggle-off"
                style={{ fontSize: "42px" }}
                aria-hidden
              />
            )}
          </div>
          <span className="ml-3 font-bold">Thème Sombre</span>
        </div>
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
    </div>
  );
};

export default NavSide;
