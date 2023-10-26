import {
    clusterApiUrl,
    Connection,
    PublicKey,
  } from '@solana/web3.js';
  import {
    Token,
  } from '@solana/spl-token';
  
  (async () => {
    // Connect to the Solana cluster
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  
    // The public key of the token account you want to check the balance for
    const tokenAccountPublicKey = new PublicKey('YOUR_TOKEN_ACCOUNT_PUBLIC_KEY');
  
    // The public key of the token mint associated with the token
    const tokenMintPublicKey = new PublicKey('3yDMu3xMtqb2pGP3eaQhyi6yvtxXV2SEjTUjZ4DvTtmo');
  
    // Create a Token object using the token mint's public key
    const token = new Token(connection, tokenMintPublicKey, TokenProgram);
  
    try {
      // Get the token balance of the specified token account
      const balance = await token.getBalance(tokenAccountPublicKey);
      console.log(`Token balance: ${balance.toString()}`);
    } catch (error) {
      console.error('Error getting token balance:', error);
    }
  })();
  