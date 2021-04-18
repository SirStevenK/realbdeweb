import colors from "@/styles/colors.json";

type Props = {
  color?: string;
};

const NavIcon: React.FC<Props> = ({ color = "primary" }) => {
  return (
    <div
      style={{
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "32px",
        width: "36px",
      }}
    >
      <i
        className={`fas fa-angle-double-right text-lg`}
        style={{ color: colors[`navicon-${color}`] }}
        aria-hidden
      />
    </div>
  );
};

export default NavIcon;
