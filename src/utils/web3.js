import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ethers } from "ethers";

const privateKey = process.env.PRIVATE_KEY || "";
const publicKey = process.env.PUBLIC_KEY || "";
const url = process.env.rinkebyNet;
const nftUrl = process.env.rinkebyNFTNet;

const alchemyWeb3 = createAlchemyWeb3(url);
const alchemyNftWeb3 = createAlchemyWeb3(nftUrl);

const provider = new ethers.providers.JsonRpcProvider(url);
const wallet = new ethers.Wallet(privateKey, provider);

export { alchemyWeb3, alchemyNftWeb3, provider, wallet, privateKey, publicKey };
