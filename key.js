import fs from 'fs'; // Add this import

import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
} from '@solana/spl-token';

(async () => {
  // Step 1: Connect to cluster and generate two new Keypairs
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  const fromWallet = Keypair.generate();
  const toWallet = Keypair.generate();

  // Store the toWallet Keypair in wallet.json
  const walletData = {
    fromWallet: {
      publicKey: fromWallet.publicKey.toBase58(),
      secretKey: fromWallet.secretKey.toString(),
    },
    toWallet: {
      publicKey: toWallet.publicKey.toBase58(),
      secretKey: toWallet.secretKey.toString(),
    },
  };

  fs.writeFileSync('wallet.json', JSON.stringify(walletData, null, 2));

    const secretData = {
    toWallet: {
      secretKey: toWallet.secretKey.toString(),
    },
  };

  fs.writeFileSync('secret.json', JSON.stringify(secretData, null, 2));

  // Step 2: Airdrop SOL into your from wallet
  console.log("Airdropping some SOL to my wallet!");
  const fromAirdropSignature = await connection.requestAirdrop(
    fromWallet.publicKey,
    LAMPORTS_PER_SOL
  );
  // Wait for airdrop confirmation
  console.log("------------------");
  await connection.confirmTransaction(fromAirdropSignature, {
    commitment: "confirmed",
  });

  // Step 3: Create a new token mint and get the token account of the fromWallet address
  // If the token account does not exist, create it
  const mint = await createMint(
    connection,
    fromWallet,
    fromWallet.publicKey,
    null,
    9
  );
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet,
    mint,
    fromWallet.publicKey
  );

  // Step 4: Mint a new token to the from account
  let signature = await mintTo(
    connection,
    fromWallet,
    mint,
    fromTokenAccount.address,
    fromWallet.publicKey,
    9991000000000,
    []
  );
  console.log('mint tx:', signature);

  // Step 5: Get the token account of the to-wallet address and if it does not exist, create it
  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet,
    mint,
    toWallet.publicKey
  );

  // Step 6: Transfer the new token to the to-wallet's token account that was just created
  // Transfer the new token to the "toTokenAccount" we just created
  signature = await transfer(
    connection,
    fromWallet,
    fromTokenAccount.address,
    toTokenAccount.address,
    fromWallet.publicKey,
    199000000000,
    []
  );
  console.log('transfer tx:', signature);
  console.log("toWallet address:", toWallet.publicKey.toBase58());

  // Step 7: Get the token balance of the "toWallet" address
  const tokenAccountPublicKey = toTokenAccount.address;

  try {
    // Get the token balance of the specified token account
    const balance = await connection.getTokenAccountBalance(tokenAccountPublicKey);
    console.log(`Token balance for toWallet: ${balance.value.uiAmount}`);
  } catch (error) {
    console.error('Error getting token balance:', error);
  }
})();