const { PublicKey } = require("@solana/web3.js");
import _ from "lodash";
import metaplex from "../utils/metaplex";
const { default: getSolNft } = require("../utils/func/solDemo/getSolNft");
const { default: transfer } = require("../utils/func/solDemo/transfer");
import { connection } from "../utils/web3";

const router = require("koa-router")();

router.prefix("/solDemo");

router.get("/", function (ctx, next) {
  console.log(ctx.request.query);
  ctx.body = ctx.request.query.param;
});

router.post("/getNft", async (ctx) => {
  try {
    const address = new PublicKey(ctx.request.body.address);

    const nfts = await metaplex.nfts().findAllByOwner(address);

    const mints = _.map(nfts, (item) => item.mint);

    const nftMetadatas = await metaplex.nfts().findAllByMintList(mints);

    const metadatas = await Promise.all(
      _.map(nftMetadatas, (item) => {
        return item.metadataTask.run();
      })
    );

    const nftDetails = _.map(metadatas, (item, index) => {
      return {
        name: item.name,
        uri: item.image,
        address: mints[index].toString(),
      };
    });

    ctx.body = nftDetails;
  } catch (error) {
    console.log("getNft", error);
  }
});

router.post("/safeTransferFrom", async (ctx, next) => {
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
