const { PublicKey } = require("@solana/web3.js");
import _ from "lodash";
const { default: getSolNft } = require("../utils/func/solDemo/getSolNft");
const { default: transfer } = require("../utils/func/solDemo/transfer");
import { connection } from "../utils/web3";
import { programs } from "@metaplex/js";

const router = require("koa-router")();

router.prefix("/solDemo");

router.get("/", function (ctx, next) {
  console.log(ctx.request.query);
  ctx.body = ctx.request.query.param;
});

router.post("/getNft", async (ctx) => {
  try {
    const nfts = await getSolNft(
      "GcGWaaKhKuNrfjy4xiyqbHTFw46NpCv8VkyXwgBmShbL"
    );

    const aa = _.map(nfts, (item) => item.toString());

    const tokenMetadata = await programs.metadata.Metadata.findByMint(
      connection,
      nfts[0]
    );

    console.log(tokenMetadata);

    ctx.body = aa;
  } catch (error) {
    console.log("getNft", error);
  }
});

router.post("/transfer", async (ctx, next) => {
  try {
    const address = ctx.request.body.address;

    const nftsAddress = await getSolNft(
      "GcGWaaKhKuNrfjy4xiyqbHTFw46NpCv8VkyXwgBmShbL"
    );

    const nonce = Math.floor(Math.random() * nftsAddress.length);

    const randomNft = nftsAddress[nonce];

    const txhash = await transfer(randomNft, address);

    ctx.body = txhash;
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
