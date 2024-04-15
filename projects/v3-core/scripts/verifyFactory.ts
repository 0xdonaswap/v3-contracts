import { verifyContract } from '@donaswap/common/verify'
import { sleep } from '@donaswap/common/sleep'
import { network } from "hardhat";

async function main() {
  const networkName = network.name
  
  const deployedContracts = await import(`@donaswap/v3-core/deployments/${networkName}.json`)

  console.log(`Verifying smart contracts on ${networkName} network...`);

  // Verify donaswapV3Factory
  console.log(`Verifying donaswapV3Factory on ${networkName} network...`)
  await verifyContract(deployedContracts.DonaswapV3Factory, [deployedContracts.DonaswapV3PoolDeployer])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
