import _ from "lodash";
import { alchemyNftWeb3, publicKey } from "./web3";
import NFTJson from "./contract/new_demo_0630/index.json";

const getNfts = async () => {
  try {
    const nfts = await alchemyNftWeb3.alchemy.getNfts({
      owner: publicKey,
      contractAddresses: [NFTJson.address],
      withMetadata: false,
    });
    let ownNfts = [];

    if (Array.isArray(nfts?.ownedNfts)) {
      ownNfts = _.map(nfts?.ownedNfts, (item) => item.id.tokenId);
    }

    return ownNfts;
  } catch (error) {
    return error;
  }
};

export default getNfts;
