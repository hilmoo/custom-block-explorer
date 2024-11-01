import { getProvider } from "../helpers";

export const isContract = async (address) => {
  const provider = getProvider();
  const code = await provider.getCode(address);
  return code !== "0x";
};
