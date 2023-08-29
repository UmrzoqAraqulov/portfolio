import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import HeaderFront from "../headers/HeaderFront";
const FrontLayout = () => {
  return (
    <Fragment>
      <HeaderFront />
      <main className="pt-[80px] w-full h-screen left-0 top-0 overflow-y-scroll text-white z-0 fixed">
        <Outlet />
      </main>
    </Fragment>
  );
};

export default FrontLayout;
