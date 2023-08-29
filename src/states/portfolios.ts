import {create} from "zustand";
import { request } from "../server/request";

type portfolioType = {
  totalPortfolios: number;
  portfoliosData: [];
  getPortfolios: (userId:string, page:number, pageLimit:number) => void;
};

export const usePortfolios = create<portfolioType>((set)=>({
  totalPortfolios:0,
  portfoliosData:[],
  getPortfolios :async (userId,page,pageLimit) => {
    const res = await request(
      `portfolios?user=${userId}&page=${page}&limit=${pageLimit}`
    );
    set({totalPortfolios:res.data.pagination.total});
    set({portfoliosData:res.data.data});
  },
}))