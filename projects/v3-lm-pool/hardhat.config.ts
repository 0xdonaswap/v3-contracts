import '@nomicfoundation/hardhat-toolbox'
import '@typechain/hardhat'
import 'dotenv/config'
import 'solidity-docgen';
import { SUPPORTED_NETWORKS } from '../../networks.config'
import { SUPPORTED_CUSTOM_CHAINS } from '../../customChains.config'
import { API_KEYS } from '../../api.config'

const config = {
  solidity: {
    version: '0.7.6',
  },
  networks: SUPPORTED_NETWORKS,
  etherscan: {
    apiKey: API_KEYS,
    customChains: SUPPORTED_CUSTOM_CHAINS,
  },
  paths: {
    sources: './contracts/',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
}

export default config
