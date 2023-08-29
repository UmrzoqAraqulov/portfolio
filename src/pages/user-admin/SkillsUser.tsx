import Modal from "../../components/modal";
import { useCallback, useEffect, useState } from "react";
import { PAGELIMIT } from "../../const";
import { request } from "../../server/request";
import { Empty, Pagination } from "antd";
import { toast } from "react-toastify";
import { SkillForm } from "../../types";
import SkillsCard from "../../components/cards/SkillsCard";
import { useAuth } from "../../states/auth";
import LoadingGreen from "../../components/loadingGreen";

const SkillsUser = () => {
  const { userId } = useAuth();

  const obj = {
    name: "",
    percent: "",
  };
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState(obj);

  const { name, percent } = skill;

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setSkill(obj);
    setShow(false);
    setSelected("");
  };

  const getSkills = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request(
        `skills?user=${userId}&page=${page}&limit=${PAGELIMIT}`
      );
      setTotal(data.pagination.total);
      setSkills(data.data);
    } finally {
      setLoading(false);
    }
  }, [page, userId]);

  useEffect(() => {
    getSkills();
  }, [getSkills]);

  const editSkill = async (id: string) => {
    setSelected(id);
    try {
      const { data } = await request(`skills/${id}`);
      const { name, percent } = data;
      setSkill({
        name,
        percent,
      });
      openModal();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSkill = async (id: string) => {
    const checkDelete = confirm("Do you want to delete this Skill?");
    if (checkDelete) {
      try {
        await request.delete(`skills/${id}`);
        getSkills();
        toast.success("Delete skill successfully");
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
    setSkill({ ...skill, [name]: value });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selected) {
      try {
        await request.put(`skills/${selected}`, skill);
        getSkills();
        toast.success("Changed successfully");
      } catch {
        toast.error("Error");
      }
    } else {
      try {
        await request.post(`skills`, skill);
        getSkills();
        toast.success("Skill added");
      } catch (err) {
        console.log(err);
      }
    }
    closeModal();
  };

  return (
    <section className="w-full h-full overflow-y-scroll">
      <div className="flex justify-between items-center bg-[#1F1E25] rounded-md p-2 flex-wrap gap-2">
        <h2 className="text-2xl text-white px-2 font-semibold">Skills</h2>
        <button
          onClick={()=>setShow(!show)}
          className="py-2 px-5 text-lg bg-green-500 rounded-md text-white hover:bg-green-600"
        >
          Add Skill
        </button>
      </div>
      {loading ? (
        <LoadingGreen/>
      ) :<div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[10px] mt-5">
        {skills?.map((el: SkillForm) => (
          <div key={el._id} className="bg-style p-2">
            <SkillsCard name={el.name} percent={el.percent} />
            <div className="flex justify-end mr-3 gap-2 mt-1">
              <i
                onClick={() => editSkill(el._id + "")}
                className="fa-solid text-lg text-green-500 cursor-pointer fa-pen-to-square"
              ></i>
              <i
                onClick={() => deleteSkill(el._id + "")}
                className="fa-solid text-lg text-red-500 cursor-pointer fa-trash-can"
              ></i>
            </div>
          </div>
        ))}
      </div>}
      {skills.length === 0 && !loading ? (
        <div className="w-full h-[200px] flex justify-center items-center">
          <Empty />
        </div>
      ) : null}
      {total > PAGELIMIT ? (
        <div className="w-full flex justify-center py-4">
          <Pagination current={page} onChange={onChange} total={total} />
        </div>
      ) : null}
      <Modal show={show}>
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-xl font-semibold">
            {selected ? "Editing " : "Adding "} Skill
          </h2>
          <i onClick={closeModal} className="fa-solid fa-x cursor-pointer"></i>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="name" className="font-semibold">
              Texnology name:
            </label>
            <input
              className="outline-none py-1 px-2 text-black w-[350px] rounded-sm"
              type="text"
              name="name"
              id="name"
              placeholder="Texnology name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="percent" className="font-semibold">
              Percent:
            </label>
            <input
              required
              className="outline-none py-1 px-2 text-black w-[350px] rounded-sm"
              type="text"
              name="percent"
              id="percent"
              placeholder="Percent"
              value={percent}
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
    </section>
  );
};

export default SkillsUser;
