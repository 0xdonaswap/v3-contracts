import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import { configs } from '@donaswap/common/config'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  V3Migrator: require('../artifacts/contracts/V3Migrator.sol/V3Migrator.json'),
}

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]

  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }
  console.log('Deployer Address', owner.address)
  console.log('Deployer Balance:', (await owner.getBalance()).toString());
  console.log(`Deploying on ${networkName} network...`);

  const deployedContracts = await import(`@donaswap/v3-core/deployments/${networkName}.json`)
  const deployedContract = await import(`@donaswap/v3-periphery/deployments/${networkName}.json`)

  const donaswapV3PoolDeployer_address = deployedContracts.DonaswapV3PoolDeployer
  const donaswapV3Factory_address = deployedContracts.DonaswapV3Factory
  const nonfungiblePositionManager_address = deployedContract.NonfungiblePositionManager

  /** V3 Migrator */
  console.log(`Deploying V3Migrator on ${networkName} network...`)
  const V3Migrator = new ContractFactory(
    artifacts.V3Migrator.abi,
    artifacts.V3Migrator.bytecode,
    owner
  )
  const v3Migrator = await V3Migrator.deploy(
    donaswapV3PoolDeployer_address,
    donaswapV3Factory_address,
    config.WNATIVE,
    nonfungiblePositionManager_address
  )
  console.log('V3Migrator deployed to:', v3Migrator.address)

  const contracts = {
    V3Migrator: v3Migrator.address,
  }
  console.log('Deployer Balance:', (await owner.getBalance()).toString());

  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
