import { abi as POOL_ABI } from '@donaswap/v3-core/artifacts/contracts/DonaswapV3Pool.sol/DonaswapV3Pool.json'
import { Contract, Wallet } from 'ethers'
import { IDonaswapV3Pool } from '../../typechain-types'

export default function poolAtAddress(address: string, wallet: Wallet): IDonaswapV3Pool {
  return new Contract(address, POOL_ABI, wallet) as IDonaswapV3Pool
}
