import { ethers } from "ethers";

export const bnToCurrency = (value, to = "gwei") => {
  try {
    // If value is already a BigNumber, use it directly
    if (ethers.BigNumber.isBigNumber(value)) {
      return ethers.utils.formatUnits(value, to);
    }

    // Convert string or number to a BigNumber based on the specified unit
    if (typeof value === "string" || typeof value === "number") {
      // If converting to a smaller unit (like "gwei"), parse as "ether" first to support fractional components
      const bigNumberValue = ethers.utils.parseUnits(value.toString(), "ether");
      return ethers.utils.formatUnits(bigNumberValue, "ether");
    }

    throw new Error(
      "Invalid value type: must be a BigNumber, string, or number."
    );
  } catch (error) {
    return 0;
  }
};
