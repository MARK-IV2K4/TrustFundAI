require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your deployed contract address and ABI
const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const contractABI = require('../artifacts/contracts/InvestmentManager.sol/InvestmentManager.json').abi;

// Hardhat local network provider
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

// First account from Hardhat private key (you can change this)
const signer = new ethers.Wallet('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e', provider);

const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Deposit route
app.post('/deposit', async (req, res) => {
    try {
        const { amount } = req.body;
        const tx = await contract.invest({ value: ethers.parseEther(amount) });
        await tx.wait();
        res.json({ status: 'Deposit successful', txHash: tx.hash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Withdraw route
app.post('/withdraw', async (req, res) => {
    try {
        const { index } = req.body;
        const tx = await contract.withdraw(index);
        await tx.wait();
        res.json({ status: 'Withdraw successful', txHash: tx.hash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get investments by address
app.get('/investments/:address', async (req, res) => {
    try {
        const address = req.params.address;
        const data = await contract.getInvestments(address);
        res.json({ investments: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
