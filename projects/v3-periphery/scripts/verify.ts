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

  // Verify swapRouter
  console.log(`Verifying swapRouter on ${networkName} network...`)
  await verifyContract(deployedContracts_v3_periphery.SwapRouter, [
    deployedContracts_v3_core.DonaswapV3PoolDeployer,
    deployedContracts_v3_core.DonaswapV3Factory,
    config.WNATIVE,
  ])
  await sleep(10000)

  // Verify nonfungibleTokenPositionDescriptor
  console.log(`Verifying nonfungibleTokenPositionDescriptor on ${networkName} network...`)
  await verifyContract(deployedContracts_v3_periphery.NonfungibleTokenPositionDescriptor)
  await sleep(10000)

  // Verify NonfungiblePositionManager
  console.log(`Verifying NonfungiblePositionManager on ${networkName} network...`)
  await verifyContract(deployedContracts_v3_periphery.NonfungiblePositionManager, [
    deployedContracts_v3_core.DonaswapV3PoolDeployer,
    deployedContracts_v3_core.DonaswapV3Factory,
    config.WNATIVE,
    deployedContracts_v3_periphery.NonfungibleTokenPositionDescriptor,
  ])
  await sleep(10000)

  // Verify donaswapInterfaceMulticall
  console.log(`Verifyinging donaswapInterfaceMulticall on ${networkName} network...`)
  await verifyContract(deployedContracts_v3_periphery.DonaswapInterfaceMulticall)
  await sleep(10000)

  // Verify v3Migrator
  console.log(`Verifying v3Migrator on ${networkName} network...`)
  await verifyContract(deployedContracts_v3_periphery.V3Migrator, [
    deployedContracts_v3_core.DonaswapV3PoolDeployer,
    deployedContracts_v3_core.DonaswapV3Factory,
    config.WNATIVE,
    deployedContracts_v3_periphery.NonfungiblePositionManager,
  ])
  await sleep(10000)

  // Verify tickLens
  console.log(`Verifying tickLens on ${networkName} network...`)
  await verifyContract(deployedContracts_v3_periphery.TickLens)
  await sleep(10000)

  // Verify QuoterV2
  console.log(`Verifying QuoterV2 on ${networkName} network...`)
  await verifyContract(deployedContracts_v3_periphery.QuoterV2, [
    deployedContracts_v3_core.DonaswapV3PoolDeployer,
    deployedContracts_v3_core.DonaswapV3Factory,
    config.WNATIVE,
  ])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
