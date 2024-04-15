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

  const v3PeripheryDeployedContracts = await import(`@donaswap/v3-periphery/deployments/${networkName}.json`)

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

  /** TokenValidator */
  console.log(`Deploying TokenValidator on ${networkName} network...`)
  const TokenValidator = await ethers.getContractFactory('TokenValidator', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const tokenValidator = await TokenValidator.deploy(
    config.v2Factory,
    positionManager_address
  )
  console.log('TokenValidator deployed to:', tokenValidator.address)

  const contracts = {
    SmartRouterHelper: smartRouterHelper.address,
    TokenValidator: tokenValidator.address,
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
