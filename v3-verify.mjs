#!/usr/bin/env zx
// import 'zx/globals'
import networks from './v3-networks.mjs'

let network = process.env.NETWORK
console.log(network, 'network')
if (!network || !networks[network]) {
  throw new Error(`env NETWORK: ${network}`)
}

await $`yarn workspace @donaswap/v3-core run hardhat run scripts/verify.ts --network ${network}`

await $`yarn workspace @donaswap/v3-periphery run hardhat run scripts/verify.ts --network ${network}`

await $`yarn workspace @donaswap/smart-router run hardhat run scripts/verify.ts --network ${network}`

await $`yarn workspace @donaswap/masterchef-v3 run hardhat run scripts/verify.ts --network ${network}`

await $`yarn workspace @donaswap/v3-lm-pool run hardhat run scripts/verify.ts --network ${network}`

console.log(chalk.blue('Done!'))
