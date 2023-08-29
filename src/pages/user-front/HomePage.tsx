import { useEffect, useState } from "react";
import LoadingFront from "../../components/loading/LoadingFront";
import Nav from "../../components/nav/Nav";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../states/userInfo";

const HomePage = () => {
  const {getUserData,userData,loading} = useUserInfo();

  const [show, setShow] = useState(false);
  const { firstName, lastName, fields } = userData;

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
      <p className="sm:text-[28px] text-[22px] text-[#cecece] py-3">
        I'm a passionate{" "}
        <span className="border-b-2 border-green-500 pb-[5px] text-white">
          {fields[0]}
        </span>{" "}
        from New York
      </p>
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
