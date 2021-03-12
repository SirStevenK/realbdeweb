import { LogoH1, LogoSpan } from "../Logo";

const Header: React.FC = () => {
  return (
    <header className="flex justify-center bg-dark-sub shadow-xl py-2">
      <LogoSpan>Mr EsKa</LogoSpan>
    </header>
  );
};

export default Header;
