// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IDonaswapV3Pool.sol";
import "./ILMPool.sol";

interface ILMPoolDeployer {
    function deploy(IDonaswapV3Pool pool) external returns (ILMPool lmPool);
}
