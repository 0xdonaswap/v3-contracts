import { API_KEYS } from './api.config'

export const SUPPORTED_CUSTOM_CHAINS = [
    {
        network: 'firechain',
        chainId: 529,
        urls: {
            apiURL: 'https://firescan,io/api',
            browserURL: 'https://firescan.io/',
        }
    },
    {
        network: 'rinia',
        chainId: 917,
        urls: {
            apiURL: 'https://rinia.firescan.io/api',
            browserURL: 'https://rinia.firescan.io/',
        }
    },
    {
        network: "opbnb",
        chainId: 204,
        urls: {
            apiURL: `https://open-platform.nodereal.io/${API_KEYS}/op-bnb-testnet/contract/`,
            browserURL: "https://opbnbscan.com/",
        },
    },
    {
        network: "opBnbTestnet",
        chainId: 5611,
        urls: {
            apiURL: "https://api-opbnb-testnet.bscscan.com/api",
            browserURL: "https://opbnb-testnet.bscscan.com/"
        }
    },
    {
        network: "linea",
        chainId: 59144,
        urls: {
            apiURL: "https://api.lineascan.build/api",
            browserURL: "https://lineascan.build/"
        }
    },
    {
        network: "lineaGoerli",
        chainId: 59140,
        urls: {
            apiURL: "https://api-testnet.lineascan.build/api",
            browserURL: "https://goerli.lineascan.build/"
        }
    },
    {
        network: "polygonZkevm",
        chainId: 1101,
        urls: {
            apiURL: "https://api-zkevm.polygonscan.com/api",
            browserURL: "https://zkevm.polygonscan.com"
        }
    },
    {
        network: "polygonZkevmTestnet",
        chainId: 1442,
        urls: {
            apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
            browserURL: "https://testnet-zkevm.polygonscan.com/"
        }
    },
    {
        network: "celo",
        chainId: 42220,
        urls: {
            apiURL: "https://api.celoscan.io/api",
            browserURL: "https://celoscan.io/"
        }
    },
    {
        network: "celoAlfajores",
        chainId: 44787,
        urls: {
            apiURL: "https://api-alfajores.celoscan.io/api",
            browserURL: "https://alfajores.celoscan.io/"
        }
    },
    {
        network: "metis",
        chainId: 1088,
        urls: {
            apiURL: "https://andromeda-explorer.metis.io/api",
            browserURL: "https://andromeda-explorer.metis.io"
        }
    },
    {
        network: "metisGoerli",
        chainId: 599,
        urls: {
            apiURL: "https://goerli.explorer.metisdevops.link/api",
            browserURL: "https://goerli.explorer.metisdevops.link/"
        }
    },
    {
        network: "bttchain",
        chainId: 199,
        urls: {
            apiURL: "https://api.bttcscan.com/api",
            browserURL: "https://bttcscan.com/"
        }
    },
    {
        network: "bttchainTestnet",
        chainId: 1029,
        urls: {
            apiURL: "https://api-testnet.bttcscan.com/api",
            browserURL: "https://testnet.bttcscan.com/"
        }
    },
    {
        network: 'kava',
        chainId: 2222,
        urls: {
            apiURL: 'https://kavascan.com/api',
            browserURL: 'https://kavascan.com',
        }
    },
    {
        network: 'kavaTestnet',
        chainId: 2221,
        urls: {
            apiURL: 'https://testnet.kavascan.com/api',
            browserURL: 'https://testnet.kavascan.com',
        }
    },
    {
        network: 'pulsechain',
        chainId: 369,
        urls: {
            apiURL: 'https://scan.pulsechain.com/api',
            browserURL: 'https://scan.pulsechain.com/',
        }
    },
    {
        network: 'pulsechainTestnet',
        chainId: 943,
        urls: {
            apiURL: 'https://scan.v4.testnet.pulsechain.com/api',
            browserURL: 'https://scan.v4.testnet.pulsechain.com/',
        }
    },
    {
        network: 'cronos',
        chainId: 25,
        urls: {
            apiURL: 'https://api.cronoscan.com/api',
            browserURL: 'https://cronoscan.com/',
        }
    },
    {
        network: 'cronosTestnet',
        chainId: 338,
        urls: {
            apiURL: 'https://cronos.org/explorer/testnet3/api',
            browserURL: 'https://cronos.org/explorer/testnet3',
        }
    },
    {
        network: 'thundercore',
        chainId: 108,
        urls: {
            apiURL: 'http://explorer-mainnet.thundercore.com/api',
            browserURL: 'https://explorer-mainnet.thundercore.com/',
        }
    },
    {
        network: 'thundercoreTestnet',
        chainId: 18,
        urls: {
            apiURL: 'http://explorer-testnet.thundercore.com/api',
            browserURL: 'http://explorer-testnet.thundercore.com/',
        }
    },
    {
        network: 'flare',
        chainId: 14,
        urls: {
            apiURL: 'https://flare-explorer.flare.network/api',
            browserURL: 'https://flare-explorer.flare.network/',
        }
    },
    {
        network: 'flareTestnet',
        chainId: 114,
        urls: {
            apiURL: 'https://coston2-explorer.flare.network/api',
            browserURL: 'https://coston2-explorer.flare.network/',
        }
    },
    {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
            apiURL: 'https://api-sepolia.scrollscan.dev/api',
            browserURL: 'https://sepolia.scrollscan.dev/',
        },
    },
    {
        network: 'palm',
        chainId: 11297108109,
        urls: {
            apiURL: 'https://explorer.palm.io/api',
            browserURL: 'https://explorer.palm.io',
        }
    },
    {
        network: 'dogechain',
        chainId: 2000,
        urls: {
            apiURL: 'https://explorer.dogechain.dog/api',
            browserURL: 'https://explorer.dogechain.dog',
        }
    },
    {
        network: 'dogechainTestnet',
        chainId: 568,
        urls: {
            apiURL: 'https://explorer-testnet.dogechain.dog/api',
            browserURL: 'https://explorer-testnet.dogechain.dog/',
        }
    },
    {
        network: 'brisechain',
        chainId: 32520,
        urls: {
            apiURL: 'https://brisescan.com/api',
            browserURL: 'https://brisescan.com/',
        }
    },
    {
        network: 'elastos',
        chainId: 20,
        urls: {
            apiURL: 'https://esc.elastos.io/api',
            browserURL: 'https://esc.elastos.io/',
        }
    },
    {
        network: "core",
        chainId: 1115,
        urls: {
            apiURL: "https://api.test.btcs.network/api",
            browserURL: "https://scan.test.btcs.network/"
        }
    },
    {
        network: "coreTestnet",
        chainId: 1116,
        urls: {
            apiURL: "https://openapi.coredao.org/api",
            browserURL: "https://scan.coredao.org/"
        }
    },
    {
        network: "astar",
        chainId: 592,
        urls: {
            apiURL: "https://blockscout.com/astar/api",
            browserURL: "https://blockscout.com/astar/"
        }
    },
    {
        network: "shiden",
        chainId: 336,
        urls: {
            apiURL: "https://blockscout.com/shiden/api",
            browserURL: "https://blockscout.com/shiden/"
        }
    },
    {
        network: "shibunya",
        chainId: 81,
        urls: {
            apiURL: "https://blockscout.com/shibuya/api",
            browserURL: "https://blockscout.com/shibuya/"
        }
    },
    {
        network: "tomochain",
        chainId: 88,
        urls: {
            apiURL: "",
            browserURL: "https://tomoscan.io/"
        }
    },
    {
        network: "tomochainTestnet",
        chainId: 89,
        urls: {
            apiURL: "",
            browserURL: "https://testnet.tomoscan.io/"
        }
    },
    {
        network: "bobaGoerli",
        chainId: 2888,
        urls: {
            apiURL: "https://api.routescan.io/v2/network/testnet/evm/2888/etherscan",
            browserURL: "https://boba.testnet.routescan.io"
        }
    },
    {
        network: "zetachain",
        chainId: 7000,
        urls: {
            apiURL: "https://zetachain.blockscout.com/api",
            browserURL: "https://zetachain.blockscout.com/"
        }
    },
    {
        network: "zetachainAthens",
        chainId: 7001,
        urls: {
            apiURL: "https://zetachain-athens-3.blockscout.com/api",
            browserURL: "https://zetachain-athens-3.blockscout.com/"
        }
    },   
    {
        network: "engramTestnet",
        chainId: 131,
        urls: {
            apiURL: "https://tokioscan-v2.engram.tech/api",
            browserURL: "https://tokioscan-v2.engram.tech/"
        }
    },   
]
