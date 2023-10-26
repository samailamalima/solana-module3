# SPL Token Creation and Configuration Guide

This guide provides step-by-step instructions on creating an SPL (Solana Program Library) token, setting up a new wallet, and configuring your Solana CLI to establish a connection to a QuickNode RPC for testing and development purposes. These steps are essential for working with SPL tokens on the Solana blockchain.

## Step 1: Create an SPL Token

Before proceeding, you should have already created an SPL token. If you haven't created one yet, you can follow the instructions provided in your lesson materials or documentation specific to your use case.

Ensure that you have the `config.json` file updated with the `splTokenAddress` of the token you created in Step 1. This address is essential for interacting with your token in subsequent steps.

## Step 2: Set Up a New Wallet

To interact with the Solana blockchain, you'll need a wallet. Follow these steps to create a new wallet specifically for devnet testing:

1. Open your terminal.

2. Run the following command to create a new wallet and save it to a file (`wallet.json` in this example):
   ```
   solana-keygen new --outfile ./wallet.json
   ```

3. You can skip setting a password for this wallet since it will only be used on the devnet, where funds are not important. Simply press Enter when prompted.

4. Confirm that the wallet you just generated will be used as the default wallet for Solana CLI by running the following command:
   ```
   solana config set --keypair ./wallet.json
   ```

   This command sets your new wallet as the default for Solana CLI, ensuring that all future transactions and interactions are associated with this wallet.

## Step 3: Establish a Connection to Your QuickNode RPC

To interact with Solana's blockchain, you need to connect to a node. You have the option to use public nodes or deploy and manage your own infrastructure. However, for faster response times, you can leverage QuickNode. Follow these steps to connect your Solana CLI to a QuickNode RPC:

1. **Sign Up for QuickNode**: If you haven't already, sign up for QuickNode at [QuickNode Signup](https://quicknode.com/). QuickNode offers enhanced node infrastructure for Solana and other blockchains.

2. **Launch a Solana Devnet Node**: Within your QuickNode dashboard, create a Solana Devnet node and copy the HTTP link provided. This link is your QuickNode RPC endpoint for Solana Devnet.

3. In your terminal, run the following command to set the Solana CLI RPC endpoint to your QuickNode Devnet node:
   ```
   solana config set --url <your-quicknode-rpc-url>
   ```

   Replace `<your-quicknode-rpc-url>` with the URL you copied from your QuickNode dashboard.

With these steps completed, you have set up your Solana environment to work with your custom SPL token, created a wallet for testing, and established a connection to a QuickNode RPC for enhanced development capabilities. You are now ready to interact with Solana and your token using the configured wallet and RPC settings.




After configuring the Solana Devnet endpoint, you should have a functional connection to the Solana blockchain.

## Step 2: Fund Your Wallet

To perform transactions on the Solana Devnet, you'll need to have some SOL (Solana's native cryptocurrency) in your wallet. You can airdrop 1 SOL into your wallet for testing purposes with the following command:

```shell
solana airdrop 1 
```

If successful, you should see a message indicating "Airdrop success." You can also check your wallet balance using:

```shell
solana balance
```

You should now have 1 SOL in your wallet.

## Step 3: Prepare NFT Assets

To mint NFTs using the Candy Machine, you'll need to prepare your NFT assets in the form of image files (e.g., PNGs) and corresponding JSON metadata files. Follow these steps:

1. **Asset Naming**: Name your assets and JSON metadata files sequentially, starting from 0 and increasing without skipping a number. For example, `0.json` should correspond to `0.png`, `1.json` to `1.png`, and so on.

2. **Download Sample Assets**: You can use Metaplex's sample set of assets for consistency. Download and extract the contents of the sample set to a directory named `./assets/` in your project folder. This is the default directory that Sugar, the Candy Machine tool, will use to find your NFT files.

3. **Edit JSON Metadata**: You can edit the JSON metadata files to include the relevant information for each NFT. Ensure that the JSON metadata complies with the URI JSON schema and includes necessary details such as name, description, image URL, and any other relevant attributes for your NFTs.

## Step 4: Configure Candy Machine

Now, let's configure your Candy Machine for minting NFTs. Create a new file named `config.json` in your project's root folder. This configuration file will specify various parameters for your Candy Machine:

```json
{
    "price": 0.01,
    "number": 10,
    "symbol": "NB",
    "sellerFeeBasisPoints": 500,
    "gatekeeper": null,
    "solTreasuryAccount": "98TLazFjiT4tUJGxTRupwkEsUTVDd2A2MuU9twfjEh2U",
    "splTokenAccount": null,
    "splToken": null,
    "goLiveDate": "2022-07-24T00:00:00Z",
    "endSettings": null,
    "whitelistMintSettings": null,
    "hiddenSettings": null,
    "uploadMethod": "bundlr"  ,
    "awsS3Bucket": null,
    "retainAuthority": true,
    "isMutable": true,
    "creators": [
    {
      "address": "98TLazFjiT4tUJGxTRupwkEsUTVDd2A2MuU9twfjEh2U",
      "share": 100
    }
  ]
}

```

