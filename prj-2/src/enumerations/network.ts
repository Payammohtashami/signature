const networkTypes = {
    ETH_MAINNET: "ETH_MAINNET",
    ETH_TESTNET: "ETH_TESTNET",
}

let networkChianIds: any = {}
let networkArray: any = []

const networks = {
    [networkTypes.ETH_MAINNET]: {
        name: "ETH MAINNET",
        image: "https://www.pinksale.finance/static/media/ic-eth.9270fc02.svg",
        title: "Ethereum Mainnet",
        network: {
            chainId: 1,
            chainName: "Eth Mainnet",
            nativeCurrency: {
                name: "Ether",
                symbol: "ETH",
                decimals: 18
            },
            rpcUrls: [
                "https://mainnet.infura.io/v3/1892f226a2eb40a59c5ca53ea9d6881b",
                "wss://mainnet.infura.io/ws/v3/1892f226a2eb40a59c5ca53ea9d6881b",
                "https://api.mycryptoapi.com/eth",
                "https://cloudflare-eth.com",
            ],
            blockExplorerUrls: ["https://etherscan.io"]
        }
    },
    [networkTypes.ETH_TESTNET]: {
        name: "ETH TESTNET",
        image: "https://www.pinksale.finance/static/media/ic-eth.9270fc02.svg",
        title: "Ethereum Testnet",
        network: {
            chainId: 3,
            chainName: "Eth Testnet",
            nativeCurrency: {
                name: "Ropsten Ether",
                symbol: "Ropsten ETH",
                decimals: 18
            },
            rpcUrls: [
                "https://mainnet.infura.io/v3/1892f226a2eb40a59c5ca53ea9d6881b",
                "wss://mainnet.infura.io/ws/v3/1892f226a2eb40a59c5ca53ea9d6881b",
                "https://api.mycryptoapi.com/eth",
                "https://cloudflare-eth.com",
            ],
            blockExplorerUrls: ["https://etherscan.io"]
        }
    },
};

for (const key in networks) {
    if (Object.hasOwnProperty.call(networks, key)) {
        const obj = networks[key];
        const param = { ...obj, key, value: obj.network.chainId }
        networkChianIds[obj.network.chainId] = param
        networkArray.push(param)
    }
}

export const chooseNetwork = {
    testnet: [
        { ...networks[networkTypes.ETH_TESTNET] },
        { ...networks[networkTypes.ETH_MAINNET] },
    ]
}

export {
    networkChianIds,
    networkArray,
    networkTypes
};
export default networks;