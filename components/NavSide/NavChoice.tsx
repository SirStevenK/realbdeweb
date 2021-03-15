import NavIcon from "@/components/NavSide/NavIcon";
import { NavChoiceProps } from "@/types/utils";
import Link from "next/link";

type Props = {
  choice: NavChoiceProps;
  color: string;
  scrollTo: (id: string) => void;
};

const NavChoice: React.FC<Props> = ({
  choice: { label, type, value },
  color,
  scrollTo,
}) => {
  if (type === "scroll")
    return (
      <div className="flex items-center" onClick={() => scrollTo(value)}>
        <NavIcon color={color} icon="fas fa-horizontal-rule" />
        <span className="ml-3 text-lg font-display">{label}</span>
      </div>
    );
  else if (type === "link")
    return (
      <Link href={value}>
        <div className="flex items-center">
          <NavIcon color={color} icon="fas fa-horizontal-rule" />
          <span className="ml-3 text-lg font-display">{label}</span>
        </div>
      </Link>
    );
  else return null;
};

export default NavChoice;
