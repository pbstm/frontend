import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import CabinetMenu from '../cabinet/menu/CabinetMenu';

const CabinetContainer = ({ children, keywords, title }) => (
  <>
    <Head>
      <meta keywords={`photobooking${keywords}`} />
      <title>{title}</title>
    </Head>
    <div className="mx-auto">
      <div className="h-96 bg-pink-300">header</div>
      <CabinetMenu />
      <div>{children}</div>
    </div>
  </>
);

export default CabinetContainer;

CabinetContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  keywords: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
