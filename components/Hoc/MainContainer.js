import ActiveLink from "../common/ActiveLink";
import Head from "next/head";

const MainContainer = ({ children, keywords, title }) => {
  return (
    <>
      <Head>
        <meta keywords={"photobooking" + keywords}></meta>
        <title>{title}</title>
      </Head>

      <nav>
        <ul className="flex flex-row space-x-2">
          <li>
            <ActiveLink activeClassName="text-blue-300" href={"/"}>
              <a>Main</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName="text-blue-300" href={"/login"}>
              <a>Login</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName="text-blue-300" href={"/calc"}>
              <a>Calculator</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName="text-blue-300" href={"/cabinet"}>
              <a>Cabinet</a>
            </ActiveLink>
          </li>
        </ul>
      </nav>

      <div>{children}</div>
    </>
  );
};

export default MainContainer;
