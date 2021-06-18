import { Bars } from "@/components/icons";
import Image from "@/components/Image/Image";
import MobileContext from "@/contexts/MobileContext";
import colors from "@/styles/colors.json";
import styled from "@emotion/styled";
import { useContext } from "react";

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
        <Image
          src="/logowebbde.png"
          quality={100}
          width={192}
          height={36}
          alt=""
        />
      </div>
    </div>
  );
};

export default MobileHeader;
