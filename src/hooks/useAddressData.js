import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { getProvider } from "../helpers";

const provider = getProvider();

const useAddressData = (address, pageNumber = 1, pageSize = 10) => {
  const [balance, setBalance] = useState(null);
  const [usdValue, setUsdValue] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [firstTransaction, setFirstTransaction] = useState(null);
  const [latestTransaction, setLatestTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Fetch ETH Balance and USD Value
  const fetchBalanceAndUsdValue = useCallback(async () => {
    try {
      if (!address) return;
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));

      // Fetch ETH/USD price
      //   const priceResponse = await axios.get(
      //     "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      //   );
      //   const ethPrice = priceResponse.data.ethereum.usd;
      //   setUsdValue((ethers.utils.formatEther(balance) * ethPrice).toFixed(2));
      setUsdValue(0);
    } catch (error) {
      setError("Failed to fetch balance or price");
      console.error(error);
    }
  }, [address]);

  // Fetch Paginated Transactions
  const fetchTransactions = useCallback(async () => {
    if (!address) return;
    setLoading(true);
    setError(null);

    try {
      const latestBlockNumber = await provider.getBlockNumber();
      const response = await axios.post("http://localhost:8545", {
        jsonrpc: "2.0",
        method: "eth_getLogs",
        params: [
          {
            fromBlock: ethers.utils.hexlify(
              Math.max(latestBlockNumber - 10000, 0)
            ),
            toBlock: ethers.utils.hexlify(latestBlockNumber),
            address: address,
          },
        ],
        id: 1,
      });

      const newTransactions = response.data.result;
      setTransactions((prev) => [...prev, ...newTransactions]);
      setHasMore(newTransactions.length === pageSize);

      if (pageNumber === 1 && newTransactions.length > 0) {
        setLatestTransaction(newTransactions[0]);
        setFirstTransaction(newTransactions[newTransactions.length - 1]);
      }

      setTotalTransactions(totalTransactions + newTransactions.length);
    } catch (error) {
      setError("Failed to fetch transactions");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [address, pageNumber, pageSize]);

  // Initial Fetch
  useEffect(() => {
    fetchBalanceAndUsdValue();
  }, [fetchBalanceAndUsdValue]);

  // Pagination Fetch
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    summary: {
      balance,
      usdValue,
      totalTransactions,
      latestTransaction,
      firstTransaction,
    },
    loading,
    error,
    hasMore,
  };
};

export default useAddressData;
