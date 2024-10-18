import { ethers } from "ethers";

const getProvider = () =>
  new ethers.providers.JsonRpcProvider(process.env.REACT_APP_WEB3_PROVIDER);

const getBlockNumber = async () => {
  const provider = getProvider();
  console.log({ provider });
  return provider.getBlockNumber();
};

export { getProvider, getBlockNumber };
