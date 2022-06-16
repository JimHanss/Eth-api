const { ethers } = require("ethers");
import ftJson from "../utils/contract/erc20_demo/index.json";
import NFTJson from "../utils/contract/CP_demo/index.json";
import { wallet, alchemyWeb3, publicKey, alchemyNftWeb3 } from "../utils/web3";

const router = require("koa-router")();

router.prefix("/nft");

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
  console.log(JSON.parse(ctx.request.body));
  console.log(typeof ctx.request.body);

  ctx.body = JSON.parse(ctx.request.body);
});

router.post("/safeTransferFrom", async (ctx, next) => {
  // const contract = new ethers.Contract(NFTJson.address, NFTJson.abi, wallet);
  // const address =  JSON.parse(ctx.request.body).address

  // const result = await contract.safeTransferFrom(publicKey,address,id,1,[])

  // ctx.body = result;
  const nfts = await alchemyNftWeb3.alchemy.getNfts({
    owner: publicKey,
    contractAddresses: [NFTJson.address],
    withMetadata: false,
  });

  ctx.body = nfts;
});

module.exports = router;
