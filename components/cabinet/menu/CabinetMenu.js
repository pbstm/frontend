import { Link } from 'react-scroll';
import * as Scroll from 'react-scroll';
import React, { useEffect } from 'react';
import ActiveLink from '../../common/ActiveLink';

const CabinetMenu = () => {
  const { scrollSpy } = Scroll;

  useEffect(() => {
    scrollSpy.update();
  });

  return (
    <nav className="sticky top-0">
      <ul className="flex flex-row justify-between items-center bg-black text-white bg-opacity-70 h-10 px-5">
        <li>
          <ActiveLink activeClassName="text-blue-300" href="/">
            <a href="/">&spades;</a>
          </ActiveLink>
        </li>
        <li className="cursor-pointer">
          <Link
            activeClass="text-pink-300"
            to="sessions"
            spy
            smooth
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
            spy
            smooth
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
            spy
            smooth
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
            spy
            smooth
            offset={-70}
            duration={500}
          >
            ACCESSORIES
          </Link>
        </li>
        <li>
          <ActiveLink activeClassName="text-blue-300" href="/profile">
            <a href="/profile">&hearts;</a>
          </ActiveLink>
        </li>
      </ul>
    </nav>
  );
};

export default CabinetMenu;
