import "dotenv/config";
require("dotenv").config({ path: require("find-config")(".env") });

export const SUPPORTED_NETWORKS = {
  hardhat: {
    allowUnlimitedContractSize: true,
  },
  firechain: {
    url: 'https://mainnet.rpc1.thefirechain.com',
    accounts: [process.env.DEPLOYER_KEY!],
  },
  rinia: {
    url: 'https://rinia.rpc1.thefirechain.com',
    accounts: [process.env.DEPLOYER_KEY!],
  },
  mainnet: {
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  goerli: {
    url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  sepolia: {
    url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  holesky: {
    url: `https://ethereum-holesky.publicnode.com`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  bsc: {
    url: 'https://bsc-dataseed.binance.org/',
    accounts: [process.env.DEPLOYER_KEY!],
  },
  bscTestnet: {
    url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    accounts: [process.env.DEPLOYER_KEY!],
    gasPrice: 20000000000,
  },
  opBnb: {
    url: "https://opbnb-mainnet-rpc.bnbchain.org",
    accounts: [process.env.DEPLOYER_KEY!],
    gasPrice: 20000000000,
  },
  opBnbTestnet: {
    url: "https://opbnb-testnet-rpc.bnbchain.org",
    accounts: [process.env.DEPLOYER_KEY!],
    gasPrice: 20000000000,
  },
  polygon: {
    url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  polygonMumbai: {
    url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  polygonZkevm: {
    url: `https://zkevm-rpc.com`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  polygonZkevmTestnet: {
    url: `https://rpc.public.zkevm-test.net`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  avalanche: {
    url: `https://avalanche-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  avalancheFujiTestnet: {
    url: `https://avalanche-fuji.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
    gasPrice: 225000000000,
  },
  opera: {
    url: `https://rpc.ftm.tools`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  ftmTestnet: {
    url: `https://rpc.testnet.fantom.network`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  arbitrumOne: {
    url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  arbitrumGoerli: {
    url: `https://arbitrum-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  optimisticEthereum: {
    url: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  optimisticGoerli: {
    url: `https://optimism-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  linea: {
    url: `https://linea-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  lineaGoerli: {
    url: `https://linea-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  palm: {
    url: `https://palm-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  palmTestnet: {
    url: `https://palm-testnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  celo: {
    url: `https://celo-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  celoAlfajores: {
    url: `https://celo-alfajores.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  base: {
    url: 'https://mainnet.base.org',
    accounts: [process.env.DEPLOYER_KEY!],
    gasPrice: 1000000000,
  },
  baseGoerli: {
    url: 'https://goerli.base.org',
    accounts: [process.env.DEPLOYER_KEY!],
    gasPrice: 1000000000,
  },
  shibarium: {
    url: 'https://www.shibrpc.com',
    accounts: [process.env.DEPLOYER_KEY!],
  },
  shibariumPuppynet: {
    url: 'https://puppynet.shibrpc.com',
    accounts: [process.env.DEPLOYER_KEY!],
  },
  fusion: {
    url: `https://mainnet.fusionnetwork.io`,
    accounts: [process.env.DEPLOYER_KEY!],
    gasPrice: 20000000000,
  },
  fusionTestnet: {
    url: `https://testnet.fusionnetwork.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  cronos: {
    url: `https://evm.cronos.org`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  cronosTestnet: {
    url: `https://evm-t3.cronos.org/`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  scrollSepolia: {
    url: 'https://sepolia-rpc.scroll.io/',
    accounts: [process.env.DEPLOYER_KEY!],
  },
  rsk: {
    url: `https://public-node.rsk.co`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  rskTestnet: {
    url: `https://public-node.testnet.rsk.co`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  moonriver: {
    url: `https://rpc.api.moonriver.moonbeam.network`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  moonbeam: {
    url: `https://rpc.api.moonbeam.network`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  moonbaseAlpha: {
    url: `https://rpc.api.moonbase.moonbeam.network`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  pulsechain: {
    url: `https://rpc.pulsechain.com`,
    accounts: [process.env.DEPLOYER_KEY!],
    gasPrice: 50000000000
  },
  pulsechainTestnet: {
    url: `https://rpc.v4.testnet.pulsechain.com`,
    accounts: [process.env.DEPLOYER_KEY!],
    gasPrice: 50000000000
  },
  metis: {
    url: 'https://andromeda.metis.io/?owner=1088',
    accounts: [process.env.DEPLOYER_KEY!],
  },
  metisGoerli: {
    url: 'https://goerli.gateway.metisdevops.link',
    accounts: [process.env.DEPLOYER_KEY!],
  },
  harmony: {
    url: `https://api.harmony.one/`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  harmonyTest: {
    url: `https://api.s0.b.hmny.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  aurora: {
    url: `https://aurora.drpc.org	`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  auroraTestnet: {
    url: `https://testnet.aurora.dev`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  dogechain: {
    url: `https://rpc.dogechain.dog`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  dogechainTestnet: {
    url: `https://rpc-testnet.dogechain.dog`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  coinex: {
    url: `https://rpc.coinex.net`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  coinexTestnet: {
    url: `https://testnet-rpc.coinex.net`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  flare: {
    url: `https://flare-api.flare.network/ext/C/rpc`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  flareTestnet: {
    url: `https://coston2-api.flare.network/ext/C/rpc`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  klaytn: {
    url: `https://1rpc.io/klay`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  klaytnBaobab: {
    url: `https://api.baobab.klaytn.net:8651`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  fuse: {
    url: `https://rpc.fuse.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  fuseSparknet: {
    url: `https://rpc.fusespark.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  bttchain: {
    url: `https://rpc.bittorrentchain.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  bttchainTestnet: {
    url: `https://pre-rpc.bt.io/`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  thundercore: {
    url: `https://mainnet-rpc.thundercore.com`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  thundercoreTestnet: {
    url: `https://testnet-rpc.thundercore.com`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  heco: {
    url: `https://http-mainnet.hecochain.com`,
    accounts: [process.env.DEPLOYER_KEY!],
    gasPrice: 20000000000,
  },
  cmp: {
    url: `https://mainnet.block.caduceus.foundation`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  cmpTestnet: {
    url: `https://galaxy.block.caduceus.foundation`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  kava: {
    url: `https://evm.kava.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  kavaTestnet: {
    url: `https://evm.testnet.kava.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  conflux: {
    url: `https://evm.confluxrpc.com`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  confluxTestnet: {
    url: `https://evmtestnet.confluxrpc.com`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  ultron: {
    url: `https://ultron-rpc.net`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  ultronTestnet: {
    url: `https://ultron-dev.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  gnosis: {
    url: `https://rpc.gnosischain.com`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  gnosisChiado: {
    url: `https://rpc.chiadochain.net`,
    accounts: [process.env.DEPLOYER_KEY!],
    gasPrice: 1000000000
  },
  telos: {
    url: `https://mainnet.telos.net/evm`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  telosTestnet: {
    url: `https://testnet.telos.net/evm`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  wanchain: {
    url: `https://gwan-ssl.wandevs.org:56891`,
    accounts: [process.env.DEPLOYER_KEY!],
    gasPrice: 20000000,
  },
  wanchainTestnet: {
    url: `https://gwan-ssl.wandevs.org:46891`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  kardiachain: {
    url: `https://rpc.kardiachain.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  brisechain: {
    url: `https://mainnet-rpc.brisescan.com`,
    accounts: [process.env.DEPLOYER_KEY!],
    gasPrice: 20000000000,
  },
  elastos: {
    url: `https://api.elastos.io/eth`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  xinfin: {
    url: `https://rpc.xinfin.network`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  xinfinTestnet: {
    url: `https://rpc.apothem.network`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  callisto: {
    url: `https://rpc.callisto.network`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  callistoTestnet: {
    url: `https://testnet-rpc.callisto.network`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  taraxa: {
    url: `https://rpc.mainnet.taraxa.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  taraxaTestnet: {
    url: `https://rpc.testnet.taraxa.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  kcc: {
    url: `https://kcc-rpc.com`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  kccTestnet: {
    url: `https://rpc-testnet.kcc.network`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  core: {
    url: `https://rpc.coredao.org`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  coreTestnet: {
    url: `https://rpc.test.btcs.network`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  astar: {
    url: `https://evm.astar.network`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  shiden: {
    url: `https://shiden.public.blastapi.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  shibunya: {
    url: `https://shibuya.public.blastapi.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  tomochain: {
    url: `https://rpc.tomochain.com`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  tomochainTestnet: {
    url: `https://rpc.testnet.tomochain.com`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  okxchain: {
    url: `https://exchainrpc.okex.org`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  okxchainTestnet: {
    url: `https://exchaintestrpc.okex.org`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  godwoken: {
    url: `https://v1.mainnet.godwoken.io/rpc`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  godwokenTestnet: {
    url: `https://v1.testnet.godwoken.io/rpc`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  meter: {
    url: `https://rpc.meter.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  meterTestnet: {
    url: `https://rpctest.meter.io`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  boba: {
    url: `https://mainnet.boba.network`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  bobaGoerli: {
    url: `https://goerli.boba.network`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  zetachain: {
    url: `https://api.mainnet.zetachain.com/evm`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  zetachainAthens: {
    url: `https://zetachain-athens-evm.blockpi.network/v1/rpc/public`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
  engramTestnet: {
    url: `https://tokio-archive.engram.tech`,
    accounts: [process.env.DEPLOYER_KEY!],
  },
}