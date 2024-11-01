import { getCompilerVersions } from "@agnostico/browser-solidity-compiler";

export const getSolidityCompilerVersions = async () => {
  return await getCompilerVersions();
};
