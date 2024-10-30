import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { getContract, getProvider } from "../helpers";

const provider = getProvider();

// ABI snippets for common contract types
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
];
const ERC721_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function ownerOf(uint256) view returns (address)",
];
const DEFI_ABI = [
  "function deposit(uint256) payable",
  "function borrow(uint256)",
  "function stake(uint256)",
]; // DeFi-specific functions

export const useContractDetails = (address) => {
  const [contractDetails, setContractDetails] = useState({
    type: "Unknown",
    deploymentCode: null,
    defiFeatures: null,
  });

  const fetchContractDetails = useCallback(async () => {
    try {
      const bytecode = await provider.getCode(address);
      let contractType = "Unknown";
      let tokenInfo = null;
      let defiFeatures = null;

      // Check if ERC-20
      const contractERC20 = getContract(address, ERC20_ABI, provider);
      try {
        const [name, symbol, decimals] = await Promise.all([
          contractERC20.name(),
          contractERC20.symbol(),
          contractERC20.decimals(),
        ]);
        contractType = "ERC-20";
        tokenInfo = { name, symbol, decimals };
      } catch (error) {
        // Not an ERC-20 contract
      }

      // Check if ERC-721 (NFT)
      if (contractType === "Unknown") {
        const contractERC721 = getContract(address, ERC721_ABI, provider);
        try {
          const [name, symbol] = await Promise.all([
            contractERC721.name(),
            contractERC721.symbol(),
          ]);
          contractType = "ERC-721";
          tokenInfo = { name, symbol };
        } catch (error) {
          // Not an ERC-721 contract
        }
      }

      const contractDeFi = getContract(address, DEFI_ABI, provider);

      // Check if DeFi contract
      const defiSupportedFunctions = {};
      await Promise.all(
        DEFI_ABI.map(async (defiFunction) => {
          const functionName = defiFunction.split(" ")[1].split("(")[0]; // Extract the function name
          try {
            // Use callStatic to check if the function is callable (simulate it)
            await contractDeFi.callStatic[functionName](
              ethers.BigNumber.from(1)
            ); // Passing 1 as a test input
            defiSupportedFunctions[functionName] = true;
          } catch (error) {
            defiSupportedFunctions[functionName] = false;
          }
        })
      );

      if (Object.values(defiSupportedFunctions).some((value) => value)) {
        contractType =
          contractType === "Unknown" ? "DeFi" : `${contractType} + DeFi`;
        defiFeatures = defiSupportedFunctions;
      }

      // Update contract details
      setContractDetails({
        type: contractType,
        tokenInfo,
        defiFeatures,
        deploymentCode: bytecode,
      });
    } catch (error) {
      console.error("Error fetching contract details:", error);
    }
  }, [address]);

  useEffect(() => {
    fetchContractDetails();
  }, [fetchContractDetails]);

  return {
    contractDetails,
  };
};
