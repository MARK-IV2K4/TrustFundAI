const { ethers } = require("hardhat");

async function main() {
    const InvestmentManager = await ethers.getContractFactory("InvestmentManager");
    const investmentManager = await InvestmentManager.attach("0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9");

    const withdrawTx = await investmentManager.withdraw(1);  // Withdraw 1 ETH
    await withdrawTx.wait();

    console.log(`Withdrawl of the present index from the contract`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
