import NavIcon from "@/components/NavSide/NavIcon";
import { useUser } from "@/hooks/UseUser";
import { NavChoiceProps } from "@/types/utils";
import axios from "axios";
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
  const { mutate } = useUser();
  const handleClick = () => {
    if (type === "scroll") scrollTo(value);
    else if (type === "function") {
      if (value === "logout") {
        axios.post("/api/auth/logout").finally(() => {
          mutate();
        });
      }
    }
  };

  if (type === "scroll" || type === "function")
    return (
      <div className="flex items-center" onClick={handleClick}>
        <NavIcon color={color} />
        <span className="ml-3 text-lg font-display">{label}</span>
      </div>
    );
  else if (type === "link")
    return (
      <Link href={value}>
        <a className="flex items-center">
          <NavIcon color={color} />
          <span className="ml-3 text-lg font-display">{label}</span>
        </a>
      </Link>
    );
  else return null;
};

export default NavChoice;
