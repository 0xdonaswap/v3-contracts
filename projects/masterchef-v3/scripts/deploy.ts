/* eslint-disable camelcase */
import { ethers, run, network } from "hardhat";
import { configs } from "@donaswap/common/config";
import fs from 'fs'

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name;
  const config = configs[networkName as keyof typeof configs];

  if (!config) {
    throw new Error(`No config found for network ${networkName}`);
  }
  console.log('Deployer Address', owner.address)
  console.log('Deployer Balance:', (await owner.getBalance()).toString());
  console.log(`Deploying on ${networkName} network...`);

  const v3PeripheryDeployedContracts = await import(`@donaswap/v3-periphery/deployments/${networkName}.json`);
  const positionManager_address = v3PeripheryDeployedContracts.NonfungiblePositionManager;

  console.log(`Deploying MasterChefV3 on ${networkName} network...`)
  const MasterChefV3 = await ethers.getContractFactory("MasterChefV3");
  const masterChefV3 = await MasterChefV3.deploy(
    config.flame,
    positionManager_address,
    config.WNATIVE
  );
  console.log("MasterChefV3 deployed to:", masterChefV3.address);

  const contracts = {
    MasterChefV3: masterChefV3.address,
  }
  console.log('Deployer Balance:', (await owner.getBalance()).toString());

  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
