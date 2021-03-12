import styled from "@emotion/styled";
import colors from "@/styles/colors.json";
import NextImage from "next/image";
import { useContext } from "react";
import MobileContext from "@/contexts/MobileContext";

const IconMenu = styled.i({
  color: colors.white,
  fontSize: "28px",
  position: "absolute",
  left: "10px",
  top: "14px",
});

const MobileHeader: React.FC = () => {
  const { toggleStatusMenu } = useContext(MobileContext);
  return (
    <div className="block md:hidden relative">
      <IconMenu
        aria-hidden
        className="fas fa-bars"
        onClick={toggleStatusMenu}
      />
      <div className="pt-2 pb-3 cursor-pointer flex justify-center w-full">
        <NextImage
          src="/images/logowebbde.png"
          quality={100}
          width={192}
          height={36}
        />
      </div>
    </div>
  );
};

export default MobileHeader;
