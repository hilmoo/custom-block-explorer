import { solidityCompiler } from "@agnostico/browser-solidity-compiler";
import { getSolidityCompilerVersions } from "./getSolidityCompilerVersions";

export const compileContract = async ({
  sourceCode,
  compilerVersion,
  optimization = true,
  runs = 200,
}) => {
  // Step 1: Configure compiler options
  const options = {
    optimizer: {
      enabled: optimization,
      runs: runs,
    },
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"], // Output both ABI and bytecode
      },
    },
  };

  // Fetch available compiler versions
  const { releases } = await getSolidityCompilerVersions();

  // Verify if the compiler version exists in releases
  if (!releases[compilerVersion]) {
    throw new Error(`Compiler version ${compilerVersion} is not available`);
  }

  console.log({ releases, compilerVersion });

  // Step 2: Extract contract names from the source code
  const contractNames = [];
  let match;
  const contractRegex = /contract\s+([A-Za-z0-9_]+)/g;

  // Use regex to find all contract names in the source code
  while ((match = contractRegex.exec(sourceCode)) !== null) {
    contractNames.push(match[1]);
  }

  console.log("Extracted contract names:", contractNames);

  // Step 3: Load the compiler and compile the contract
  try {
    const compiledOutput = await solidityCompiler({
      version: `https://binaries.soliditylang.org/bin/${releases[compilerVersion]}`,
      contractBody: sourceCode,
      options,
    });

    console.log({ compiledOutput });
    // Step 4: Handle and log compilation errors if any
    if (compiledOutput.errors) {
      compiledOutput.errors.forEach((error) => {
        console.error(error.formattedMessage);
      });
      throw new Error("Compilation errors occurred");
    }

    // Step 5: Extract ABIs for each contract in the source code
    const contractABIs = {};

    // Loop through each contract name and get its ABI if available
    contractNames.forEach((contractName) => {
      if (compiledOutput.contracts.Compiled_Contracts?.[contractName]) {
        contractABIs[contractName] =
          compiledOutput.contracts.Compiled_Contracts[contractName].abi;
      } else {
        console.warn(`No ABI found for contract: ${contractName}`);
      }
    });

    console.log("Compiled ABIs:", contractABIs);
    return contractABIs;
  } catch (error) {
    console.error("Compilation error:", error);
    throw new Error("Failed to compile the contract");
  }
};
