import { useState, useEffect, useCallback } from "react";
import { getProvider } from "../helpers";

const useIsBlockchainReady = () => {
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [network, setNetwork] = useState();

  // Function to fetch blockchain data
  const fetchBlockchainData = useCallback(async () => {
    try {
      setLoading(true);
      const provider = getProvider();
      const network = await provider.detectNetwork();
      console.log({
        provider,
        network,
        test: !!provider && !!network?.chainId,
      });
      if (!!provider && !!network?.chainId) {
        setNetwork(network);
        setIsReady(true);
      } else {
        setError("Provider not found");
        setIsReady(false);
      }
    } catch (err) {
      console.log({ err });
      setIsReady(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlockchainData();
  }, [fetchBlockchainData]);

  return {
    isReady,
    loading,
    error,
    network,
    refreshBlockchainData: fetchBlockchainData,
  };
};

export default useIsBlockchainReady;
