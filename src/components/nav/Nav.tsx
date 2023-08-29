import { NavLink } from "react-router-dom";

const Nav = ({ show, setShow }: { show: boolean; setShow: (el:boolean) => void }) => {
  return (
    <ul
      style={{ transition: "0.4s" }}
      className={
        (show ? "max-[800px]:top-0" : "max-[800px]:-top-[100%]") +
        " flex gap-4 text-xl z-10 max-[800px]:fixed max-[800px]:flex-col max-[800px]:w-full max-[800px]:items-center max-[800px]:bg-black max-[800px]:left-0 max-[800px]:h-[100%] max-[800px]:bg-opacity-30 max-[800px]:backdrop-blur-md  max-[800px]:justify-center  text-[#cecece] frondNav"
      }
    >
      <li>
        <NavLink onClick={() => setShow(false)} to="/home">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink onClick={() => setShow(false)} to="/about">
          About
        </NavLink>
      </li>
      <li>
        <NavLink onClick={() => setShow(false)} to="/resume">
          Resume
        </NavLink>
      </li>
      <li>
        <NavLink onClick={() => setShow(false)} to="/portfolios">
          Portfolios
        </NavLink>
      </li>
      <li>
        <NavLink onClick={() => setShow(false)} to="/contact">
          Contact
        </NavLink>
      </li>
      <i
        onClick={() => setShow(false)}
        className="fa-solid fa-xmark absolute top-3 right-5 text-2xl hidden max-[800px]:block cursor-pointer"
      ></i>
    </ul>
  );
};

export default Nav;
