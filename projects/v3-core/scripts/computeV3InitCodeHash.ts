import "@nomiclabs/hardhat-ethers";
import { ethers } from 'hardhat'
import DonaswapV3PoolArtifact from '../artifacts/contracts/DonaswapV3Pool.sol/DonaswapV3Pool.json'

const hash = ethers.utils.keccak256(DonaswapV3PoolArtifact.bytecode)
console.log(hash)
