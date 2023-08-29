import { create } from "zustand";
import { request } from "../server/request";
import { toast } from "react-toastify";

interface skillType {
  skillsData: [];
  loading:boolean;
  getSkills: (id: string) => void;
}

export const useSkills = create<skillType>((set) => ({
  loading:false,
  skillsData: [],
  getSkills: async (id) => {
    try {
      set({loading:true})
      const res = await request(`skills?user=${id}`);
      set({ skillsData: res.data.data });
    } catch (err) {
      toast.error("Can't be delevret Skills data");
    }
    finally{
      set({loading:false})
    }
  },
}));
