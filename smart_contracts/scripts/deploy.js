const { ethers } = require("hardhat");
 
async function main() {
  const InvestmentManager = await ethers.getContractFactory("InvestmentManager");
  const investmentManager = await InvestmentManager.deploy();
  await investmentManager.waitForDeployment();

  console.log("InvestmentManager deployed at:", await investmentManager.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
