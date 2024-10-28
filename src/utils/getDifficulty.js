import { ethers } from "ethers";

export const getDifficulty = (difficulty) => {
  if (ethers.BigNumber.isBigNumber(difficulty)) {
    return ethers.utils.formatUnits(difficulty);
  } else {
    return 0;
  }
};
