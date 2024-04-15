import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimeDonaswapV3Pool } from '../../typechain-types/contracts/test/MockTimeDonaswapV3Pool'
import { TestERC20 } from '../../typechain-types/contracts/test/TestERC20'
import { DonaswapV3Factory } from '../../typechain-types/contracts/DonaswapV3Factory'
import { DonaswapV3PoolDeployer } from '../../typechain-types/contracts/DonaswapV3PoolDeployer'
import { TestDonaswapV3Callee } from '../../typechain-types/contracts/test/TestDonaswapV3Callee'
import { TestDonaswapV3Router } from '../../typechain-types/contracts/test/TestDonaswapV3Router'
import { MockTimeDonaswapV3PoolDeployer } from '../../typechain-types/contracts/test/MockTimeDonaswapV3PoolDeployer'
import DonaswapV3LmPoolArtifact from '@donaswap/v3-lm-pool/artifacts/contracts/DonaswapV3LmPool.sol/DonaswapV3LmPool.json'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: DonaswapV3Factory
}

interface DeployerFixture {
  deployer: DonaswapV3PoolDeployer
}

async function factoryFixture(): Promise<FactoryFixture> {
  const { deployer } = await deployerFixture()
  const factoryFactory = await ethers.getContractFactory('DonaswapV3Factory')
  const factory = (await factoryFactory.deploy(deployer.address)) as DonaswapV3Factory
  return { factory }
}
async function deployerFixture(): Promise<DeployerFixture> {
  const deployerFactory = await ethers.getContractFactory('DonaswapV3PoolDeployer')
  const deployer = (await deployerFactory.deploy()) as DonaswapV3PoolDeployer
  return { deployer }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestDonaswapV3Callee
  swapTargetRouter: TestDonaswapV3Router
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimeDonaswapV3Pool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimeDonaswapV3PoolDeployerFactory = await ethers.getContractFactory('MockTimeDonaswapV3PoolDeployer')
  const MockTimeDonaswapV3PoolFactory = await ethers.getContractFactory('MockTimeDonaswapV3Pool')

  const calleeContractFactory = await ethers.getContractFactory('TestDonaswapV3Callee')
  const routerContractFactory = await ethers.getContractFactory('TestDonaswapV3Router')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestDonaswapV3Callee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestDonaswapV3Router

  const DonaswapV3LmPoolFactory = await ethers.getContractFactoryFromArtifact(DonaswapV3LmPoolArtifact)

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer =
        (await MockTimeDonaswapV3PoolDeployerFactory.deploy()) as MockTimeDonaswapV3PoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string

      const mockTimeDonaswapV3Pool = MockTimeDonaswapV3PoolFactory.attach(poolAddress) as MockTimeDonaswapV3Pool

      await (
        await factory.setLmPool(
          poolAddress,
          (
            await DonaswapV3LmPoolFactory.deploy(
              poolAddress,
              ethers.constants.AddressZero,
              Math.floor(Date.now() / 1000)
            )
          ).address
        )
      ).wait()

      return mockTimeDonaswapV3Pool
    },
  }
}
