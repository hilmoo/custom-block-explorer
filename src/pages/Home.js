import React from "react";

import SummarySection from "../containers/Home/SummarySection";
import BlockListSection from "../containers/Home/BlockList";

const Home = () => {
  return (
    <div className="p-6">
      <SummarySection />

      <BlockListSection />
    </div>
  );
};

export default Home;
