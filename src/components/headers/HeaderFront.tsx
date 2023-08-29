import {useEffect, useState} from "react"
import Nav from "../nav/Nav";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../states/userInfo";

const HeaderFront = () => {
  const [show, setShow] = useState(false);
  const { getUserData, userData } = useUserInfo();

  const { firstName, lastName } = userData;

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <nav className="w-full fixed top-0 left-0 bg-black z-10 bg-opacity-90 py-3 layoutNav">
      <div className="flex justify-between containr items-center text-white">
        <h2 className="text-[22px] sm:text-[28px] font-bold">
          <Link to="/home">
            {firstName
              ? firstName + " " + lastName
              : "First Name"}
          </Link>
        </h2>
        <Nav show={show} setShow={setShow} />
        <i
          onClick={() => setShow(true)}
          className="fa-solid fa-bars hidden max-[800px]:block absolute top-4 text-2xl cursor-pointer right-5"
        ></i>
      </div>
    </nav>
  );
};

export default HeaderFront;
