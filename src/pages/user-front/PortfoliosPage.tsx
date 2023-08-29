import { usePortfolios } from "../../states/portfolios";
import { useEffect, useState } from "react";
import PortfolioCard from "../../components/cards/PortfolioCard";
import { PortfolioForm } from "../../types";
import { PAGELIMIT } from "../../const";
import { Pagination } from "antd";
import { useAuth } from "../../states/auth";

const PortfoliosPage = () => {
  const { userId } = useAuth();

  const { getPortfolios, portfoliosData, totalPortfolios } = usePortfolios();
  const [page, setPage] = useState(1);
  useEffect(() => {
    getPortfolios(userId, page, PAGELIMIT);
  }, [getPortfolios, userId, page]);

  const onChange = (current: number) => {
    setPage(current);
  };

  return (
    <section className="containr w-full bg-black bg-opacity-60 py-4 px-6 rounded">
      <div className="startStyle">
        <h4>SKILLS</h4>
        <div></div>
      </div>
      <h2
        style={{ textTransform: "uppercase" }}
        className="text-[40px] font-bold max-[600px]:text-[34px] max-[400px]:text-[26px]"
      >
        My works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3">
        {portfoliosData.map((pr: PortfolioForm) => (
          <PortfolioCard {...pr} key={pr._id} />
        ))}
      </div>
      {totalPortfolios > PAGELIMIT ? (
        <div className="w-full flex justify-center py-4">
          <Pagination
            current={page}
            onChange={onChange}
            total={totalPortfolios}
          />
        </div>
      ) : null}
    </section>
  );
};

export default PortfoliosPage;
