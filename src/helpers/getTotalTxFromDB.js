import { loadFromIndexedDB } from "../services/dbService";

export const getTotalTxFromDB = async () => {
  return (await loadFromIndexedDB("cumulativeTxCount")) || 0;
};
