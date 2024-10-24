export const truncateAddress = (address, first = 5, last = 5) => {
  if (typeof address != "string") return;

  return !!address
    ? `${address?.slice(0, first)}...${address?.slice(-last, address?.length)}`
    : null;
};
