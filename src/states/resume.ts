import { create } from "zustand";
import { request } from "../server/request";
import { toast } from "react-toastify";

interface resumeTypes {
  experiencesData: [];
  educationsData: [];
  getEducations:(id:string)=>void
  loading: boolean;
  getExperiences: (id: string) => void;
}

export const useResume = create<resumeTypes>((set)=>({
  experiencesData:[],
  educationsData:[],
  loading:false,
  getExperiences:async(id)=>{
    try{
      set({loading:true})
      const res = await request(`experiences?user=${id}`)
      set({experiencesData:res.data.data})
    }catch{
      toast.error("Can't be delevret Experiences data");
    }finally{
      set({loading:false})
    }
  },
  getEducations:async(id)=>{
    try{
      set({loading:true})
      const res = await request(`education?user=${id}`);
      set({educationsData:res.data.data})
    }catch{
      toast.error("Can't be delevret Education data");
    }finally{
      set({loading:false})
    }
  },
}))