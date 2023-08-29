import AsideUser from "../headers/AsideUser";
import { Outlet } from "react-router-dom";
import HeaderUser from "../headers/HeaderUser";
import { useEffect, useState } from "react";
const UserLayout = () => {
  const [show, setShow] = useState(true);
  useEffect(()=>{
    if(window.innerWidth<500){
      setShow(false)
    }
  },[])
  return (
    <div className=" h-screen w-screen">
      <AsideUser show={show} setShow={setShow} />
      <HeaderUser show={show} setShow={setShow} />
      <main
        style={{
          width: `${show ? "calc(100vw - 230px)" : "calc(100vw - 70px)"}`,
          height: "calc(100vh - 100px)",
          transition: "0.4s",
        }}
        className={
          show
            ? " py-1 fixed top-[80px] left-[220px]"
            : " py-1 fixed top-[80px] left-[60px]"
        }
      >
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
