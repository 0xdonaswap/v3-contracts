#!/usr/bin/env zx
// import 'zx/globals'
import networks from './v3-networks.mjs'

let network = process.env.NETWORK
console.log(network, 'network')
if (!network || !networks[network]) {
  throw new Error(`env NETWORK: ${network}`)
}

await $`yarn workspace @donaswap/v3-core run hardhat run scripts/deploy.ts --network ${network}`

await $`yarn workspace @donaswap/v3-periphery run hardhat run scripts/deploy.ts --network ${network}`

await $`yarn workspace @donaswap/smart-router run hardhat run scripts/deploy.ts --network ${network}`

await $`yarn workspace @donaswap/masterchef-v3 run hardhat run scripts/deploy.ts --network ${network}`

await $`yarn workspace @donaswap/v3-lm-pool run hardhat run scripts/deploy.ts --network ${network}`

console.log(chalk.blue('Done!'))

const m = await fs.readJson(`./projects/masterchef-v3/deployments/${network}.json`)
const r = await fs.readJson(`./projects/router/deployments/${network}.json`)
const c = await fs.readJson(`./projects/v3-core/deployments/${network}.json`)
const p = await fs.readJson(`./projects/v3-periphery/deployments/${network}.json`)
const l = await fs.readJson(`./projects/v3-lm-pool/deployments/${network}.json`)

const addresses = {
  ...m,
  ...r,
  ...c,
  ...p,
  ...l,
}

console.log(chalk.blue('Writing to file...'))
console.log(chalk.yellow(JSON.stringify(addresses, null, 2)))

fs.writeJson(`./deployments/${network}.json`, addresses, { spaces: 2 })
