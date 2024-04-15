import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import { configs } from '@donaswap/common/config'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  // eslint-disable-next-line global-require
  NonfungiblePositionManager: require('../artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'),
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
  const nonfungibleTokenPositionDescriptor_address = deployedContract.NonfungibleTokenPositionDescriptor

    /** Non Fungible Token Position Manager */
  console.log(`Deploying NftPositionManager on ${networkName} network...`)
  const NonfungiblePositionManager = new ContractFactory(
    artifacts.NonfungiblePositionManager.abi,
    artifacts.NonfungiblePositionManager.bytecode,
    owner
  )
  const nonfungiblePositionManager = await NonfungiblePositionManager.deploy(
    donaswapV3PoolDeployer_address,
    donaswapV3Factory_address,
    config.WNATIVE,
    nonfungibleTokenPositionDescriptor_address
  )
  console.log('NftPositionManager deployed to:', nonfungiblePositionManager.address)

  const contracts = {
    NonfungiblePositionManager: nonfungiblePositionManager.address,
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
