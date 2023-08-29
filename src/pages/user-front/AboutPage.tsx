import { useEffect } from "react";
import { skillType } from "../../types";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSkills } from "../../states/skills";
import SkillsCard from "../../components/cards/SkillsCard";
import { IMGURL } from "../../const";
import img from "../../assets/images/me.jpg";
import LoadingFront from "../../components/loading/LoadingFront";
import { useUserInfo } from "../../states/userInfo";
import { useAuth } from "../../states/auth";

const AboutPage = () => {
  const { getSkills, skillsData, loading } = useSkills();
  const { getUserData, userData } = useUserInfo();
  const { userId } = useAuth();

  useEffect(() => {
    getSkills(userId);
    getUserData();
  }, [getSkills, userId, getUserData]);
  const { fields, birthday, phoneNumber, email, address, info, photo } =
    userData;

  const getDate = (date: string) => {
    const month = [
      "Januare",
      "Februare",
      "Match",
      "April",
      "May",
      "June",
      "Jule",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const arr = date.split("T")[0].split("-");
    const res = arr[2] + " " + month[+arr[1] - 1] + " " + arr[0];
    return res;
  };

  const getAge = (date: string) => {
    const nowYear = new Date().getFullYear();
    return nowYear - +date.split("T")[0].split("-")[0];
  };

  const styleList = "font-bold text-[17px] max-[400px]:text-[14px]";
  const arr = [
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit Obcaecati sapiente saepe itaque perferendis tempore fuga cum id iure libero. Vero ducimus numquam minima nesciunt? Ullam est asperiores ducimus iusto magnam.",
      name: "Jena Karlis",
      title: "1",
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit Obcaecati sapiente saepe itaque perferendis tempore fuga cum id iure libero. Vero ducimus numquam minima nesciunt? Ullam est asperiores ducimus iusto magnam.",
      name: "Jena Karlis",
      title: "12",
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit Obcaecati sapiente saepe itaque perferendis tempore fuga cum id iure libero. Vero ducimus numquam minima nesciunt? Ullam est asperiores ducimus iusto magnam.",
      name: "Jena Karlis",
      title: "123",
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit Obcaecati sapiente saepe itaque perferendis tempore fuga cum id iure libero. Vero ducimus numquam minima nesciunt? Ullam est asperiores ducimus iusto magnam.",
      name: "Jena Karlis",
      title: "1234",
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit Obcaecati sapiente saepe itaque perferendis tempore fuga cum id iure libero. Vero ducimus numquam minima nesciunt? Ullam est asperiores ducimus iusto magnam.",
      name: "Jena Karlis",
      title: "12345",
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit Obcaecati sapiente saepe itaque perferendis tempore fuga cum id iure libero. Vero ducimus numquam minima nesciunt? Ullam est asperiores ducimus iusto magnam.",
      name: "Jena Karlis",
      title: "123456",
    },
  ];
  return (
    <div className="w-full bg-black bg-opacity-80 py-4 px-6 containr">
      <div className="startStyle">
        <h4>ABOUT</h4>
        <div></div>
      </div>
      <h2
        style={{ textTransform: "uppercase" }}
        className="text-[40px] font-bold max-[600px]:text-[34px] max-[400px]:text-[26px]"
      >
        Learn more about me
      </h2>
      <div className="w-full flex gap-5 min-[800px]:flex-row flex-col">
        <img
          style={{ objectPosition: "top" }}
          className="w-[350px] max-[800px]:w-[400px] max-[800px]:mx-auto max-[600px]:w-full h-[400px] max-[800px]:h-[500px] max-[600px]:h-[350px] max-[400px]:h-[250px] object-cover rounded"
          src={IMGURL + photo}
          alt=""
        />
        <div className="w-[60%] max-[800px]:w-full">
          <h3 className="text-3xl font-semibold text-[#18d26e] max-[400px]:text-[24px]">
            {fields.join(" & ")}
          </h3>
          <p
            style={{ fontStyle: "italic" }}
            className="py-2 max-[400px]:text-[14px]"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio
            molestiae nobis, explicabo temporibus totam dolor!
          </p>
          <ul className="grid grid-cols-1 min-[800px]:grid-cols-2 gap-2 about-list max-[400px]:text-[12px]">
            <li>
              <span className={styleList}>Birthday:</span>
              {" " + getDate(birthday)}
            </li>
            <li>
              <span className={styleList}>Website: </span>
              <Link to="1">AAAAAAA</Link>
            </li>
            <li>
              <span className={styleList}>Phone: </span>
              {phoneNumber}
            </li>
            <li>
              <span className={styleList}>Address: </span> {address}
            </li>
            <li>
              <span className={styleList}>Age: </span>
              {getAge(birthday)}
            </li>
            <li>
              <span className={styleList}>Degree: </span>
              Junior
            </li>
            <li>
              <span className={styleList}>PhEmailone: </span>
              <Link to={`mailto:${email}`}>{email}</Link>
            </li>
            <li>
              <span className={styleList}>Freelance: </span>
              Available
            </li>
          </ul>
          <p className="py-3 max-[400px]:text-[14px]">{info}</p>
        </div>
      </div>
      <div className="startStyle pt-10 pb-4">
        <h4>SKILLS</h4>
        <div></div>
      </div>
      <div className="grid grid-cols-2 max-[800px]:grid-cols-1 gap-3">
        {skillsData?.map((skill: skillType) => (
          <SkillsCard {...skill} />
        ))}
      </div>
      {loading ? (
        <div className="fixed z-30 bg-white bg-opacity-20 backdrop-blur-md flex justify-center items-center top-0 left-0 w-screen h-screen">
          <LoadingFront />
        </div>
      ) : null}
    </div>
  );
};

export default AboutPage;
