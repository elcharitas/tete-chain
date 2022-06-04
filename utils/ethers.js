import Web3Modal from "web3modal";
import WalletConnect from "@walletconnect/web3-provider";
import { ethers, utils } from "ethers";

import { tete_addr, tete_abi } from "../const";

/**
 * Web3Modal provider options
 */
const providerOptions = {
    binancechainwallet: {
        package: true,
    },
    walletconnect: {
        package: WalletConnect,
        options: { infuraId: "9f85cc9583054d398925474ec0c8ed19" },
    },
};

/**
 *
 * @param {number} chainId
 * @param {"dark" | "light"} theme
 * @returns
 */
export const web3Modal = (chainId = 97, theme = "dark") => {
    return new Web3Modal({
        theme,
        chainId,
        cacheProvider: true,
        disableInjectedProvider: false,
        providerOptions,
    });
};

/**
 * provider instance connector
 */
export const provider = {
    /// provider configs
    rpcNode: null,
    chainId: null,
    instance: null,
    contracts: {},

    async connect(chainId) {
        if (!this.instance) {
            this.chainId = chainId;
            this.instance = await web3Modal(chainId).connect();
        }
        return this.instance;
    },

    async disconnect() {
        web3Modal().clearCachedProvider();
        this.instance = null;
    },

    async ethers(chainId) {
        return await this.connect(chainId).then(
            (instance) => new ethers.providers.Web3Provider(instance, chainId)
        );
    },

    async contract(addr = "", abi = [], sync = false) {
        if (!this.contracts[addr])
            this.contracts[addr] = contract(
                addr,
                abi,
                !sync
                    ? (await this.ethers(this.chainId)).getSigner()
                    : this.ethersSync(this.rpcNode)
            );
        return this.contracts[addr];
    },

    /**
     * Gets a readable provider instance
     *
     * @param {string|null} rpcNode
     * @returns
     */
    ethersSync(rpcNode = null) {
        return new ethers.providers.JsonRpcProvider(rpcNode);
    },

    clearCachedProvider() {
        web3Modal().clearCachedProvider();
    },
};

/**
 *
 * @param {string} addr
 * @param {Record<string, unknown>} abi
 * @param {ethers.providers.BaseProvider} provider
 * @returns {{[method: string]: (...args: any[]) => Promise<unknown>}}
 */
function contract(addr, abi = [], provider) {
    if (!provider || typeof addr !== "string" || !abi?.length) return false;
    if (typeof abi[0] === "string") {
        const iface = new utils.Interface(abi);
        abi = iface.format(utils.FormatTypes.json);
    }
    const instance = new ethers.Contract(addr, abi, provider);
    const methods = {};
    for (let { name, inputs = [], outputs = [] } of abi) {
        methods[name] = () => {
            const args = [];
            inputs.forEach((input, index) => {
                input.value = arguments[index];
                switch (input?.type.match(/([a-z]+)/)[1]) {
                    case "address":
                        args.push(utils.getAddress(input.value));
                        break;
                    case "uint":
                        args.push(ethers.BigNumber.from(input.value));
                        break;
                    case "bytes":
                        args.push(utils.toUtf8Bytes(input.value));
                        break;
                    default:
                        args.push(input.value);
                }
            });
            return new Promise((resolve, reject) => {
                instance[name](...args)
                    .then((response) => {
                        const result = [];
                        outputs.forEach((output, index) => {
                            output.value =
                                outputs.length > 1 ? response[index] : response;
                            switch (output?.type.match(/([a-z]+)/)[1]) {
                                case "uint":
                                    result.push(
                                        utils.formatUnits(
                                            String(output.value),
                                            "ether"
                                        )
                                    );
                                    break;
                                case "bytes":
                                    result.push(
                                        utils.toUtf8String(output.value)
                                    );
                                    break;
                                default:
                                    result.push(output.value);
                            }
                        });
                        resolve(result);
                    })
                    .catch((e) =>
                        resolve(
                            e?.reason ||
                                "Oops! This is something I can't handle"
                        )
                    );
            });
        };
    }
    return methods;
}
