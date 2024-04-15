import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import { configs } from '@donaswap/common/config'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  QuoterV2: require('../artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'),
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

  const donaswapV3PoolDeployer_address = deployedContracts.DonaswapV3PoolDeployer
  const donaswapV3Factory_address = deployedContracts.DonaswapV3Factory

  /** Quoter v2 */
  console.log(`Deploying QuoterV2 on ${networkName} network...`)
  const QuoterV2 = new ContractFactory(
    artifacts.QuoterV2.abi,
    artifacts.QuoterV2.bytecode,
    owner
  )
  const quoterV2 = await QuoterV2.deploy(
    donaswapV3PoolDeployer_address,
    donaswapV3Factory_address,
    config.WNATIVE
  )
  console.log('QuoterV2 deployed to:', quoterV2.address)

  const contracts = {
    QuoterV2: quoterV2.address,
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
