import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import { configs } from '@donaswap/common/config'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  TickLens: require('../artifacts/contracts/lens/TickLens.sol/TickLens.json'),
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

  /** Tick Lens */
  console.log(`Deploying TickLens on ${networkName} network...`)
  const TickLens = new ContractFactory(
    artifacts.TickLens.abi, 
    artifacts.TickLens.bytecode, 
    owner
  )
  const tickLens = await TickLens.deploy()
  console.log('TickLens deployed to:', tickLens.address)

  const contracts = {
    TickLens: tickLens.address,
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
