import CabinetMenu from "../cabinet/menu/CabinetMenu";
import Head from "next/head";

const CabinetContainer = ({ children, keywords, title }) => {
  return (
    <>
      <Head>
        <meta keywords={"photobooking" + keywords}></meta>
        <title>{title}</title>
      </Head>
      <div className="mx-auto">
        <div className="h-96 bg-pink-300">header</div>
        <CabinetMenu />
        <div>{children}</div>
      </div>
    </>
  );
};

export default CabinetContainer;
