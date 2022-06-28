import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { connection } from "../../web3";

const getSolNft = async (publicKey) => {
  try {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(publicKey),
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );

    const nfts = tokenAccounts.value.filter((item) => {
      const accountInfo = AccountLayout.decode(item.account.data);

      return accountInfo.amount === 1n;
    });

    return nfts.map((item) => {
      const accountInfo = AccountLayout.decode(item.account.data);

      return accountInfo.mint;
    });
  } catch (error) {
    console.log(error);
  }
};

export default getSolNft;
