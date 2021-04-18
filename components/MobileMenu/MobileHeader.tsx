import styled from "@emotion/styled";
import colors from "@/styles/colors.json";
import NextImage from "next/image";
import { useContext } from "react";
import MobileContext from "@/contexts/MobileContext";
import { Bars } from "../icons";

const IconMenu = styled.div({
  color: colors.white,
  position: "absolute",
  left: "10px",
  top: "14px",
});

const MobileHeader: React.FC = () => {
  const { toggleStatusMenu } = useContext(MobileContext);
  return (
    <div className="block md:hidden relative">
      <IconMenu onClick={toggleStatusMenu}>
        <Bars />
      </IconMenu>
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
