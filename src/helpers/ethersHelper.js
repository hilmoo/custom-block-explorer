import { ethers } from "ethers";

// Function to get an Ethers provider (MetaMask or any other wallet)
export const getProvider = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_PROVIDER
  );
  return provider;
};

// Function to create a new contract instance
export const getContract = (contractAddress, abi, signer) => {
  return new ethers.Contract(contractAddress, abi, signer);
};

export const getSocketProvider = () => {
  const provider = new ethers.providers.WebSocketProvider(
    process.env.REACT_APP_WS_PROVIDER
  );
  return provider;
};
