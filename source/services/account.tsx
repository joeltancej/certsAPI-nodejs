// ethers library, which is a JavaScript library for interacting with the Ethereum blockchain.
import { Wallet, providers, getDefaultProvider } from "ethers";


// privateWalletKey: Private key of the Polygon wallet.
const privateWalletKey = `${process.env.PRIVATE_WALLET_KEY}`;
// infuraKey: Infura API key.
const infuraKey = `${process.env.INFURA_API_KEY}`;

export const getAccount = async () => {
  /*
  A Provider provides a connection to the blockchain, whch can be used to query its current state, simulate execution and 
  send transactions to update the state.It is one of the most fundamental components of interacting with a blockchain application, 
  and there are many ways to connect, such as over HTTP, WebSockets or injected providers such as MetaMask. 
  */
  const polygonProvider = new providers.InfuraProvider("matic", infuraKey)
  const signerFromPrivateKey = new Wallet(privateWalletKey, polygonProvider);

  // Returns a Signer, an abstraction of an Ethereum account that can be used to sign transactions
  return {
    // providerSigner: The Ethereum signer for the provider. This signer can be used to sign transactions.
    providerSigner: await signerFromPrivateKey,
    // providerNetwork: The network that the provider is connected to.
    providerNetwork: await polygonProvider.getNetwork(),
  };
};
