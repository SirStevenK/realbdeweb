type Props = {
  icon: string;
};

const NavIcon: React.FC<Props> = ({ icon }) => {
  return (
    <div
      style={{
        // background: colors["light"],
        // border: `2px solid ${colors["dark"]}`,
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
        style={{ color: "#7E8CA6" }}
        aria-hidden
      />
    </div>
  );
};

export default NavIcon;
