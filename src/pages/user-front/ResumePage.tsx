import { useEffect } from "react";
import { useResume } from "../../states/resume";
import { EducationForm, ExperienceForm } from "../../types";
import { useAuth } from "../../states/auth";

const ResumePage = () => {
    const { userId } = useAuth();

  const { getEducations, getExperiences, educationsData, experiencesData } =
    useResume();

  useEffect(() => {
    getEducations(userId);
    getExperiences(userId);
  }, [getExperiences, getEducations, userId]);
  return (
    <section className="w-full bg-black bg-opacity-80 py-4 px-6 containr">
      <div className="startStyle">
        <h4>Resume</h4>
        <div></div>
      </div>
      <h2
        style={{ textTransform: "uppercase" }}
        className="text-[40px] font-bold max-[600px]:text-[34px] max-[400px]:text-[26px]"
      >
        Check My Resume
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-[26px] font-bold py-4">Educations</h3>
          <div className="resume border-l-2 border-l-[#272727] pl-[25px]">
            {educationsData.map((education: EducationForm) => (
              <div key={education._id}>
                <h4 className="resume-title">{education.name}</h4>
                <p className=" mt-4 flex justify-center py-1 bg-[#272727] w-[110px]">
                  {education.startDate.split("T")[0].split("-")[0] +
                    " - " +
                    education.endDate.split("T")[0].split("-")[0]}
                </p>
                <p className="my-1">{education.level}</p>
                <p>{education.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[26px] font-bold py-4">Experiences</h3>
          <div className="resume border-l-2 border-l-[#272727] pl-[25px]">
            {experiencesData.map((experience: ExperienceForm) => (
              <div key={experience._id}>
                <h4 className="resume-title">{experience.companyName}</h4>
                <p className=" mt-4 flex justify-center py-1 bg-[#272727] w-[110px]">
                  {experience.startDate.split("T")[0].split("-")[0] +
                    " - " +
                    experience.endDate.split("T")[0].split("-")[0]}
                </p>
                <p className="text-lg pt-2">{experience.companyName}</p>
                <p>{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumePage;
