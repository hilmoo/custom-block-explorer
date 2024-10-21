import React, { useEffect, useState } from "react";

const TabButton = ({
  items,
  onTabButtonClick,
  className = "",
  defaultActiveKey = "",
}) => {
  const [selectedKey, setSelectedKey] = useState(defaultActiveKey);

  useEffect(() => {
    setSelectedKey(defaultActiveKey);
  }, [defaultActiveKey]);

  const onButtonClick = (id) => {
    setSelectedKey(id);
    onTabButtonClick(id);
  };

  return (
    <div className="flex my-2">
      {items.map(({ label, value, ...rest }) => (
        <button
          {...rest}
          className={`mx-3 p-2 rounded ${className} ${
            value === selectedKey
              ? "text-white bg-black"
              : "text-black bg-transparent hover:bg-black-800 text-white"
          }`}
          onClick={() => onButtonClick(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TabButton;
