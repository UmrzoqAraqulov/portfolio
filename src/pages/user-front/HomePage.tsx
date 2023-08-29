import { useEffect, useState } from "react";
import LoadingFront from "../../components/loading/LoadingFront";
import Nav from "../../components/nav/Nav";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../states/userInfo";

import "./style.scss";

const HomePage = () => {
  const { getUserData, userData, loading } = useUserInfo();

  const [show, setShow] = useState(false);
  const { firstName, lastName, fields } = userData;
  console.log(fields);
  
  const resFields = fields[0]?.split(",") || [];
  console.log(resFields);
  
  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const styleIcon =
    "rounded-full bg-[#292929] px-3 py-2 text-xl text-white hover:bg-[#18d26e]";
  return (
    <div className="flex  flex-col h-screen justify-center containr text-white">
      <h1 className="text-[40px] sm:text-[56px] font-bold">
        <Link to="/home">
          {firstName ? firstName + " " + lastName : "FirstName"}
        </Link>
      </h1>
      <div className="sm:text-[28px] flex items-center gap-x-2 flex-wrap text-[22px] text-[#cecece]">
        <p>I'm a passionate</p>
        <p className="pt-3 wrapper">
          <div className="words">
            {resFields.map((el,id) => (
              <p key={id} className="wrapper-item">{el}</p>
            ))}
          </div>
        </p>
        <p>from Uzbekistan</p>
      </div>
      <Nav show={show} setShow={setShow} />
      <div className="flex gap-2 mt-8">
        <div className={styleIcon}>
          <i className="fa-brands fa-twitter"></i>
        </div>
        <div className={styleIcon}>
          <i className="fa-brands fa-facebook"></i>
        </div>
        <div className={styleIcon}>
          <i className="fa-brands fa-instagram"></i>
        </div>
        <div className={styleIcon}>
          <i className="fa-brands fa-linkedin"></i>
        </div>
      </div>
      <i
        onClick={() => setShow(true)}
        className="fa-solid fa-bars hidden max-[800px]:block absolute top-4 text-2xl cursor-pointer right-5"
      ></i>
      {loading ? (
        <div className="fixed z-30 bg-white bg-opacity-20 backdrop-blur-md flex justify-center items-center top-0 left-0 w-screen h-screen">
          <LoadingFront />
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;
