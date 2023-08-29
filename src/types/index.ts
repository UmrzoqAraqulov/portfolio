export interface userLogin {
  username: string;
  password: string;
}

export interface userInfo {
  firstName: string;
  lastName: string;
  username: string;
  fields: string[];
  info: string;
  phoneNumber: string;
  birthday: string;
  address: string;
  email: string;
  photo:string;
  github: string;
  linkedin: string;
  telegram: string;
  instagram: string;
  youtube: string;
  facebook: string;
}
export const userObj = {
  firstName: "",
  lastName: "",
  username: "",
  fields: [],
  info: "",
  photo:"",
  phoneNumber: "",
  birthday: "",
  address: "",
  email: "",
  github: "",
  linkedin: "",
  telegram: "",
  instagram: "",
  youtube: "",
  facebook: "",
};

export interface userLogin {
  username: string;
  password: string;
}

export interface userRegister {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface ExperienceForm {
  workName: string;
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
  _id?: string;
}
export interface EducationForm {
  name: string;
  level: string;
  description: string;
  startDate: string;
  endDate: string;
  _id?: string;
}
export interface PortfolioForm {
  name: string;
  url: string;
  description: string;
  photo: { _id: string; name: string };
  _id?: string;
}

export interface SkillForm {
  name: string;
  percent: number;
  _id: string;
}

export interface skillType {
  name: string;
  percent: number;
}
