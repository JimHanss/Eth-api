const { ethers } = require("ethers");
import ftJson from "../utils/contract/erc20_demo/index.json";
import NFTJson from "../utils/contract/new_demo_0630/index.json";
import { wallet, alchemyWeb3, publicKey, alchemyNftWeb3 } from "../utils/web3";
import _ from "lodash";
import getNfts from "../utils/getNfts";

const router = require("koa-router")();

router.prefix("/ethDemo");

router.get("/", function (ctx, next) {
  console.log(ctx.request.query);
  ctx.body = ctx.request.query.param;
});

router.post("/getBalances", async (ctx, next) => {
  const contract = new ethers.Contract(ftJson.address, ftJson.abi, wallet);

  const balance = await contract.balances(
    "0x6B146237628E393AF0A280e99a1436821A829341"
  );

  ctx.body = balance;
});

// router.post("/getNft", async (ctx) => {
//   try {
//     const id = ctx.request.body.id;

//     const response = await alchemyNftWeb3.alchemy.getNftMetadata({
//       contractAddress: "0x96ba5a2636fBF3ef36e54F338B1656a3450e8696",
//       tokenId: id,
//     });

//     console.log("response:", response);

//     // ctx.body = response?.media[0]?.raw;
//     ctx.body = response;
//   } catch (error) {
//     ctx.body = error;
//   }
// });

router.post("/getNft", async (ctx) => {
  try {
    const address = ctx.request.body.address;
    const nfts = await alchemyNftWeb3.alchemy.getNfts({
      owner: address,
      contractAddresses: [NFTJson.address],
      withMetadata: true,
    });

    ctx.body = _.map(nfts.ownedNfts, (item) => {
      return {
        name: item.title,
        uri: item.media[0].gateway,
        address: NFTJson.address,
      };
    });
  } catch (error) {
    ctx.body = error;
  }
});

router.post("/safeTransferFrom", async (ctx) => {
  try {
    const ownNfts = await getNfts();

    if (Array.isArray(ownNfts) && ownNfts.length > 0) {
      const contract = new ethers.Contract(
        NFTJson.address,
        NFTJson.abi,
        wallet
      );

      const address = ctx.request.body.address;

      const id = ownNfts[Math.floor(Math.random() * ownNfts.length)];

      await contract.safeTransferFrom(publicKey, address, id, 1, []);

      ctx.body = id ?? ownNfts;
    } else {
      ctx.body = "no nft";
    }
  } catch (error) {
    return error;
  }
});

module.exports = router;
