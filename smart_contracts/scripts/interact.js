const { ethers } = require("hardhat");

async function main() {
    const CONTRACT_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
    
    console.log("🔍 Attaching to contract at:", CONTRACT_ADDRESS);

    const InvestmentManager = await ethers.getContractFactory("InvestmentManager");
    const investmentManager = await InvestmentManager.attach(CONTRACT_ADDRESS);

    console.log("✅ Connected to InvestmentManager");

    // Send 1 ETH investment
    const tx = await investmentManager.invest({
        value: ethers.parseEther("1")
    });

    console.log("💸 Transaction sent. Waiting for confirmation...");

    await tx.wait();
    console.log("✅ Investment successful!");

    // Fetching the balance stored (if your contract has a getter function)
    // Example: const balance = await investmentManager.getBalance();
    // console.log(`Contract Balance: ${ethers.formatEther(balance)} ETH`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