- Replace `"Your NFT Collection Name"` with the desired name for your NFT collection.
- Replace `"SYM"` with the desired symbol for your NFTs.
- Replace `"Your Creator Address"` with the Solana address of the creator.
- Ensure that `"share"` adds up to 100 for each creator if there are multiple creators.
- Replace `"Your Token Metadata Program Address"`, `"Your Token Program Address"`, `"Your Seller Fee Address"`, `"Your Candy Machine ID"`, and `"Your Config Address"` with the respective addresses for your project.

With this `config.json` file, you have configured your Candy Machine to mint NFTs using the specified parameters.

You are now ready to proceed with the minting process using your Candy Machine and the prepared NFT assets. Continue with the necessary steps as per your project's requirements and the Candy Machine documentation.


# Setting Up a Candy Machine and Minting NFTs

In this section, we'll guide you through the process of setting up a Candy Machine, deploying it, verifying its configuration, and then minting NFTs using your Candy Machine. Let's get started!

## Prerequisites

Before proceeding, ensure that you have completed the previous steps, including configuring your wallet, preparing NFT assets, and creating a `config.json` file as described in the earlier sections.

### Checking Wallet Address

You can obtain your wallet address by running the following command in your terminal:

```shell
solana address
```

Make sure to have your wallet address on hand, as you'll need it later.

### Directory Structure

Your project directory should have a structure similar to the following:

```

    wallet.json
    config.json
    assets/
        [0-9].png
        [0-9].json
        collection.png
        collection.json
```

### Sugar Validation

Before proceeding, it's essential to validate your setup. In your terminal, run:

```shell
sugar validate
```

You should see a success message indicating that the validation was successful. This step ensures that your project is correctly configured for Candy Machine deployment.

## Create Candy Machine

With your project validated, you're ready to create your Candy Machine. The commands you use are straightforward because you've already set up your RPC, wallet, and saved assets and `config.json` in the Sugar default directories.

### Upload Your Assets

In your terminal, enter:

```shell
sugar upload
```

You should see a success message indicating that your assets have been successfully uploaded to the Candy Machine.

### Deploy Candy Machine

Next, deploy your Candy Machine by entering the following command in your terminal:

```shell
sugar deploy
```

Upon success, you'll see a message indicating that your Candy Machine has been deployed. If you encounter a "Blockhash not found" error, try running the command again.

Make sure to store the Candy Machine ID provided in your terminal locally, as you'll need it in the following steps.

### Verify Candy Machine

To ensure that everything is set up correctly, verify your Candy Machine by running:

```shell
sugar verify
```

You should see a message confirming that the Candy Machine has been successfully verified.

## Test Your Candy Machine

Now, it's time to test your Candy Machine by minting an NFT.

In your terminal, enter:

```shell
sugar mint
```

If the minting process is successful, you should receive a message indicating that the mint was successful. Congratulations!

## Set Up a Minting Site

To allow users to mint NFTs from your Candy Machine, you can set up a minting site using the Candy Machine UI provided by Metaplex. Follow these steps:

### Clone the Candy Machine UI Repository

From your project directory, run the following commands in your terminal:

```shell
git clone https://github.com/metaplex-foundation/candy-machine-ui ./candy-machine-ui/
cd candy-machine-ui
```

### Rename .env.example

Rename the file `.env.example` to `.env` in the `candy-machine-ui` directory.

### Update .env Values

Edit the `.env` file and replace the placeholder values with the following:

```env
REACT_APP_CANDY_MACHINE_ID=<YOUR_CANDY_MACHINE_PUBKEY>
REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_SOLANA_RPC_HOST=<YOUR_QUICKNODE_DEVNET_ENDPOINT>
```

Replace `<YOUR_CANDY_MACHINE_PUBKEY>` with the Candy Machine ID you saved earlier. Replace `<YOUR_QUICKNODE_DEVNET_ENDPOINT>` with the QuickNode Devnet endpoint.

### Install Dependencies and Start the Minting Site

From the `candy-machine-ui` folder, run the following commands:

```shell
yarn install
yarn start
```

This will open a browser at `localhost:3000`, where users can connect their wallets and mint NFTs.

### Airdrop Funds to Your Phantom Wallet

Ensure that your Phantom Wallet is set to the Devnet network, not Mainnet, and has some Devnet SOL for minting NFTs. You can airdrop SOL to your Phantom Wallet using the following command in your terminal:

```shell
solana airdrop 1 YOUR_PHANTOM_WALLET_ADDRESS
```

### Mint an NFT

Once you're ready, click the "Mint" button on the Minting page. If successful, you should see a confirmation and be able to view the minted NFT in your wallet.

