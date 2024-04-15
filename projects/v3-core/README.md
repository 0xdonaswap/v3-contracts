# Donaswap V3

This repository contains the core smart contracts for the Donaswap V3 Protocol.
For higher level contracts, see the [v3-periphery](../v3-periphery/)
repository.

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@donaswap/v3-core`
and import the factory bytecode located at
`@donaswap/v3-core/artifacts/contracts/DonaswapV3Factory.sol/DonaswapV3Factory.json`.
For example:

```typescript
import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from '@donaswap/v3-core/artifacts/contracts/DonaswapV3Factory.sol/DonaswapV3Factory.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnets and public testnets, and all Donaswap code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The Donaswap v3 interfaces are available for import into solidity smart contracts
via the npm artifact `@donaswap/v3-core`, e.g.:

```solidity
import '@donaswap/v3-core/contracts/interfaces/IDonaswapV3Pool.sol';

contract MyContract {
  IDonaswapV3Pool pool;

  function doSomethingWithPool() {
    // pool.swap(...);
  }
}

```