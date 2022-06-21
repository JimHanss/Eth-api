import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ethers } from "ethers";

const privateKey =
  "0x26bba027d7a9efb6778edce028539382651fb081353295e0011be24280bcd376";
const publicKey = "0x5136042e2a35B9c649faD7229cbc2594E8FD856E";
const url =
  "https://eth-rinkeby.alchemyapi.io/v2/qx5q8YdLAvVqoOfkm365wMLhQFYOwsWV";
const nftUrl =
  "https://eth-rinkeby.alchemyapi.io/nft/v2/qx5q8YdLAvVqoOfkm365wMLhQFYOwsWV";

const alchemyWeb3 = createAlchemyWeb3(url);
const alchemyNftWeb3 = createAlchemyWeb3(nftUrl);

const provider = new ethers.providers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey, provider);

export { alchemyWeb3, alchemyNftWeb3, provider, wallet, privateKey, publicKey };
