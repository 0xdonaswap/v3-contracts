import "@nomiclabs/hardhat-ethers";
import { ethers, network } from 'hardhat'
import { configs } from '@donaswap/common/config'
import { writeFileSync } from 'fs'

async function main() {
  const [owner] = await ethers.getSigners()
  // Remember to update the init code hash in SC for different chains before deploying
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]

  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }
  console.log('Deployer Address', owner.address)
  console.log('Deployer Balance:', (await owner.getBalance()).toString());
  console.log(`Deploying on ${networkName} network...`);
  
  const v3DeployedContracts = await import(`@donaswap/v3-core/deployments/${networkName}.json`)
  const v3PeripheryDeployedContracts = await import(`@donaswap/v3-periphery/deployments/${networkName}.json`)

  const donaswapV3PoolDeployer_address = v3DeployedContracts.DonaswapV3PoolDeployer
  const donaswapV3Factory_address = v3DeployedContracts.DonaswapV3Factory
  const positionManager_address = v3PeripheryDeployedContracts.NonfungiblePositionManager

  /** SmartRouterHelper */
  const smartRouterHelper_address = ''
  let smartRouterHelper
  if (!smartRouterHelper_address) {
    console.log(`Deploying SmartRouterHelper on ${networkName} network...`)
    const SmartRouterHelper = await ethers.getContractFactory('SmartRouterHelper')

    smartRouterHelper = await SmartRouterHelper.deploy()
    console.log(`SmartRouterHelper deployed on ${networkName} network to:`, smartRouterHelper.address)
  } else {
    console.log(`Using existing SmartRouterHelper on ${networkName} network...`, smartRouterHelper_address)

    const smartRouterArtifact = require('../artifacts/contracts/libraries/SmartRouterHelper.sol/SmartRouterHelper.json')
    
    smartRouterHelper = new ethers.Contract(
      smartRouterHelper_address,
      smartRouterArtifact.abi
    )
    console.log(`SmartRouterHelper used from deployed address on ${networkName} network:`, smartRouterHelper.address)
  }

  /** SmartRouter */
  console.log(`Deploying SmartRouter on ${networkName} network...`)
  const SmartRouter = await ethers.getContractFactory('SmartRouter', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const smartRouter = await SmartRouter.deploy(
    config.v2Factory,
    donaswapV3PoolDeployer_address,
    donaswapV3Factory_address,
    positionManager_address,
    config.stableFactory,
    config.stableInfo,
    config.WNATIVE
  )
  console.log('SmartRouter deployed to:', smartRouter.address)

  const contracts = {
    SmartRouter: smartRouter.address,
    SmartRouterHelper: smartRouterHelper.address,
  }
  console.log('Deployer Balance:', (await owner.getBalance()).toString());

  writeFileSync(`./deployments/${network.name}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
