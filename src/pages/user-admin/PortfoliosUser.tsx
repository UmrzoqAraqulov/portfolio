import Modal from "../../components/modal";
import { useCallback, useEffect, useState } from "react";
import { IMGURL, PAGELIMIT } from "../../const";
import { request } from "../../server/request";
import { Pagination } from "antd";
import { toast } from "react-toastify";
import { PortfolioForm } from "../../types";
import { Link } from "react-router-dom";
import { useAuth } from "../../states/auth";
import LoadingGreen from "../../components/loadingGreen";

const PortfoliosUser = () => {
  const { userId } = useAuth();
  const obj = {
    name: "",
    description: "",
    photo: { name: "", _id: "" },
    url: "",
  };

  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [portfolios, setPortfolios] = useState([]);
  const [portfolio, setPortfolio] = useState(obj);
  const [img, setImg] = useState({ name: "", _id: "" });

  const { name, url, description } = portfolio;

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setPortfolio(obj);
    setShow(false);
    setSelected("");
  };

  const getPortfolios = useCallback(async () => {
    try{
      setLoading(true)
      const { data } = await request(
        `portfolios?user=${userId}&page=${page}&limit=${PAGELIMIT}`
      );
      setTotal(data.pagination.total);
      setPortfolios(data.data);
    }finally{
      setLoading(false)
    }
  }, [page, userId]);

  useEffect(() => {
    getPortfolios();
  }, [getPortfolios]);

  const editPortfolio = async (id: string) => {
    setSelected(id);
    try {
      const { data } = await request(`portfolios/${id}`);
      const { name, url, photo, description } = data;
      setPortfolio({
        name,
        url,
        description,
        photo,
      });
      openModal();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePortfolio = async (id: string) => {
    const checkDelete = confirm("Do you want to delete this portfolio?");
    if (checkDelete) {
      try {
        await request.delete(`portfolios/${id}`);
        getPortfolios();
        toast.success("Delete portfolio successfully!");
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
    setPortfolio({ ...portfolio, [name]: value });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selected) {
      try {
        await request.put(`portfolios/${selected}`, {
          ...portfolio,
          photo: img._id,
        });
        getPortfolios();
        toast.success("Changed successfully");
      } catch {
        toast.error("Error");
      }
    } else {
      try {
        await request.post(`portfolios`, { ...portfolio, photo: img._id });
        getPortfolios();
        toast.success("Experience added");
      } catch (err) {
        console.log(err);
      }
    }
    closeModal();
  };

  const changeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.files?.[0];
    const form = new FormData();
    result && form.append("file", result);
    try {
      const { data } = await request.post("upload", form);
      setImg(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center bg-[#1F1E25] rounded-md p-2 flex-wrap gap-2">
        <h2 className="text-2xl text-white font-semibold">Portfolios</h2>
        <button
          onClick={() => setShow(!show)}
          className="py-2 px-5 text-lg bg-green-500 rounded-md text-white hover:bg-green-600"
        >
          Add Portfolio
        </button>
      </div>
      <div
        style={{ height: "calc(100vh - 210px)" }}
        className="overflow-y-scroll mt-2 "
      >
        {loading ? (
          <LoadingGreen />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {portfolios?.map((el: PortfolioForm) => (
              <div
                key={el._id}
                className="bg-[#1F1E25] rounded-xl p-2 border border-[#37363D]"
              >
                <img
                  className="w-full max-h-[200px] object-cover"
                  src={
                    el.photo._id
                      ? IMGURL +
                        el.photo._id +
                        "." +
                        el.photo.name.split(".")[1]
                      : ""
                  }
                  alt=""
                />
                <h2 className="text-xl text-white text-center mt-1">
                  {el.name}
                </h2>
                <p className="text-white">{el.description}</p>
                <Link
                  to={el.url}
                  className="bg-blue-500 text-white mx-auto flex w-[130px] py-1 mt-2 justify-center hover:bg-blue-600 rounded"
                >
                  Go web site
                </Link>
                <div className="flex justify-center gap-2 mt-1">
                  <i
                    onClick={() => editPortfolio(el._id + "")}
                    className="fa-solid text-lg text-green-500 cursor-pointer fa-pen-to-square"
                  ></i>
                  <i
                    onClick={() => deletePortfolio(el._id + "")}
                    className="fa-solid text-lg text-red-500 cursor-pointer fa-trash-can"
                  ></i>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {total > 0 ? (
        <div className="w-full flex justify-center py-4">
          <Pagination current={page} onChange={onChange} total={total} />
        </div>
      ) : null}
      <Modal show={show}>
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-xl font-semibold">
            {selected ? "Editing " : "Adding "} Portfolio
          </h2>
          <i onClick={closeModal} className="fa-solid fa-x cursor-pointer"></i>
        </div>
        <div className="mb-2">
          <img
            className="w-[200px] mb-2"
            src={img._id ? IMGURL + img._id + "." + img.name.split(".")[1] : ""}
            alt="portfolio"
          />
          <input type="file" onChange={changeImg} />
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="name" className="font-semibold">
              SiteName:
            </label>
            <input
              className="outline-none py-1 px-2 text-black w-[350px] rounded-sm"
              type="text"
              name="name"
              id="name"
              placeholder="SiteName"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-1 items-center justify-between">
            <label htmlFor="url" className="font-semibold">
              SiteUrl:
            </label>
            <input
              required
              className="outline-none py-1 px-2 text-black w-[350px] rounded-sm"
              type="text"
              name="url"
              id="url"
              placeholder="SiteUrl"
              value={url}
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

export default PortfoliosUser;
