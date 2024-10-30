import React from "react";

const CodeBlock = ({ label, content }) => {
  return (
    <div>
      {!!label && (
        <div className="flex text-center items-center my-2 text-black font-semibold mb-4">
          <span className="font-extrabold text-md">
            {"</> "} {label}
          </span>
        </div>
      )}
      <div className="bg-[#f9f9f9] border border-[#ebebeb] rounded-md text-[#3d3d3d] px-4 whitespace-break-spaces max-h-[200px] overflow-y-scroll">
        <div className="text-wrap break-words">{content}</div>
      </div>
    </div>
  );
};

export default CodeBlock;
