import { create } from "zustand";
import { TOKEN, USERID } from "../const";
import Cookies from "js-cookie";
import { request } from "../server/request";
import { NavigateFunction } from "react-router-dom";
import { userLogin, userRegister } from "../types";

type AuthTypes = {
  isAuthenticated: boolean;
  userId: string;
  login: (data: userLogin, navigate: NavigateFunction) => void;
  register: (data: userRegister, navigate: NavigateFunction) => void;
  logOut: (navigate: NavigateFunction) => void;
};

export const useAuth = create<AuthTypes>((set) => ({
  isAuthenticated: Cookies.get(TOKEN) ? true : false,
  userId: Cookies.get(USERID) || "",
  login: async (data, navigate) => {
    try {
      const res = await request.post("auth/login", data);
      if (res.data.user.role === "user") navigate("/client");
      else {
        Cookies.set(TOKEN, res.data.token);
        Cookies.set(USERID, res.data.user._id);
        request.defaults.headers.Authorization = `Bearer ${res.data.token}`;
        set({ isAuthenticated: true });
        set({ userId: res.data.user._id });
        navigate("/user-experiences");
      }
    } catch (err) {
      console.log(err);
    }
  },
  register: async (data, navigate) => {
    try {
      const res = await request.post("auth/register", data);
      if (res.data.user.role === "user") navigate("/client");
      else {
        Cookies.set(TOKEN, res.data.token);
        Cookies.set(USERID, res.data.user._id);
        request.defaults.headers.Authorization = `Bearer ${res.data.token}`;
        set({ isAuthenticated: true });
        set({ userId: res.data.user._id });
        navigate("/user-experiences");
      }
    } catch (err) {
      console.log(err);
    }
  },
  logOut: async (navigate) => {
    Cookies.remove(TOKEN);
    Cookies.remove(USERID);
    set({ isAuthenticated: false });
    set({ userId: "" });
    navigate("/login");
  },
}));
