export const getReadFunctions = (abi) => {
  return (
    abi &&
    abi.filter(
      (item) =>
        item.type === "function" &&
        (item.stateMutability === "view" || item.stateMutability === "pure")
    )
  );
};

export const getWriteFunctions = (abi) => {
  return (
    abi &&
    abi.filter(
      (item) =>
        item.type === "function" &&
        (item.stateMutability === "nonpayable" ||
          item.stateMutability === "payable")
    )
  );
};
