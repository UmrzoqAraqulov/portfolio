import { Tabs } from "antd";
import type { TabsProps } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import { IMGURL } from "../../const";
import { request } from "../../server/request";
import { toast } from "react-toastify";
import { userObj } from "../../types";
import LoadingGreen from "../../components/loadingGreen";

const items: TabsProps["items"] = [
  {
    key: "account",
    label: <IconAccount />,
    children: <EditAccount />,
  },
  {
    key: "password",
    label: <IconSecurity />,
    children: <EditPassword />,
  }
];

const AccountPage = () => {

  return (
    <div
      style={{ height: "calc(100vh - 80px)" }}
      className="bg-white rounded-md px-3"
    >
      <Tabs defaultActiveKey="account" items={items} />
    </div>
  );
};

export default AccountPage;

function EditAccount() {
  const [img, setImg] = useState("");
  const [user, setUser] = useState({...userObj,fields:""});
  const [loading,setLoading] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true)
      const res = await request(`auth/me`);
      setUser({
        ...res.data,
        fields: res.data.fields.join(),
        birthday: res.data.birthday.split("T")[0],
      });
      setImg(res.data.photo);
    } catch (err) {
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const {
    firstName,
    lastName,
    username,
    fields,
    info,
    phoneNumber,
    birthday,
    address,
    email,
    github,
    linkedin,
    telegram,
    instagram,
    youtube,
  } = user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const changeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.files?.[0];
    const form = new FormData();
    result && form.append("file", result);
    try {
      const { data } = await request.post("auth/upload", form);
      setImg(data);
    } catch (err) {
      console.log(err);
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await request.put("auth/updatedetails", { ...user, photo: img });
      toast.success("Update Account");
    } catch (err) {
      console.log(err);
    }
  };

  const styleLegent = "text-[12px] text-gray-600";
  const styleFieldset = "border bg-white h-[55px]  px-2 rounded-md";
  return (
    <div
      style={{ height: "calc(100vh - 150px)" }}
      className="overflow-y-scroll"
    >
      {loading?<LoadingGreen/>:<Fragment>
        <div className="mx-auto w-[200px]">
          <img
            className="w-[200px] h-[200px] object-center object-cover rounded-full mb-2"
            src={
              img
                ? IMGURL + img
                : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            alt=""
          />
          <input type="file" onChange={changeImg} />
        </div>

        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 text-base"
        >
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>First Name</legend>
            <input
              type="text"
              name="firstName"
              value={firstName}
              placeholder="Umrzoq"
              onChange={handleChange}
              className="w-full outline-none"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>Last Name</legend>
            <input
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Araqulov"
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>Username</legend>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="umrzoqcreator"
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>Fields</legend>
            <input
              type="text"
              name="fields"
              value={fields}
              placeholder="Frontend developer,Backend developer"
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>User Info</legend>
            <input
              type="text"
              name="info"
              value={info}
              placeholder="An undergraduate IT student, young software developer"
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>Phone Number</legend>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="+998 91 779 69 23"
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>Birthday</legend>
            <input
              type="date"
              name="birthday"
              value={birthday}
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>Address</legend>
            <input
              type="text"
              name="address"
              value={address}
              placeholder="Samarqand viloyati,Pastdarg'om tuman,Ilm MFY"
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>Email</legend>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="mrumrzoqaraqulov@gmail.com"
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>Github</legend>
            <input
              type="text"
              name="github"
              value={github}
              placeholder="https://github.com/UmrzoqAraqulov"
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>Linkedin</legend>
            <input
              type="text"
              name="linkedin"
              value={linkedin}
              placeholder="https://www.linkedin.com/in/umrzoq-araqulov-b218b5286/"
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>Telegram</legend>
            <input
              type="text"
              name="telegram"
              value={telegram}
              placeholder="https://t.me/araqulov_0323"
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>Instagram</legend>
            <input
              type="text"
              name="instagram"
              value={instagram}
              placeholder="https://www.instagram.com/"
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>You Tube</legend>
            <input
              type="text"
              name="youtube"
              value={youtube}
              placeholder="https://www.youtube.com/"
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <button className="form-btn mx-auto">Save</button>
        </form>
      </Fragment>}
    </div>
  );
}

function EditPassword() {
  const objPassword = {
    username: "",
    currentPassword:"",
    newPassword:"",
  };

  const [watchPassword, setWatchPassword] = useState(false);
  const [password, setPassword] = useState(objPassword);

  const {username,currentPassword,newPassword} = password;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await request.put("auth/updatepassword", password);
      toast.success("Update Password");
      setPassword(objPassword);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const iconEyeStyle =
    "fa-solid text-black text-sm cursor-pointer absolute top-[2px] right-2";
  const styleLegent = "text-[12px] text-gray-600";
  const styleFieldset = "border bg-white h-[60px]  px-2 rounded-md";
  return (
    <div
      style={{ height: "calc(100vh - 150px)" }}
      className="overflow-y-scroll"
    >
      <form onSubmit={submit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-base">
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>Username</legend>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="umrzoqcreator"
              onChange={handleChange}
              className="w-full outline-none h-[30px]"
            />
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>Current Password</legend>
            <div className="relative">
              <input
                required
                onChange={handleChange}
                value={currentPassword}
                id="currentPassword"
                name="currentPassword"
                className="w-full bg-white px-3 text-base text-black outline-none"
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
          </fieldset>
          <fieldset className={styleFieldset}>
            <legend className={styleLegent}>New Password</legend>
            <div className="relative">
              <input
                required
                onChange={handleChange}
                value={newPassword}
                id="newPassword"
                name="newPassword"
                className="w-full bg-white px-3 text-base text-black outline-none"
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
          </fieldset>
        </div>

        <div className="w-full flex justify-center pt-[30px]">
          <button className="form-btn mx-auto">Save</button>
        </div>
      </form>
    </div>
  );
}

function IconAccount() {
  return (
    <span className="flex items-center">
      <i className="fa-regular fa-user px-1"></i>
      <p className="text-sm font-semibold">ACCOUNT</p>
    </span>
  );
}

function IconSecurity() {
  return (
    <span className="flex items-center ">
      <i className="bi bi-shield-lock-fill pr-1"></i>
      <p className="text-sm font-semibold">SECURITY</p>
    </span>
  );
}
