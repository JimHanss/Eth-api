import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { connection } from "../../web3";
import * as bs58 from "bs58";
import {
  createTransferCheckedInstruction,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";

const transfer = async (tokenPublicKey, receivePublicKey) => {
  try {
    // 支付交易费的钱包，传私钥
    const feePayer = Keypair.fromSecretKey(
      bs58.decode(
        "3scapBx8rUKxLEjdBhHdVgWkfqLmgNP69j1AKRTFA8ToPkfPVYmvwsQwU7KijyyPErTd2K8e53ZduDnJNEsuXHpz"
      )
    );

    // token 地址
    const mintPubkey = new PublicKey(tokenPublicKey);

    // from 钱包的公钥
    const tokenAccount1Pubkey = new PublicKey(
      "GcGWaaKhKuNrfjy4xiyqbHTFw46NpCv8VkyXwgBmShbL"
    );

    // to 钱包的公钥
    const tokenAccount2Pubkey = new PublicKey(receivePublicKey);

    // 获取 from 钱包在token里的account，如果没有，则创建
    const tokenAccount1 = await getOrCreateAssociatedTokenAccount(
      connection,
      feePayer,
      mintPubkey,
      tokenAccount1Pubkey
    );

    // 获取 to 钱包在token里的account，如果没有，则创建
    const tokenAccount2 = await getOrCreateAssociatedTokenAccount(
      connection,
      feePayer,
      mintPubkey,
      tokenAccount2Pubkey
    );

    let tx = new Transaction();
    tx.add(
      createTransferCheckedInstruction(
        tokenAccount1.address,
        mintPubkey,
        tokenAccount2.address,
        feePayer.publicKey,
        1,
        0
      )
    );

    return await connection.sendTransaction(tx, [feePayer]);
  } catch (error) {
    console.log(error);
  }
};

export default transfer;
