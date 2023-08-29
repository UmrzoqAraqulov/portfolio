import Modal from "../../components/modal";
import { useCallback, useEffect, useState } from "react";
import { PAGELIMIT } from "../../const";
import { request } from "../../server/request";
import { Empty, Pagination } from "antd";
import { toast } from "react-toastify";
import { ExperienceForm } from "../../types";
import { useAuth } from "../../states/auth";
import LoadingGreen from "../../components/loadingGreen";

const ExperiencesUser = () => {
  const { userId } = useAuth();
  const obj = {
    workName: "",
    companyName: "",
    description: "",
    startDate: "",
    endDate: "",
  };
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [experiences, setExperiences] = useState([]);
  const [experience, setExperience] = useState(obj);

  const { workName, companyName, description, startDate, endDate } = experience;

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setExperience(obj);
    setShow(false);
    setSelected("");
  };

  const getExperiences = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request(
        `experiences?user=${userId}&page=${page}&limit=${PAGELIMIT}`
      );
      setTotal(data.pagination.total);
      setExperiences(data.data);
    } finally {
      setLoading(false);
    }
  }, [page, userId]);

  useEffect(() => {
    getExperiences();
  }, [getExperiences]);

  const editExperience = async (id: string) => {
    setSelected(id);
    try {
      const { data } = await request(`experiences/${id}`);
      const { companyName, description, workName, startDate, endDate } = data;
      setExperience({
        companyName,
        workName,
        endDate: endDate.split("T")[0],
        startDate: startDate.split("T")[0],
        description,
      });
      openModal();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExperience = async (id: string) => {
    const checkDelete = confirm("Do you want to delete this experience?");
    if (checkDelete) {
      try {
        await request.delete(`experiences/${id}`);
        getExperiences();
        toast.success("Delete experience successfully");
      } catch {
        toast.error("An error occurred, please try again");
      }
    }
  };

  const onChange = (change: number) => {
    setPage(change);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setExperience({ ...experience, [name]: value });
  };

  const valuesModal = {
    selected,
    title: "Experinces",
    show,
    openModal,
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selected) {
      try {
        await request.put(`experiences/${selected}`, experience);
        getExperiences();
        toast.success("Changed successfully");
      } catch {
        toast.error("Error");
      }
    } else {
      try {
        await request.post(`experiences`, experience);
        getExperiences();
        toast.success("Experience added");
      } catch (err) {
        console.log(err);
      }
    }
    closeModal();
  };

  return (
    <section className="w-full h-full overflow-y-scroll">
      <div className="flex justify-between items-center bg-[#1F1E25] rounded-md p-2 flex-wrap gap-2">
        <h2 className="text-2xl text-white px-2 font-semibold">Experiences</h2>
        <button
          onClick={()=>setShow(!show)}
          className="py-2 px-5 text-lg bg-green-500 rounded-md text-white hover:bg-green-600"
        >
          Add Experience
        </button>
      </div>
      {loading ? (
        <LoadingGreen/>
      ) : (
        <div className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[800px]:grid-cols-3 min-[1000px]:grid-cols-4 gap-2 pt-3">
          {experiences?.map((el: ExperienceForm) => (
            <div
              key={el._id}
              className="bg-[#1F1E25] rounded-xl p-2 border border-[#37363D] "
            >
              <h3 className="text-xl text-white">
                <span className="text-[#777679]">Company : </span>
                {el.companyName}
              </h3>
              <h3 className="text-xl text-white">
                <span className="text-[#777679]">Field: </span> {el.workName}
              </h3>
              <h3 className="text-white text-xl">
                <span className="text-[#777679]">Level: </span> {el.description}
              </h3>
              <div className="flex gap-2 justify-center bg-white text-gray-800 bg-opacity-40 p-1 rounded">
                <p>{el.startDate.split("T")[0]} to </p>
                <p>{el.endDate.split("T")[0]} </p>
              </div>
              <div className="flex justify-center gap-2 mt-1">
                <i
                  onClick={() => editExperience(el._id + "")}
                  className="fa-solid text-lg text-green-500 cursor-pointer fa-pen-to-square"
                ></i>
                <i
                  onClick={() => deleteExperience(el._id + "")}
                  className="fa-solid text-lg text-red-500 cursor-pointer fa-trash-can"
                ></i>
              </div>
            </div>
          ))}
        </div>
      )}
      {experiences.length === 0 && !loading ? (
        <div className="w-full h-[200px] flex justify-center items-center">
          <Empty />
        </div>
      ) : null}
      {total > PAGELIMIT ? (
        <div className="w-full flex justify-center py-4">
          <Pagination current={page} onChange={onChange} total={total} />
        </div>
      ) : null}
      <Modal {...valuesModal}>
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-xl font-semibold">
            {selected ? "Editing " : "Adding "} Experince
          </h2>
          <i onClick={closeModal} className="fa-solid fa-x cursor-pointer"></i>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="companyName" className="font-semibold">
              CompanyName:
            </label>
            <input
              className="outline-none py-1 px-2 text-black w-[350px] rounded-sm"
              type="text"
              name="companyName"
              id="companyName"
              placeholder="CompanyName"
              value={companyName}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="workName" className="font-semibold">
              WorkName:
            </label>
            <input
              required
              className="outline-none py-1 px-2 text-black w-[350px] rounded-sm"
              type="text"
              name="workName"
              id="workName"
              placeholder="WorkName"
              value={workName}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="description" className="font-semibold">
              Description:
            </label>
            <input
              className="outline-none py-1 px-2 text-black w-[350px] rounded-sm"
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={description}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="startDate" className="font-semibold">
              StartDate:
            </label>
            <input
              className="outline-none py-1 px-2 text-black w-[350px] rounded-sm"
              type="date"
              name="startDate"
              id="startDate"
              placeholder="StartDate"
              value={startDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="endDate" className="font-semibold">
              EntDate:
            </label>
            <input
              className="outline-none py-1 px-2 text-black w-[350px] rounded-sm"
              type="date"
              name="endDate"
              id="endDate"
              placeholder="EndDate"
              value={endDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-1 rounded-sm bg-blue-500">
              {selected ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
      <div className="">

      </div>
    </section>
  );
};

export default ExperiencesUser;
