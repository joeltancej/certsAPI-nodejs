// DocumentStoreFactory class is a factory that can be used to deploy document stores on the Ethereum blockchain
import { DocumentStoreFactory, connect } from "@govtechsg/document-store";
import { WrappedDocument } from "@govtechsg/open-attestation/dist/types/2.0/types";
import { Wallet, BigNumber } from "ethers"

const scaleBigNumber = (wei: BigNumber | null | undefined, multiplier: number, precision = 2): BigNumber => {
  if (wei === null || typeof wei === "undefined") {
    throw new Error("Wei not specified");
  }
  const padding = Math.pow(10, precision);
  const newMultiplier = Math.round(padding * multiplier);

  const newWei = wei.mul(newMultiplier).div(padding);
  return newWei;
};

export const issueDocument = async ({
    /*

    issueDocument - Issues wrapped document to document store using signer.

    Arguments:
      wrappedDocument: The wrapped document that needs to be issued.
      documentStoreAddress: The address of the document store.
      signer: The signer that will be used to sign the issuance transaction.

    Returns:
      This functions does not return anything.
    */
    wrappedDocument,
    documentStoreAddress,
    signer,
  }: {
    wrappedDocument: WrappedDocument;
    documentStoreAddress: string;
    signer: Wallet;
  }) => {

    // targetHash: Target hash extracted from the wrapped document.
    const {
      signature: { targetHash },
    } = wrappedDocument;

    // documentStore: New document store object created by connecting to the document store at the specified address.
    const documentStore = DocumentStoreFactory.connect(
      documentStoreAddress,
      signer,
    );

    // Get recommended fee data.
    const { gasPrice } = await signer.getFeeData()
    console.log("Recommended Gas Price:", gasPrice?.toNumber())
    // Put gas price through a multiplier.
    const scaledPrice = scaleBigNumber(gasPrice, 3)
    console.log("Scaled Price:", scaledPrice?.toNumber())
    // Receipt: Receipt received after issuing the document to the document store.
    const receipt = await documentStore.issue(`0x${targetHash}`, {gasPrice:scaledPrice});
    // Waits for the issuance transaction to be mined.
    await receipt.wait();
  };