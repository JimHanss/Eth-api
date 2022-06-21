const { ethers } = require("ethers");
import ftJson from "../utils/contract/erc20_demo/index.json";
import NFTJson from "../utils/contract/CP_demo/index.json";
import { wallet, alchemyWeb3, publicKey, alchemyNftWeb3 } from "../utils/web3";
import _ from "lodash";
import getNfts from "../utils/getNfts";

const router = require("koa-router")();

router.prefix("/nftDemo");

router.get("/", function (ctx, next) {
  ctx.body = "123";
});

router.post("/getBalances", async (ctx, next) => {
  const contract = new ethers.Contract(ftJson.address, ftJson.abi, wallet);

  const balance = await contract.balances(
    "0x6B146237628E393AF0A280e99a1436821A829341"
  );

  ctx.body = balance;
});

router.post("/getBody", async (ctx, next) => {
  try {
    // console.log(JSON.parse(ctx.request.body));
    console.log(typeof ctx.request.body);

    ctx.body = ctx.request.body;

    // console.log("1111");
    // ctx.body = "body";
  } catch (error) {
    console.log("error", error);
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
      const id = ownNfts[Math.floor(Math.random() * ownNfts.length + 1)];

      const result = await contract.safeTransferFrom(
        publicKey,
        address,
        id,
        1,
        []
      );

      ctx.body = result;
    } else {
      ctx.body = "no nft";
    }
  } catch (error) {
    console.log(error);
    return error;
  }
});

module.exports = router;
