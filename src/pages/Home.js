import React from "react";

import SummaryCard from "../components/SummaryCard";
import Title from "../components/UI/Title";
import BlockListCard from "../components/BlockList";

const Home = () => {
  return (
    <div className="p-6">
      <div className="container py-8 mx-auto">
        <div className="flex justify-between items-center">
          <Title>Summary</Title>
        </div>
        <SummaryCard />
      </div>

      <div className="container py-8 mx-auto">
        {/* <Title> BlockList </Title> */}
        <BlockListCard />
      </div>
    </div>
  );
};

export default Home;
