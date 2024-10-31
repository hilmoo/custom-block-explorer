import { useState, useEffect, useCallback } from "react";
import { getContract, getProvider } from "../helpers";
import { flattenAndDeduplicateABI } from "../utils";

const useContractFunctions = (address, abi) => {
  const [contract, setContract] = useState(null);
  const [readFunctions, setReadFunctions] = useState([]);
  const [writeFunctions, setWriteFunctions] = useState([]);
  const [results, setResults] = useState({});
  const [txStatus, setTxStatus] = useState({});

  console.log({ abi });
  useEffect(() => {
    if (address && abi) {
      const provider = getProvider();
      const signer = provider.getSigner();
      const { mainABI, unifiedABI } = flattenAndDeduplicateABI(abi);

      //   console.log({ mainABI, unifiedABI });
      const contractInstance = getContract(address, mainABI, signer);
      setContract(contractInstance);

      // Filter functions based on stateMutability
      const readFns = unifiedABI.filter(
        (item) =>
          item.type === "function" &&
          (item.stateMutability === "view" || item.stateMutability === "pure")
      );
      const writeFns = unifiedABI.filter(
        (item) =>
          item.type === "function" &&
          (item.stateMutability === "nonpayable" ||
            item.stateMutability === "payable")
      );

      setReadFunctions(readFns);
      setWriteFunctions(writeFns);
    }
  }, [address, abi]);

  // Function to call a read-only function
  const callReadFunction = useCallback(
    async (functionName, ...params) => {
      if (!contract) return;

      try {
        const result = await contract[functionName](...params);
        setResults((prevResults) => ({
          ...prevResults,
          [functionName]: result,
        }));
        return result;
      } catch (error) {
        console.error(`Error calling read function ${functionName}:`, error);
      }
    },
    [contract]
  );

  // Function to call a write function
  const callWriteFunction = useCallback(
    async (functionName, ...params) => {
      if (!contract) return;

      try {
        const tx = await contract[functionName](...params);
        setTxStatus((prevStatus) => ({
          ...prevStatus,
          [functionName]: "pending",
        }));
        await tx.wait();
        setTxStatus((prevStatus) => ({
          ...prevStatus,
          [functionName]: "success",
        }));
        return tx;
      } catch (error) {
        setTxStatus((prevStatus) => ({
          ...prevStatus,
          [functionName]: "failed",
        }));
        console.error(`Error calling write function ${functionName}:`, error);
      }
    },
    [contract]
  );

  return {
    readFunctions,
    writeFunctions,
    results,
    txStatus,
    callReadFunction,
    callWriteFunction,
  };
};

export default useContractFunctions;
