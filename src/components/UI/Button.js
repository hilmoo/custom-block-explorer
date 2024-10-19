import React from "react";

const Button = ({ label, className = "", ...rest }) => {
  return (
    <button
      className={`w-[stretch] text-white mx-3 p-2 rounded bg-black ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
