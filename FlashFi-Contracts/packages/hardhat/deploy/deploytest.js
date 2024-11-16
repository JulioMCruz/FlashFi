const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');

async function saveDeployments(chainId, deployments) {
    const deploymentsPath = path.join(__dirname, '../deployments.json');
    let allDeployments = {};
    
    if (fs.existsSync(deploymentsPath)) {
      allDeployments = JSON.parse(fs.readFileSync(deploymentsPath, 'utf8'));
    }
  
    allDeployments[chainId] = deployments;
    fs.writeFileSync(deploymentsPath, JSON.stringify(allDeployments, null, 2));
  }

async function main() {

    try {
  // Deploy USDT with error handling
  console.log("\nDeploying ...");
  const USDT = await ethers.getContractFactory("USDT");
  const usdt = await USDT.deploy();
  await usdt.waitForDeployment();
  console.log("USDT deployed to:", usdt.target);

  // Deploy Token
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.waitForDeployment();
    console.log("Token deployed to:", token.target);

    // Deploy Factory
    const Factory = await ethers.getContractFactory("FlashMultisigFactory");
    const factory = await Factory.deploy();
    await factory.waitForDeployment();
    console.log("Factory deployed to:", factory.target);

// Deploy new DaoMultiSig through factory
const owners = ["0xe2b8651bF50913057fF47FC4f02A8e12146083B8"];
const requiredConfirmations = 1;
const deployTx = await factory.deployNewMultisig(owners, requiredConfirmations);
const receipt = await deployTx.wait();

// Debugging: Log the entire receipt
// console.log("Transaction receipt:", receipt);
// console.log("Receipt logs:", receipt.logs);

let multisigAddress
// Get deployed multisig address from event
const event = receipt.logs.find(log => log.fragment.name === 'MultisigDeployed');
if (event) {
    multisigAddress = event.args[0];
    console.log("DaoMultiSig deployed to:", multisigAddress);

    // Create contract instance for the deployed multisig
    const DaoMultiSig = await ethers.getContractFactory("DaoMultiSig");
    const daoMultisig = DaoMultiSig.attach(multisigAddress);

    // Mint tokens
    await usdt.mint();
    await token.mint();

    // Transfer tokens to multisig
    const usdtAmount = BigInt("1000000000000"); // 1M USDT with 6 decimals
    const tokenAmount = BigInt("1000000000000000000000000"); // 1M Tokens with 18 decimals

    await usdt.transfer(multisigAddress, usdtAmount);
    await token.transfer(multisigAddress, tokenAmount);

    // Add token support to multisig
    const fee = 10; // 0.1% fee
    await daoMultisig.addToken(usdt.target, fee);
    await daoMultisig.addToken(token.target, fee);

// Save deployments with network info
const deployments = {
    networkName: network.name,
    chainId: network.chainId,
    usdt: usdt.address,
    token: token.address,
    factory: factory.address,
    daoMultisig: multisigAddress,
    timestamp: new Date().toISOString()
  };

  await saveDeployments(network.chainId, deployments);
  console.log("Deployments saved to deployments.json");
}


} catch (error) {
    console.error("\nDeployment failed!");
    console.error("Error details:", error);
    
    if (error.message.includes("network connection")) {
      console.error("\nPossible solutions:");
      console.error("1. Check if your RPC URL is correct in .env file");
      console.error("2. Verify network connection");
      console.error("3. Make sure you're connected to the right network");
    }
    
    process.exit(1);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
