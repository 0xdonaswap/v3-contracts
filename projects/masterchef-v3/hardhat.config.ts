import '@nomicfoundation/hardhat-verify'
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "solidity-coverage";
import "solidity-docgen";
import "dotenv/config";
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
        version: '0.8.10',
        settings: {
          optimizer: {
            enabled: true,
            runs: 999,
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 999,
          },
        },
      },
    ],
  },
  paths: {
    sources: './contracts/',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  docgen: {
    pages: 'files',
  },
};
