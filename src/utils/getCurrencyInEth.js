import { ethers } from "ethers";

export const getCurrencyInEth = (value) => {
  return ethers.utils.formatUnits(value, "ether");
};
