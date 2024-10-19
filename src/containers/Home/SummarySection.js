import React from "react";
import Title from "../../components/UI/Title";
import SummaryCard from "../../components/SummaryCard";

const SummarySection = () => {
  return (
    <div className="container py-8 mx-auto">
      <div className="flex justify-between items-center">
        <Title>Summary</Title>
      </div>
      <SummaryCard />
    </div>
  );
};

export default SummarySection;
