// ethers library, which is a JavaScript library for interacting with the Ethereum blockchain.
import { Wallet, providers, getDefaultProvider } from "ethers";

export const getAccount = async () => {
  /*
  A Provider provides a connection to the blockchain, whch can be used to query its current state, simulate execution and 
  send transactions to update the state.It is one of the most fundamental components of interacting with a blockchain application, 
  and there are many ways to connect, such as over HTTP, WebSockets or injected providers such as MetaMask. 
  */
  const polygonProvider = new providers.InfuraProvider("matic", "<INFURA_API_KEY>")
  const signerFromPrivateKey = new Wallet("0x11cd7250b5b4af51bd9fad57e0e1d5d55f3b0abae454b6104b2da5562030f2a3", polygonProvider);

  // returns a Signer, an abstraction of an Ethereum account that can be used to sign transactions
  return {
    // providerSigner: The Ethereum signer for the provider. This signer can be used to sign transactions.
    providerSigner: await signerFromPrivateKey,
    // providerNetwork: The network that the provider is connected to.
    providerNetwork: await polygonProvider.getNetwork(),
  };
};