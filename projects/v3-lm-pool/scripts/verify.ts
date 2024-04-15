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

  const deployedContracts_masterchef_v3 = await import(`@donaswap/masterchef-v3/deployments/${networkName}.json`)
  const deployedContracts_v3_lm_pool = await import(`@donaswap/v3-lm-pool/deployments/${networkName}.json`)

  // Verify donaswapV3LmPoolDeployer
  console.log(`Verifying donaswapV3LmPoolDeployer on ${networkName} network...`)
  await verifyContract(deployedContracts_v3_lm_pool.DonaswapV3LmPoolDeployer, [
    deployedContracts_masterchef_v3.MasterChefV3,
  ])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
