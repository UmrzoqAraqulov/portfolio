import { useState } from "react";
import { useAuth } from "../states/auth";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [watchPassword, setWatchPassword] = useState(false);
  const [formRegister, setFormRegister] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });
  const { username, password, firstName, lastName, email } = formRegister;
  const iconEyeStyle = "fa-solid text-black text-sm cursor-pointer";

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormRegister({ ...formRegister, [name]: value });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formRegister, navigate);
  };
  return (
    <div className="w-screen h-screen overflow-y-scroll">
      <div className="flex justify-center w-full">
        <div className="w-[500px] bg-style px-4 min-[400px]:px-[50px] pb-5 min-[400px]:pb-[50px]">
          <h2 className="text-center text-4xl py-3 font-semibold">Register</h2>
          <form
            className="flex flex-col gap-3"
            autoComplete="off"
            onSubmit={submit}
          >
            <div>
              <label
                className="w-full text-center inline-block pb-1 text-lg"
                htmlFor="firstName"
              >
                FirstName
              </label>
              <input
                required
                onChange={handleForm}
                value={firstName}
                id="firstName"
                name="firstName"
                className="w-full py-1.5 px-3 text-base text-black outline-none rounded-[4px]"
                type="text"
              />
            </div>
            <div>
              <label
                className="w-full text-center inline-block pb-1 text-lg"
                htmlFor="lastName"
              >
                LastName
              </label>
              <input
                required
                onChange={handleForm}
                value={lastName}
                id="lastName"
                name="lastName"
                className="w-full py-1.5 px-3 text-base text-black outline-none rounded-[4px]"
                type="text"
              />
            </div>
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
                Email
              </label>
              <div className="rounded-[4px] flex items-center bg-white px-3">
                <input
                  required
                  onChange={handleForm}
                  value={email}
                  id="email"
                  name="email"
                  className="w-full py-1.5 bg-transparent text-base text-black outline-none"
                  type="email"
                />
              </div>
            </div>
            <div>
              <label
                className="w-full text-center inline-block pb-1 text-lg"
                htmlFor="password"
              >
                Password
              </label>
              <div className="rounded-[4px] flex items-center bg-white px-3">
                <input
                  required
                  onChange={handleForm}
                  value={password}
                  id="password"
                  name="password"
                  className="w-full py-1.5 bg-transparent text-base text-black outline-none"
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
