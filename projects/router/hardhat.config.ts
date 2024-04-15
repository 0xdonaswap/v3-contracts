import '@nomicfoundation/hardhat-verify'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-web3'
import '@nomiclabs/hardhat-truffle5'
import 'hardhat-abi-exporter'
import 'hardhat-contract-sizer'
import 'dotenv/config'
import 'hardhat-tracer'
import 'solidity-docgen'
import { SUPPORTED_NETWORKS } from '../../networks.config'
import { SUPPORTED_CUSTOM_CHAINS } from '../../customChains.config'
import { API_KEYS } from '../../api.config'

export default {
  networks: SUPPORTED_NETWORKS,
  etherscan: {
    apiKey: API_KEYS,
    customChains: SUPPORTED_CUSTOM_CHAINS,
  },
  solidity: {
    compilers: [
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.8.10',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.4.18',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
    ],
    overrides: {
      '@donaswap/v3-core/contracts/libraries/FullMath.sol': {
        version: '0.7.6',
        settings: {},
      },
      '@donaswap/v3-core/contracts/libraries/TickBitmap.sol': {
        version: '0.7.6',
        settings: {},
      },
      '@donaswap/v3-core/contracts/libraries/TickMath.sol': {
        version: '0.7.6',
        settings: {},
      },
      '@donaswap/v3-periphery/contracts/libraries/PoolAddress.sol': {
        version: '0.7.6',
        settings: {},
      },
      'contracts/libraries/PoolTicksCounter.sol': {
        version: '0.7.6',
        settings: {},
      },
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  // abiExporter: {
  //   path: "./data/abi",
  //   clear: true,
  //   flat: false,
  // },
  docgen: {
    pages: 'files',
  },
}
