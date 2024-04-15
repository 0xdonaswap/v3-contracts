import { ContractFactory } from 'ethers'
import { ethers, upgrades, run, network } from 'hardhat'
import { configs } from '@donaswap/common/config'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  QuoterV2: require('../artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'),
  TickLens: require('../artifacts/contracts/lens/TickLens.sol/TickLens.json'),
  V3Migrator: require('../artifacts/contracts/V3Migrator.sol/V3Migrator.json'),
  DonaswapInterfaceMulticall: require('../artifacts/contracts/lens/DonaswapInterfaceMulticall.sol/DonaswapInterfaceMulticall.json'),
  // eslint-disable-next-line global-require
  SwapRouter: require('../artifacts/contracts/SwapRouter.sol/SwapRouter.json'),
  // eslint-disable-next-line global-require
  NFTDescriptor: require('../artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json'),
  // eslint-disable-next-line global-require
  NFTDescriptorEx: require('../artifacts/contracts/NFTDescriptorEx.sol/NFTDescriptorEx.json'),
  // eslint-disable-next-line global-require
  NonfungibleTokenPositionDescriptor: require('../artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json'),
  // eslint-disable-next-line global-require
  NonfungibleTokenPositionDescriptorOffChain: require('../artifacts/contracts/NonfungibleTokenPositionDescriptorOffChain.sol/NonfungibleTokenPositionDescriptorOffChain.json'),
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
  // const deployedContract = await import(`@donaswap/v3-periphery/deployments/${networkName}.json`)

  const donaswapV3PoolDeployer_address = deployedContracts.DonaswapV3PoolDeployer
  const donaswapV3Factory_address = deployedContracts.DonaswapV3Factory
  // const nonfungibleTokenPositionDescriptor_address = deployedContract.NonfungibleTokenPositionDescriptor

  /** Smart Router */
  console.log(`Deploying SwapRouter on ${networkName} network...`)
  const SwapRouter = new ContractFactory(
    artifacts.SwapRouter.abi,
    artifacts.SwapRouter.bytecode,
    owner
  )
  const swapRouter = await SwapRouter.deploy(
    donaswapV3PoolDeployer_address,
    donaswapV3Factory_address,
    config.WNATIVE
  )
  console.log('SwapRouter deployed to:', swapRouter.address)

  /** Non Fungible Token Position Descriptor */
  console.log(`Deploying NftPositionDescriptor on ${networkName} network...`)
  const NonfungibleTokenPositionDescriptor = new ContractFactory(
    artifacts.NonfungibleTokenPositionDescriptorOffChain.abi,
    artifacts.NonfungibleTokenPositionDescriptorOffChain.bytecode,
    owner
  )
  const baseTokenUri = 'https://nft.donaswap.com/v3/'
  const nonfungibleTokenPositionDescriptor = await upgrades.deployProxy(
    NonfungibleTokenPositionDescriptor,
    [baseTokenUri],
  )
  await nonfungibleTokenPositionDescriptor.deployed()
  console.log('NftPositionDescriptor deployed to:', nonfungibleTokenPositionDescriptor.address)

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
    nonfungibleTokenPositionDescriptor.address
  )
  console.log('NftPositionManager deployed to:', nonfungiblePositionManager.address)

  /** Donaswap interface Multicall */
  console.log(`Deploying DonaswapInterfaceMulticall on ${networkName} network...`)
  const DonaswapInterfaceMulticall = new ContractFactory(
    artifacts.DonaswapInterfaceMulticall.abi,
    artifacts.DonaswapInterfaceMulticall.bytecode,
    owner
  )
  const donaswapInterfaceMulticall = await DonaswapInterfaceMulticall.deploy()
  console.log('DonaswapInterfaceMulticall deployed to:', donaswapInterfaceMulticall.address)

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
    nonfungiblePositionManager.address
  )
  console.log('V3Migrator deployed to:', v3Migrator.address)

  /** Tick Lens */
  console.log(`Deploying TickLens on ${networkName} network...`)
  const TickLens = new ContractFactory(
    artifacts.TickLens.abi,
    artifacts.TickLens.bytecode,
    owner
  )
  const tickLens = await TickLens.deploy()
  console.log('TickLens deployed to:', tickLens.address)

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
    SwapRouter: swapRouter.address,
    V3Migrator: v3Migrator.address,
    QuoterV2: quoterV2.address,
    TickLens: tickLens.address,
    NonfungibleTokenPositionDescriptor: nonfungibleTokenPositionDescriptor.address,
    NonfungiblePositionManager: nonfungiblePositionManager.address,
    DonaswapInterfaceMulticall: donaswapInterfaceMulticall.address
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
