/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    sources: "./smart_contracts/contracts",
    tests: "./smart_contracts/test",
    cache: "./smart_contracts/cache",
    artifacts: "./smart_contracts/artifacts",
  },
};
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    
}
};
