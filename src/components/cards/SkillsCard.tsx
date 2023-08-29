import { skillType } from "../../types";

const SkillsCard = ({name,percent}:skillType) => {
  return (
    <div p-10>
      <div className="w-full flex justify-between px-3 pb-1">
        <h4 className="text-lg">{name}</h4>
        <p>{percent}%</p>
      </div>
      <div className="w-full h-[25px] rounded-full border border-[#18d26e] p-0.5 skill-percent">
        <div
          style={{ width: `${percent}%` }}
          className={`h-full  skill-percent`}
        >
          <div className="h-full bg-[#18d26e] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default SkillsCard