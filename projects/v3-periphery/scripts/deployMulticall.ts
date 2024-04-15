import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import { configs } from '@donaswap/common/config'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  DonaswapInterfaceMulticall: require('../artifacts/contracts/lens/DonaswapInterfaceMulticall.sol/DonaswapInterfaceMulticall.json'),
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

  /** Donaswap interface Multicall */
  console.log(`Deploying DonaswapInterfaceMulticall on ${networkName} network...`)
  const DonaswapInterfaceMulticall = new ContractFactory(
    artifacts.DonaswapInterfaceMulticall.abi,
    artifacts.DonaswapInterfaceMulticall.bytecode,
    owner
  )
  const donaswapInterfaceMulticall = await DonaswapInterfaceMulticall.deploy()
  console.log('DonaswapInterfaceMulticall deployed to:', donaswapInterfaceMulticall.address)

  const contracts = {
    DonaswapInterfaceMulticall: donaswapInterfaceMulticall.address,
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
