export const getTxsFees = (tx) => {
  const txnFee = tx.gasLimit.mul(tx.gasPrice);
  return txnFee;
};
