import { ethers } from "ethers";

export const getCurrencyInGwei = (value) => {
  return ethers.utils.formatUnits(value.toString(), "gwei");
};
