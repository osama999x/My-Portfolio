import NavLinks from "./NavLinks";
import logo from "../images/OK_3_Logo-1.png";

const Header = () => {
  return (
    <header className="header">
      <img className="logo" width={"60px"} src={logo} alt="Osama Logo" />
      <NavLinks />
    </header>
  );
};

export default Header;
