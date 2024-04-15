import { verifyContract } from '@donaswap/common/verify'
import { sleep } from '@donaswap/common/sleep'
import { configs } from '@donaswap/common/config'
import { network } from "hardhat";

async function main() {
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]

  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }
  console.log(`Verifying smart contracts on ${networkName} network...`);

  const deployedContracts_v3_core = await import(`@donaswap/v3-core/deployments/${networkName}.json`)
  const deployedContracts_v3_periphery = await import(`@donaswap/v3-periphery/deployments/${networkName}.json`)

  // Verify v3Migrator
  console.log(`Verifying v3Migrator on ${networkName} network...`)
  await verifyContract(deployedContracts_v3_periphery.V3Migrator, [
    deployedContracts_v3_core.DonaswapV3PoolDeployer,
    deployedContracts_v3_core.DonaswapV3Factory,
    config.WNATIVE,
    deployedContracts_v3_periphery.NonfungiblePositionManager,
  ])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
