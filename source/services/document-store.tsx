// JsonRpcSigner class represents a signer that can be used to sign Ethereum transactions
import { JsonRpcSigner } from "@ethersproject/providers";
// DocumentStoreFactory class is a factory that can be used to deploy document stores on the Ethereum blockchain
import { DocumentStoreFactory, connect } from "@govtechsg/document-store";
import { WrappedDocument } from "@govtechsg/open-attestation/dist/types/2.0/types";
import { Wallet } from "ethers"

/* 
deployDocumentStore function takes a JsonRpcSigner object as an input, 
and it returns the address of the deployed document store
*/
export const deployDocumentStore = async (signer: JsonRpcSigner) => {
    // creates a new DocumentStoreFactory object using the signer object
    const factory = new DocumentStoreFactory(signer);
    // calls the deploy method on the DocumentStoreFactory object to deploy the document store
    const documentStore = await factory.deploy("My Document Store", await signer.getAddress());
    // wait for the transaction to be mined
    await documentStore.deployTransaction.wait();
    // returns the address of the deployed document store
    return documentStore.address;
};

export const issueMerkleRoot = async ({
  /*
  wrappedDocument: The wrapped document that needs to be issued.
  documentStoreAddress: The address of the document store.
  signer: The signer that will be used to sign the issuance transaction.
  */
  wrappedDocument,
  documentStoreAddress,
  signer,
}: {
  wrappedDocument: WrappedDocument;
  documentStoreAddress: string;
  signer: Wallet;
}) => {
  const documentStore = connect(documentStoreAddress, signer);

  const {
    signature: { targetHash },
  } = wrappedDocument;
  const tx = (await documentStore).issue(`0x${targetHash}`);
  const receipt = (await tx).wait();
  console.log(receipt);

  const isIssued = (await documentStore).isIssued(`0x${targetHash}`);
  console.log(isIssued);
};

export const issueDocument = async ({
    /*
    wrappedDocument: The wrapped document that needs to be issued.
    documentStoreAddress: The address of the document store.
    signer: The signer that will be used to sign the issuance transaction.
    */
    wrappedDocument,
    documentStoreAddress,
    signer,
  }: {
    wrappedDocument: WrappedDocument;
    documentStoreAddress: string;
    signer: Wallet;
  }) => {
    // extracts the target hash from the wrapped document
    const {
      signature: { targetHash },
    } = wrappedDocument;
    // creates a new document store object by connecting to the document store at the specified address
    const documentStore = DocumentStoreFactory.connect(
      documentStoreAddress,
      signer,
    );
    // issues the document to the document store
    const receipt = await documentStore.issue(`0x${targetHash}`);
    // waits for the issuance transaction to be mined
    await receipt.wait();
  };