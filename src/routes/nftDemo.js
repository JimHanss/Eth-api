const { ethers } = require("ethers");
import ftJson from "../utils/contract/erc20_demo/index.json";
import NFTJson from "../utils/contract/CP_demo/index.json";
import { wallet, alchemyWeb3, publicKey, alchemyNftWeb3 } from "../utils/web3";
import _ from "lodash";
import getNfts from "../utils/getNfts";

const router = require("koa-router")();

router.prefix("/nftDemo");

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

router.post("/getNft", async (ctx) => {
  try {
    const id = ctx.request.body.id;

    const response = await alchemyNftWeb3.alchemy.getNftMetadata({
      contractAddress: NFTJson.address,
      tokenId: id,
    });

    console.log("response:", response);

    ctx.body = response?.media[0]?.raw;
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

      ctx.body = id;
    } else {
      ctx.body = "no nft";
    }
  } catch (error) {
    return error;
  }
});

module.exports = router;
