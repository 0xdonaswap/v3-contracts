import "@nomiclabs/hardhat-ethers";
import { ContractFactory } from 'ethers'
import { ethers, run, network } from 'hardhat'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  // eslint-disable-next-line global-require
  DonaswapV3PoolDeployer: require('../artifacts/contracts/DonaswapV3PoolDeployer.sol/DonaswapV3PoolDeployer.json'),
  // eslint-disable-next-line global-require
  DonaswapV3Factory: require('../artifacts/contracts/DonaswapV3Factory.sol/DonaswapV3Factory.json'),
}

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name

  console.log('Deployer Address', owner.address)
  console.log('Deployer Balance:', (await owner.getBalance()).toString());
  console.log(`Deploying on ${networkName} network...`);

  /** DonaswapV3PoolDeployer  */
  console.log(`Deploying DonaswapV3PoolDeployer on ${networkName}...`)
  let donaswapV3PoolDeployer_address = ''
  let donaswapV3PoolDeployer
  const DonaswapV3PoolDeployer = new ContractFactory(
    artifacts.DonaswapV3PoolDeployer.abi,
    artifacts.DonaswapV3PoolDeployer.bytecode,
    owner
  )
  if (!donaswapV3PoolDeployer_address) {
    donaswapV3PoolDeployer = await DonaswapV3PoolDeployer.deploy()

    donaswapV3PoolDeployer_address = donaswapV3PoolDeployer.address
    console.log('DonaswapV3PoolDeployer deployed to:', donaswapV3PoolDeployer_address)
  } else {
    donaswapV3PoolDeployer = new ethers.Contract(
      donaswapV3PoolDeployer_address,
      artifacts.DonaswapV3PoolDeployer.abi,
      owner
    )
  }

  /** DonaswapV3Factory  */
  console.log(`Deploying DonaswapV3Factory on ${networkName}...`)
  let donaswapV3Factory_address = ''
  let donaswapV3Factory
  if (!donaswapV3Factory_address) {
    const DonaswapV3Factory = new ContractFactory(
      artifacts.DonaswapV3Factory.abi,
      artifacts.DonaswapV3Factory.bytecode,
      owner
    )
    donaswapV3Factory = await DonaswapV3Factory.deploy(
      donaswapV3PoolDeployer_address
    )

    donaswapV3Factory_address = donaswapV3Factory.address
    console.log('DonaswapV3Factory deployed to:', donaswapV3Factory_address)
  } else {
    donaswapV3Factory = new ethers.Contract(
      donaswapV3Factory_address,
      artifacts.DonaswapV3Factory.abi,
      owner
    )
  }

  // Set FactoryAddress for DonaswapV3PoolDeployer.
  console.log(`Set factoryAddress for DonaswapV3PoolDeployer on ${networkName} network...`)
  await donaswapV3PoolDeployer.setFactoryAddress(
    donaswapV3Factory_address
  );
  console.log('factoryAddress is set', donaswapV3Factory_address)

  const contracts = {
    DonaswapV3Factory: donaswapV3Factory_address,
    DonaswapV3PoolDeployer: donaswapV3PoolDeployer_address,
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
