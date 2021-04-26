import ActiveLink from "../../common/ActiveLink";
import { Link } from "react-scroll";
import * as Scroll from "react-scroll";
import React, { useEffect } from "react";

const CabinetMenu = () => {
  let scrollSpy = Scroll.scrollSpy;

  useEffect(() => {
    scrollSpy.update();
  });

  return (
    <nav className="sticky top-0">
      <ul className="flex flex-row justify-between items-center bg-black text-white bg-opacity-70 h-10 px-5">
        <li>
          <ActiveLink activeClassName="text-blue-300" href={"/"}>
            <a>&spades;</a>
          </ActiveLink>
        </li>
        <li className="cursor-pointer">
          <Link
            activeClass="text-pink-300"
            to="sessions"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            PHOTOSESSIONS
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link
            activeClass="text-pink-300"
            to="locations"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            LOCATIONS
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link
            activeClass="text-pink-300"
            to="shedule"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            SHEDULE
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link
            activeClass="text-pink-300"
            to="accessories"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            ACCESSORIES
          </Link>
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
