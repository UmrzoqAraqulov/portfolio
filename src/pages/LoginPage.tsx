import { useState } from "react";
import { useAuth } from "../states/auth";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  
  const [watchPassword, setWatchPassword] = useState(false);
  const [formLogin, setFormLogin] = useState({ username: "", password: "" });
  const { username, password } = formLogin;
  const iconEyeStyle = "fa-solid text-black text-sm cursor-pointer absolute top-2 right-2";

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormLogin({ ...formLogin, [name]: value });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formLogin,navigate)
  };
  
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-[500px] bg-style px-4 min-[400px]:px-[50px] pb-5 min-[400px]:pb-[50px]">
        <h2 className="text-center text-4xl py-3 font-semibold">Login</h2>
        <form
          className="flex flex-col gap-3"
          autoComplete="off"
          onSubmit={submit}
        >
          <div>
            <label
              className="w-full text-center inline-block pb-1 text-lg"
              htmlFor="username"
            >
              Username
            </label>
            <input
              required
              onChange={handleForm}
              value={username}
              id="username"
              name="username"
              className="w-full py-1.5 px-3 text-base text-black outline-none rounded-[4px]"
              type="text"
            />
          </div>
          <div>
            <label
              className="w-full text-center inline-block pb-1 text-lg"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                required
                onChange={handleForm}
                value={password}
                id="password"
                name="password"
                className="w-full rounded-[4px] py-1.5 bg-white px-3 text-base text-black outline-none"
                type={watchPassword ? "text" : "password"}
              />
              <i
                onClick={() => setWatchPassword(!watchPassword)}
                className={
                  watchPassword
                    ? iconEyeStyle + ` fa-eye`
                    : iconEyeStyle + ` fa-eye-slash`
                }
              ></i>
            </div>
          </div>
          <button
            typeof="submit"
            className="py-1.5 mt-4 text-xl bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
          <p className="text-center">
            If you don't have account{" "}
            <Link
              className="text-blue-500 linkRegister relative border-blue-500 hover:text-blue-400 font-semibold"
              to="/register"
            >
              Register
            </Link>
          </p>
          
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
