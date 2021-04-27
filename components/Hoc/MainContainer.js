import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import ActiveLink from '../common/ActiveLink';

const MainContainer = ({ children, keywords, title }) => (
  <>
    <Head>
      <meta keywords={`photobooking${keywords}`} />
      <title>{title}</title>
    </Head>

    <nav>
      <ul className="flex flex-row space-x-2">
        <li>
          <ActiveLink activeClassName="text-blue-300" href="/">
            <a href="/">Main</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName="text-blue-300" href="/login">
            <a href="/login">Login</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName="text-blue-300" href="/calc">
            <a href="/calc">Calculator</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName="text-blue-300" href="/cabinet">
            <a href="/cabinet">Cabinet</a>
          </ActiveLink>
        </li>
      </ul>
    </nav>

    <div>{children}</div>
  </>
);

export default MainContainer;

MainContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  keywords: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
