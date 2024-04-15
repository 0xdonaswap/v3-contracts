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

  const donaswapV3PoolDeployer_address = v3DeployedContracts.DonaswapV3PoolDeployer
  const donaswapV3Factory_address = v3DeployedContracts.DonaswapV3Factory

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

  /** MixedRouteQuoterV1 */
  console.log(`Deploying MixedRouteQuoterV1 on ${networkName} network...`)
  const MixedRouteQuoterV1 = await ethers.getContractFactory('MixedRouteQuoterV1', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const mixedRouteQuoterV1 = await MixedRouteQuoterV1.deploy(
    donaswapV3PoolDeployer_address,
    donaswapV3Factory_address,
    config.v2Factory,
    config.stableFactory,
    config.WNATIVE
  )
  console.log('MixedRouteQuoterV1 deployed to:', mixedRouteQuoterV1.address)

  const contracts = {
    SmartRouterHelper: smartRouterHelper.address,
    MixedRouteQuoterV1: mixedRouteQuoterV1.address,
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
