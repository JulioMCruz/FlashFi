const { ethers } = require('hardhat');

async function main() {
  const endpointAddress = '0x6EDCE65403992e310A62460808c4b910D972f10f'; 

  const Token = await ethers.getContractFactory('Token');
  const token = await Token.deploy(endpointAddress);

  await token.deployed();

  console.log('Token deployed to:', token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
