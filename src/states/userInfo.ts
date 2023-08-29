import {create} from "zustand"
import {toast} from "react-toastify"
import { request } from "../server/request"
import { userInfo, userObj } from "../types";

type userType={
  userData:userInfo;
  loading:boolean;
  getUserData:()=>void; 
}

export const useUserInfo = create<userType>((set)=>({
  userData:userObj,
  loading:false,
  getUserData:async()=>{
    try{
      set({loading:true})
      const res = await request("auth/me");
      set({userData:res.data});
    }catch{    
      toast.error("Can't be delevret User data");      
    }finally{
      set({loading:false})
    }
  },
}))