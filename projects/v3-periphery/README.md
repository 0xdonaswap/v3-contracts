# Donaswap V3 Periphery

This repository contains the periphery smart contracts for the Donaswap V3 Protocol.
For the lower level core contracts, see the [v3-core](../v3-core/)
repository.

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@donaswap/v3-periphery`
and import bytecode imported from artifacts located at
`@donaswap/v3-periphery/artifacts/contracts/*/*.json`.
For example:

```typescript
import {
  abi as SWAP_ROUTER_ABI,
  bytecode as SWAP_ROUTER_BYTECODE,
} from '@donaswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnets and public testnets, and all Donaswap code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The Donaswap v3 periphery interfaces are available for import into solidity smart contracts
via the npm artifact `@donaswap/v3-periphery`, e.g.:

```solidity
import '@donaswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract MyContract {
  ISwapRouter router;

  function doSomethingWithSwapRouter() {
    // router.exactInput(...);
  }
}

```
