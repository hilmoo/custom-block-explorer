import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { getReadFunctions } from "../utils/getReadAndWriteFunctions";

const useReadContractFunctions = (address, abi) => {
  const [readFunctions, setReadFunctions] = useState([]);
  const [contract, setContract] = useState(null);
  const [readResults, setReadResults] = useState({});

  useEffect(() => {
    if (address && abi) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractInstance = new ethers.Contract(address, abi, provider);
      setContract(contractInstance);

      // Filter out the read functions
      const readFunctions = getReadFunctions(abi);
      setReadFunctions(readFunctions);
    }
  }, [address, abi]);

  const callReadFunction = useCallback(
    async (functionName, ...params) => {
      if (!contract) return;

      try {
        const result = await contract[functionName](...params);
        setReadResults((prevResults) => ({
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

  return { readFunctions, readResults, callReadFunction };
};

export default useReadContractFunctions;
