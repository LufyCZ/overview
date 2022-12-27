import { FC } from "react";
import Card from "../components/Cards/Card";
import Portfolio from "../components/Cards/Portfolio/Portfolio";

const IndexPage: FC = () => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-2">
        <Card title="Portfolio">
          <Portfolio />
        </Card>
      </div>
    </div>
  );
};

export default IndexPage;
