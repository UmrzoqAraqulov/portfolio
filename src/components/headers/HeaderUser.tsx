import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../states/auth";
import { request } from "../../server/request";
import { userObj } from "../../types";
import { IMGURL } from "../../const";
import {toast} from "react-toastify"
import "./header.scss";

const HeaderUser = ({
  show,
  setShow
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [controlDropdown, setControlDropdown] = useState(false);
  const [meInfo, setMeInfo] = useState(userObj);

  const { firstName, lastName, photo } = meInfo;

  const getMeInfo = async () => {
    try {
      const { data } = await request("auth/me");
      setMeInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMeInfo();
  }, []);

  const openInfo = () => {
    setControlDropdown(!controlDropdown);
  };

  const openAccount = () => {
    navigate("/account");
    setControlDropdown(false);
  };

  const logOutUser = () => {
    const checkLogout = confirm("Do you want to log out?");
    if (checkLogout) {
      logOut(navigate);
    }
    setControlDropdown(false);
  };

  const portfolioGo = () =>{
    if(firstName){
      navigate("/home")
    }else{
      toast.error("Server is not working!")
      toast.warning("Plase again!")
    }
  }

  const headerBar =
    " top-[10px] fixed flex  font-semibold text-3xl text-white items-center z-10 justify-between px-2 py-10";

  return (
    <nav
      style={{
        width: `${show ? "calc(100vw - 230px)" : "calc(100vw - 70px)"}`,
        // height: "45px",
        transition: "0.4s",
      }}
      className={
        show
          ? headerBar + " left-[220px]"
          : headerBar + " left-[60px]"
      }
    >
      <div className="nav-name">
        <i
          onClick={() => setShow(!show)}
          className="fa-solid fa-bars text-lg cursor-pointer"
        ></i>
        <h2 onClick={portfolioGo} className="max-[500px]:hidden">
          {firstName ? firstName + " " + lastName : "Your Name"}
        </h2>
      </div>
      <div className="relative flex items-center gap-2">
        
        <img
          style={{ objectFit: "cover", objectPosition: "top" }}
          src={
            photo
              ? IMGURL + photo
              : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          className="w-[45px] flex h-[45px] rounded-full cursor-pointer"
          onClick={openInfo}
          alt=""
        />
        {controlDropdown ? (
          <ul className="absolute w-[150px] flex flex-col items-start text-[17px] top-10 rounded -right-1 gap-1 bg-black p-2  text-white">
            <li
              onClick={() => navigate("/home")}
              className="py-[1px] w-full px-2 border-b pb-1 hover:bg-green-600 hover:text-white cursor-pointer"
            >
              View Portfolio
            </li>
            <li
              onClick={openAccount}
              className="py-[1px] w-full px-2 border-b pb-1 hover:bg-green-600 hover:text-white cursor-pointer"
            >
              <i className="fa-regular fa-user px-1"></i>
              Account
            </li>
            <li
              onClick={logOutUser}
              className="py-[1px] w-full px-2 border-b pb-1 hover:bg-green-600 hover:text-white cursor-pointer"
            >
              <i className="bi bi-box-arrow-right pr-1"></i>
              LogOut
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

export default HeaderUser;
