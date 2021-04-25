import ActiveLink from "../../common/ActiveLink";
import { Link, animateScroll as scroll } from "react-scroll";

const CabinetMenu = () => {
  return (
    <nav className="sticky top-0">
      <ul className="flex flex-row justify-between items-center bg-black text-white bg-opacity-70 h-10 px-5">
        <li>
          <ActiveLink activeClassName="text-blue-300" href={"/"}>
            <a>&spades;</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName="text-blue-300" href={"#sessions"}>
            <a>PHOTOSESSIONS</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName="text-blue-300" href={"#locations"}>
            <a>LOCATIONS</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName="text-blue-300" href={"#shedule"}>
            <a>SHEDULE</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName="text-blue-300" href={"#accessories"}>
            <a>ACCESSORIES</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName="text-blue-300" href="/profile">
            <a>&hearts;</a>
          </ActiveLink>
        </li>
      </ul>
    </nav>
  );
};

export default CabinetMenu;
