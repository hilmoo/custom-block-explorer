export const flattenAndDeduplicateABI = (abiObject) => {
  const mergedABI = [];
  const seenSignatures = new Set();

  // Get the last key in the ABI object, which is likely the main contract
  const keys = Object.keys(abiObject);
  const mainContractKey = keys[keys.length - 1];

  keys.forEach((key) => {
    const abiArray = abiObject[key];

    abiArray.forEach((item) => {
      if (item.type === "function") {
        // Generate a unique signature for the function
        const signature = `${item.name}(${item.inputs
          .map((i) => i.type)
          .join(",")})`;

        // Only add if the signature hasn't been seen yet
        if (!seenSignatures.has(signature)) {
          seenSignatures.add(signature);
          mergedABI.push(item);
        }
      } else {
        // Add non-function items directly (like events, errors)
        mergedABI.push(item);
      }
    });
  });

  return { mainABI: abiObject[mainContractKey], unifiedABI: mergedABI };
};
