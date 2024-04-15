import '@nomicfoundation/hardhat-verify'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-watcher'
import 'dotenv/config'
import 'solidity-docgen'
import { SUPPORTED_NETWORKS } from '../../networks.config'
import { SUPPORTED_CUSTOM_CHAINS } from '../../customChains.config'
import { API_KEYS } from '../../api.config'

const LOWEST_OPTIMIZER_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 400,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

const DEFAULT_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

export default {
  networks: SUPPORTED_NETWORKS,
  etherscan: {
    apiKey: API_KEYS,
    customChains: SUPPORTED_CUSTOM_CHAINS,
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
    overrides: {
      'contracts/DonaswapV3Pool.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/DonaswapV3PoolDeployer.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/test/OutputCodeHash.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
    },
  },
  watcher: {
    test: {
      tasks: [{ command: 'test', params: { testFiles: ['{path}'] } }],
      files: ['./test/**/*'],
      verbose: true,
    },
  },
  docgen: {
    pages: 'files',
  },
}
