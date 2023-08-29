import Modal from "../../components/modal";
import { useCallback, useEffect, useState } from "react";
import { PAGELIMIT } from "../../const";
import { request } from "../../server/request";
import { Empty, Pagination } from "antd";
import { toast } from "react-toastify";
import { EducationForm } from "../../types";
import { useAuth } from "../../states/auth";
import LoadingGreen from "../../components/loadingGreen";

const EducationsUser = () => {
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();
  const obj = {
    name: "",
    level: "",
    description: "",
    startDate: "",
    endDate: "",
  };

  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [educations, setEducations] = useState([]);
  const [education, setEducation] = useState(obj);
  const [finish, setFinish] = useState(false);

  const { name, level, description, startDate, endDate } = education;

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setEducation(obj);
    setShow(false);
    setSelected("");
  };

  const getEducations = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request(
        `education?user=${userId}&page=${page}&limit=${PAGELIMIT}`
      );
      setTotal(data.pagination.total);
      setEducations(data.data);
    } finally {
      setLoading(false);
    }
  }, [page, userId]);

  useEffect(() => {
    getEducations();
  }, [getEducations]);

  const editEducation = async (id: string) => {
    setSelected(id);
    try {
      const { data } = await request(`education/${id}`);
      const { name, level, description, startDate, endDate } = data;
      setEducation({
        name,
        level,
        endDate: endDate.split("T")[0],
        startDate: startDate.split("T")[0],
        description,
      });
      openModal();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEducation = async (id: string) => {
    const checkDelete = confirm("Do you want to delete this education?");
    if (checkDelete) {
      try {
        await request.delete(`education/${id}`);
        getEducations();
        toast.success("Delete education successfully");
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
    setEducation({ ...education, [name]: value });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selected) {
      try {
        await request.put(`education/${selected}`, education);
        getEducations();
        toast.success("Changed successfully");
      } catch {
        toast.error("Error");
      }
    } else {
      try {
        await request.post(`education`, education);
        getEducations();
        toast.success("Education added");
      } catch (err) {
        console.log(err);
      }
    }
    closeModal();
  };

  return (
    <section className="w-full h-full overflow-y-scroll">
      <div className="flex justify-between items-center bg-[#1F1E25] rounded-md p-2 flex-wrap gap-2">
        <h2 className="text-2xl text-white px-2 font-semibold">Educations</h2>
        <button
          onClick={()=>setShow(!show)}
          className="py-2 px-5 text-lg bg-green-500 rounded-md text-white hover:bg-green-600"
        >
          Add Education
        </button>
      </div>
      {loading ? (
        <LoadingGreen/>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-3">
          {educations?.map((el: EducationForm) => (
            <div
              key={el._id}
              className="bg-[#1F1E25] rounded-xl p-2 border border-[#37363D]"
            >
              <h3 className="text-xl text-white">
                <span className="text-[#777679]">Company: </span>
                {el.name}
              </h3>
              <h3 className="text-xl text-white">
                <span className="text-[#777679]">Level: </span>
                {el.level}
              </h3>

              <h3 className="text-white text-xl">
                <span className="text-[#777679] text-xl">Company: </span>
                {el.description}
              </h3>
              <div className="flex gap-2 justify-center bg-white text-gray-800 bg-opacity-40 p-1 rounded">
                <p>{el.startDate.split("T")[0]} to </p>
                <p>{el.endDate.split("T")[0]} </p>
              </div>
              <div className="flex justify-center gap-2 mt-1">
                <i
                  onClick={() => editEducation(el._id + "")}
                  className="fa-solid text-lg text-green-500 cursor-pointer fa-pen-to-square"
                ></i>
                <i
                  onClick={() => deleteEducation(el._id + "")}
                  className="fa-solid text-lg text-red-500 cursor-pointer fa-trash-can"
                ></i>
              </div>
            </div>
          ))}
        </div>
      )}
      {educations.length === 0 && !loading ? (
        <div className="w-full h-[200px] flex justify-center items-center">
          <Empty />
        </div>
      ) : null}
      {total > 0 ? (
        <div className="w-full flex justify-center py-4">
          <Pagination current={page} onChange={onChange} total={total} />
        </div>
      ) : null}
      <Modal show={show}>
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-xl font-semibold">
            {selected ? "Editing " : "Adding "} Experince
          </h2>
          <i onClick={closeModal} className="fa-solid fa-x cursor-pointer"></i>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="name" className="font-semibold">
              Education:
            </label>
            <input
              className="outline-none py-1 px-2 text-black w-[350px] rounded-sm"
              type="text"
              name="name"
              id="name"
              placeholder="Education"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="level" className="font-semibold">
              Level:
            </label>
            <input
              required
              className="outline-none py-1 px-2 text-black w-[350px] rounded-sm"
              type="text"
              name="level"
              id="level"
              placeholder="Level"
              value={level}
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
            <div className="flex gap-2 items-center">
              {!finish ? (
                <input
                  className="outline-none py-1 px-2 text-black w-[280px] rounded-sm"
                  type="date"
                  name="endDate"
                  id="endDate"
                  placeholder="EndDate"
                  value={endDate}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  className="outline-none py-1 px-2 text-black w-[280px] rounded-sm"
                  name="endDate"
                  id="endDate"
                  placeholder="Study or Internship"
                  value={endDate}
                  onChange={handleChange}
                />
              )}
              <div>
                <label htmlFor="study" className="pr-1">
                  Athor:
                </label>
                <input type="checkbox" onChange={() => setFinish(!finish)} />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-1 rounded-sm bg-blue-500">
              {selected ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default EducationsUser;
