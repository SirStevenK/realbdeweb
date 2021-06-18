import { AngleDoubleRight } from "@/components/icons";
import colors from "@/styles/colors.json";

type Props = {
  color?: string;
};

const NavIcon: React.FC<Props> = ({ color = "primary" }) => {
  return (
    <div
      style={{
        borderRadius: "8px",
        color: colors[`navicon-${color}`],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "32px",
        width: "36px",
      }}
    >
      <AngleDoubleRight />
    </div>
  );
};

export default NavIcon;
