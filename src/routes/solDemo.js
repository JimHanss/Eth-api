const { default: getSolNft } = require("../utils/func/solDemo/getSolNft");
const { default: transfer } = require("../utils/func/solDemo/transfer");

const router = require("koa-router")();

router.prefix("/solDemo");

router.get("/", function (ctx, next) {
  console.log(ctx.request.query);
  ctx.body = ctx.request.query.param;
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
