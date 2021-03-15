import colors from "@/styles/colors.json";

type Props = {
  icon: string;
  color?: string;
};

const NavIcon: React.FC<Props> = ({ icon, color = "primary" }) => {
  return (
    <div
      style={{
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "-3px",
        paddingTop: "1px",
        height: "32px",
        width: "36px",
      }}
    >
      <i
        className={`${icon} text-lg`}
        style={{ color: colors[`navicon-${color}`] }}
        aria-hidden
      />
    </div>
  );
};

export default NavIcon;
