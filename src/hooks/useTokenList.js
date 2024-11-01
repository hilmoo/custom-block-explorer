import { useState, useEffect, useCallback, useRef } from "react";
import { getProvider } from "../helpers";
import { ethers } from "ethers";

const provider = getProvider();
const transferEventSignature = ethers.utils.id(
  "Transfer(address,address,uint256)"
);

export const useTokenList = (tokenType = "erc20") => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Track transaction hashes to avoid duplicates
  const transactionHashes = useRef(new Set());

  // Fetch and filter tokens based on the last 1000 transactions
  const fetchTokens = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const latestBlockNumber = await provider.getBlockNumber();
      const blockPromises = [];
      const transactionLimit = 1000; // Max limit to traverse
      let txCount = 0;

      // Fetch blocks until we reach the transaction limit or there are no more blocks
      while (txCount < transactionLimit) {
        const block = await provider.getBlockWithTransactions(
          latestBlockNumber - blockPromises.length
        );

        if (!block || block.transactions.length === 0) break; // Stop if no more transactions
        blockPromises.push(block);
        txCount += block.transactions.length;
      }

      const blocks = await Promise.all(blockPromises);
      const filteredTokens = [];

      for (const block of blocks) {
        for (const tx of block.transactions) {
          const txHash = tx.hash.toLowerCase();

          // Avoid duplicate transactions
          if (transactionHashes.current.has(txHash)) continue;
          transactionHashes.current.add(txHash);

          // Fetch logs from the transaction receipt for token and NFT transfers
          const receipt = await provider.getTransactionReceipt(txHash);

          receipt.logs.forEach((log) => {
            if (log.topics[0] === transferEventSignature) {
              const from = `0x${log.topics[1].slice(26)}`;
              const to = `0x${log.topics[2].slice(26)}`;
              const tokenIdOrValue = ethers.BigNumber.from(
                log.data === "0x" ? 0 : log.data
              );

              // Determine if it's an ERC-20 or NFT transfer based on log topic length
              if (tokenType === "erc20" && log.topics.length === 3) {
                // ERC-20 transfer
                filteredTokens.push({
                  from,
                  to,
                  value: ethers.utils.formatUnits(tokenIdOrValue),
                  tokenAddress: log.address,
                  transactionHash: tx.hash,
                  type: "ERC-20",
                  hash: tx.hash,
                  data: tx.data,
                  tx: { ...tx },
                });
              } else if (tokenType === "nft" && log.topics.length === 4) {
                const eventSignatureSingle = ethers.utils.id(
                  "TransferSingle(address,address,address,uint256,uint256)"
                );
                const eventSignatureBatch = ethers.utils.id(
                  "TransferBatch(address,address,address,uint256[],uint256[])"
                );

                if (log.topics[0] === eventSignatureSingle) {
                  // ERC-1155 TransferSingle or ERC-721 Transfer
                  const tokenId = ethers.BigNumber.from(
                    log.topics[3]
                  ).toString();
                  const value = ethers.BigNumber.from(log.data).toString(); // Value in TransferSingle is in data

                  filteredTokens.push({
                    from,
                    to,
                    tokenId,
                    value,
                    tokenAddress: log.address,
                    transactionHash: tx.hash,
                    type: "ERC-1155 Single",
                    hash: tx.hash,
                    data: tx.data,
                    tx: { ...tx },
                  });
                } else if (log.topics[0] === eventSignatureBatch) {
                  // ERC-1155 TransferBatch
                  // Decode the data field to get token IDs and values arrays
                  const abiCoder = new ethers.utils.AbiCoder();
                  const [tokenIds, values] = abiCoder.decode(
                    ["uint256[]", "uint256[]"],
                    log.data
                  );

                  // Add each tokenId and value to the filteredTokens array
                  tokenIds.forEach((id, index) => {
                    filteredTokens.push({
                      from,
                      to,
                      tokenId: id.toString(),
                      value: values[index].toString(),
                      tokenAddress: log.address,
                      transactionHash: tx.hash,
                      type: "ERC-1155 Batch",
                      hash: tx.hash,
                      data: tx.data,
                      tx: { ...tx },
                    });
                  });
                } else {
                  // ERC-721 Transfer (default to 4 topics but different event signature)
                  const tokenId = ethers.BigNumber.from(
                    log.topics[3]
                  ).toString();
                  filteredTokens.push({
                    from,
                    to,
                    tokenId,
                    tokenAddress: log.address,
                    transactionHash: tx.hash,
                    type: "ERC-721",
                    hash: tx.hash,
                    data: tx.data,
                    tx: { ...tx },
                  });
                }
              }
            }
          });
        }
      }

      setTokens(filteredTokens);
    } catch (error) {
      setError("Failed to fetch tokens");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [tokenType]);

  // Fetch tokens on mount or when tokenType changes
  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return { tokens, loading, error };
};
