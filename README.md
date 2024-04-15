# Donaswap V3

yarn install

## Deployments

1. Add Keys in `.env` file. It's a private key of the account that will deploy the contracts and should be gitignored.
2. Private Key of deployer `DEPLOYER_KEY`.
3. `EXPLORER_API_KEY` in `.env` file. It's an API key for block explorers.
4. `yarn` in root directory
5. `NETWORK=$NETWORK yarn zx v3-deploy.mjs` where `$NETWORK` is.
6. `NETWORK=$NETWORK yarn zx v3-verify.mjs` where `$NETWORK` is.

#Compiles contracts
```shell
yarn workspace @donaswap/v3-core run hardhat compile
yarn workspace @donaswap/v3-periphery run hardhat compile
yarn workspace @donaswap/smart-router run hardhat compile
yarn workspace @donaswap/masterchef-v3 run hardhat compile
yarn workspace @donaswap/v3-lm-pool run hardhat compile
```

Deploy contracts
```shell
yarn workspace @donaswap/v3-core run hardhat run scripts/deploy.ts --network
yarn workspace @donaswap/v3-periphery run hardhat run scripts/deploy.ts --network
yarn workspace @donaswap/smart-router run hardhat run scripts/deploy.ts --network
yarn workspace @donaswap/masterchef-v3 run hardhat run scripts/deploy.ts --network
yarn workspace @donaswap/v3-lm-pool run hardhat run scripts/deploy.ts --network
```

Verify list options
```shell
yarn workspace @donaswap/v3-core run hardhat verify --list-networks
yarn workspace @donaswap/v3-periphery run hardhat verify --list-networks
yarn workspace @donaswap/smart-router run hardhat verify --list-networks
yarn workspace @donaswap/masterchef-v3 run hardhat verify --list-networks
yarn workspace @donaswap/v3-lm-pool run hardhat verify --list-networks
```

Verify contracts
```shell
yarn workspace @donaswap/v3-core run hardhat run scripts/verify.ts --network
yarn workspace @donaswap/v3-periphery run hardhat run scripts/verify.ts --network
yarn workspace @donaswap/smart-router run hardhat run scripts/verify.ts --network
yarn workspace @donaswap/masterchef-v3 run hardhat run scripts/verify.ts --network
yarn workspace @donaswap/v3-lm-pool run hardhat run scripts/verify.ts --network
```

USDT: 0xEdEd8102a954eB419351008018291cc0f89eC3b3
Multicall3: 0x42e0bc6C62b5770eBf9CFE26954229aEf863F308
WFIRE: 0xaeDc5046043D4ddDc813316685a8ED97ABb36931
v2 Factory: 0x30fbf7DD8e0Cc320fd700239Df144A16Bed4ad9f
c2 Router: 0x7827FF27d4263D64E8eD55BEf1b0e63d96167561

