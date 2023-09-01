# certsAPI-nodejs

The function onConnect() under source/opencerts/issueCert.ts is where we obtain the Provider and Signer using getAccount().

getAccount() can be found in source/services/account.tsx, where we use the INFURA API key to get the Provider, and get the Signer using a wallet's private key. The Signer and network are then returned.

After the document is wrapped (in issueCert.ts), we use issueDocument() to issue the document by providing the wrapped document, the signer and the document store address.

The issueDocument() function can be found in source/services/document-store.tsx. This function has been left unchanged (from the demo repository), other than changing the type of the signer to Wallet.
