import { ethers, run, network } from 'hardhat'
import { configs } from '@donaswap/common/config'
import fs from 'fs'
import { abi } from '@donaswap/v3-core/artifacts/contracts/DonaswapV3Factory.sol/DonaswapV3Factory.json'

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
  const mcV3DeployedContracts = await import(`@donaswap/masterchef-v3/deployments/${networkName}.json`)

  const donaswapV3Factory_address = v3DeployedContracts.DonaswapV3Factory

  console.log(`Deploying donaswapV3LmPoolDeployer on ${networkName} network...`)
  const DonaswapV3LmPoolDeployer = await ethers.getContractFactory('DonaswapV3LmPoolDeployer')
  const donaswapV3LmPoolDeployer = await DonaswapV3LmPoolDeployer.deploy(
    mcV3DeployedContracts.MasterChefV3
  )
  console.log('donaswapV3LmPoolDeployer deployed to:', donaswapV3LmPoolDeployer.address)

  const donaswapV3Factory = new ethers.Contract(
    donaswapV3Factory_address,
    abi,
    owner
  )

  // Set Lm Pool Deployer Address
  console.log(`Set lmPoolDeployerAddress for DonaswapV3Factory on ${networkName} network...`)
  await donaswapV3Factory.setLmPoolDeployer(
    donaswapV3LmPoolDeployer.address
  )
  console.log(`lmPoolDeployerAddress is set`, donaswapV3LmPoolDeployer.address)

  const contracts = {
    DonaswapV3LmPoolDeployer: donaswapV3LmPoolDeployer.address,
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
