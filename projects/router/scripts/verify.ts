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
  const deployedContracts_smart_router = await import(`@donaswap/smart-router/deployments/${networkName}.json`)

  // Verify SmartRouterHelper
  console.log(`Verifying SmartRouterHelper on ${networkName} network...`)
  await verifyContract(deployedContracts_smart_router.SmartRouterHelper)
  await sleep(10000)

  // Verify swapRouter
  console.log(`Verifying swapRouter on ${networkName} network...`)
  await verifyContract(deployedContracts_smart_router.SmartRouter, [
    config.v2Factory,
    deployedContracts_v3_core.DonaswapV3PoolDeployer,
    deployedContracts_v3_core.DonaswapV3Factory,
    deployedContracts_v3_periphery.NonfungiblePositionManager,
    config.stableFactory,
    config.stableInfo,
    config.WNATIVE,
  ])
  await sleep(10000)

  // Verify mixedRouteQuoterV1
  console.log(`Verifying mixedRouteQuoterV1 on ${networkName} network...`)
  await verifyContract(deployedContracts_smart_router.MixedRouteQuoterV1, [
    deployedContracts_v3_core.DonaswapV3PoolDeployer,
    deployedContracts_v3_core.DonaswapV3Factory,
    config.v2Factory,
    config.stableFactory,
    config.WNATIVE,
  ])
  await sleep(10000)

  // Verify quoterV2
  console.log(`Verifying quoterV2 on ${networkName} network...`)
  await verifyContract(deployedContracts_smart_router.QuoterV2, [
    deployedContracts_v3_core.DonaswapV3PoolDeployer,
    deployedContracts_v3_core.DonaswapV3Factory,
    config.WNATIVE,
  ])
  await sleep(10000)

  // Verify tokenValidator
  console.log(`Verifying tokenValidator on ${networkName} network...`)
  await verifyContract(deployedContracts_smart_router.TokenValidator, [
    config.v2Factory,
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
