import { FC } from "react";
import { Card, Portfolio, Validators } from "components/Cards";

const IndexPage: FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Card title="Portfolio" className="md:col-span-3">
        <Portfolio />
      </Card>
      <Card title="Validators" className="md:col-span-2">
        <Validators />
      </Card>
    </div>
  );
};

export default IndexPage;
