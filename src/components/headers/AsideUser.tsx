import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.webp";
import "./aside.scss";
const AsideUser = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { pathname } = useLocation();

  const linkStyle =
    "py-2 text-[#CCCCCA] min-w-[165px] inline-block rounded-md hover:bg-[#151419] hover:text-white" +
    (show ? " px-3" : " px-2 text-[20px]");
  const bar =
    "fixed top-[10px] left-2 bg-[#1F1E25] rounded-[15px] border border-[#37363D] flex flex-col justify-between overflow-hidden";
  return (
    <aside
      style={{ height: "calc(100vh - 20px)", transition: "0.4s" }}
      className={
        show ? bar + " w-[200px] p-4" : bar + " w-[40px] px-[3px] py-3"
      }
    >
      <div className="">
        <h2 className="flex text-white text-2xl pb-2 font-semibold">
          <img
            width="30px"
            style={{ borderRadius: "50%" }}
            className="w-[33px] mr-2"
            src={logo}
            alt="logo"
          />
          Portfolio
        </h2>
        <ul className="flex mt-1 flex-col gap-1 font-semibold">
          <li>
            <NavLink
              className={
                pathname === "/user-experiences"
                  ? linkStyle + " active"
                  : linkStyle
              }
              to="/user-experiences"
            >
              <i className="bi bi-graph-up-arrow pr-2"></i>
              Experiences
            </NavLink>
          </li>
          <li>
            <NavLink className={linkStyle} to="/user-skills">
              <i className="bi bi-card-checklist pr-2"></i>
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink className={linkStyle} to="/user-educations">
              <i className="bi bi-mortarboard-fill pr-2"></i>
              Educations
            </NavLink>
          </li>
          <li>
            <NavLink className={linkStyle} to="/user-portfolios">
              <i className="bi bi-briefcase-fill pr-2"></i>
              Portfolios
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        {show ? (
          <i
            onClick={() => setShow(false)}
            className="fa-solid fa-angle-left text-xl cursor-pointer w-full bg-white absolute bottom-0 bg-opacity-30 text-center py-2 backdrop-blur-md"
          ></i>
        ) : (
          <i
            onClick={() => setShow(true)}
            className="fa-solid fa-angle-right text-xl cursor-pointer w-full bg-white absolute bottom-0 bg-opacity-30 text-center py-2 backdrop-blur-md"
          ></i>
        )}
      </div>
    </aside>
  );
};

export default AsideUser;
