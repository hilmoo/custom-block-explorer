import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

import { getProvider } from "../helpers";

const provider = getProvider();

export const useAddressBalanceData = (address) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalance = useCallback(async () => {
    try {
      setLoading(true);
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      setError("Failed to fetch balance");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [address]);

  // Fetch balance initially
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return {
    balance,
    loading,
    error,
  };
};
