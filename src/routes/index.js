import { alchemyWeb3 } from "../utils/web3";
const router = require("koa-router")();

router.get("/", async (ctx, _next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/getBlockNumber", async (ctx, _next) => {
  const blockNumber = await alchemyWeb3.eth.getBlockNumber();

  ctx.body = blockNumber;
});

router.get("/json", async (ctx, _next) => {
  ctx.body = {
    title: "koa2 json",
  };
});

module.exports = router;
