const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying GuardedVaultQuest contract...");

  // Get the contract factory
  const GuardedVaultQuest = await ethers.getContractFactory("GuardedVaultQuest");

  // Deploy the contract with a verifier address (you can change this to your verifier address)
  const verifierAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual verifier address
  
  const guardedVaultQuest = await GuardedVaultQuest.deploy(verifierAddress);

  await guardedVaultQuest.waitForDeployment();

  const contractAddress = await guardedVaultQuest.getAddress();
  
  console.log("GuardedVaultQuest deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    verifierAddress: verifierAddress,
    deploymentTime: new Date().toISOString(),
    network: "sepolia"
  };
  
  const fs = require('fs');
  fs.writeFileSync('./deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
  
  console.log("Deployment info saved to deployment-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
