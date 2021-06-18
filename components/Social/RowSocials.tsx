import { Discord, Facebook, Instagram } from "@/components/icons";
import Link from "next/link";

type Props = {
  color?: string;
  hidden?: boolean;
  sizeIcon?: number;
  disableMargin?: boolean;
};

const RowSocials: React.FC<Props> = ({
  color = "light",
  disableMargin = false,
  hidden = false,
  sizeIcon,
}) => {
  return (
    <ul
      className={`flex space-x-4 ${disableMargin ? "" : "mt-4"} ${
        hidden ? "hidden" : "block"
      }`}
    >
      <li
        className={`text-${color} font-display font-bold text-center cursor-pointer`}
      >
        <Link href="https://www.facebook.com/EvryBodyMiage">
          <a target="_new">
            <Facebook size={sizeIcon} />
          </a>
        </Link>
      </li>
      <li
        className={`text-${color} font-display font-bold text-center cursor-pointer`}
      >
        <Link href="https://www.instagram.com/evrybody_miage">
          <a target="_new">
            <Instagram size={sizeIcon} />
          </a>
        </Link>
      </li>
      <li
        className={`text-${color} font-display font-bold text-center cursor-pointer`}
      >
        <Link href="https://discord.gg/W55yuxNjYS">
          <a target="_new">
            <Discord size={sizeIcon} />
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default RowSocials;
