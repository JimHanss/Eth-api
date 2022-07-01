import {
  bundlrStorage,
  keypairIdentity,
  Metaplex,
} from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import * as bs58 from "bs58";

const secretKey = bs58.decode(
  "3scapBx8rUKxLEjdBhHdVgWkfqLmgNP69j1AKRTFA8ToPkfPVYmvwsQwU7KijyyPErTd2K8e53ZduDnJNEsuXHpz"
);

const keypair = Keypair.fromSecretKey(secretKey);

const connection = new Connection(clusterApiUrl("devnet"));

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(keypair))
  .use(bundlrStorage({ address: "https://devnet.bundlr.network" }));

export default metaplex;
