import { isValid, utils, verificationBuilder, openAttestationVerifiers } from "@govtechsg/oa-verify"
import { getData } from "@govtechsg/open-attestation";
import { WrappedDocument } from "@govtechsg/open-attestation/dist/types/2.0/types";

export const verify = async({
  /*
    verify - Verifies wrapped document.

    Arguments:
        wrappedDocument (WrappedDocument): Document to be verified.
        infuraKey (string): Infura API key.

    Returns:
        results: Results of the verification process.
  */
    wrappedDocument,
    infuraKey
}:{
    wrappedDocument: WrappedDocument;
    infuraKey: string;
}) => {
    try{
      // providerOptions: Set of options used to generate provider.
      const providerOptions = {
        // network: Common network name, i.e. "homestead", "mainnet", "goerli", "matic".
        network: "matic",
        // apiKey: INFURA API key.
        apiKey: infuraKey,
      };

      // provider: Provider generated based on options provided.
      const provider = utils.generateProvider(providerOptions);
      // verify: Created custom verify function based on proider.
      const verify = verificationBuilder(openAttestationVerifiers, { provider: provider });

      // fragments: Produced after verifying a document. 
      // Each fragment will help to determine if the individual type mentioned here is valid or not, and would collectively prove the validity of the document.
      const fragments = await verify(wrappedDocument as any);
      // integrity: If the document has NOT been tampered with.
      const integrity = isValid(fragments, ["DOCUMENT_INTEGRITY"])
      // notRevoked: if the document has NOT been revoked.
      const notRevoked = isValid(fragments, ["DOCUMENT_STATUS"])
      // validIssuer: If the issuer identity is valid.
      const validIssuer = isValid(fragments, ["ISSUER_IDENTITY"])
      // verified: If all of the above are true.
      const verified = isValid(fragments)

      console.log("Document Integrity:", integrity); 
      console.log("Document Status:", notRevoked); 
      console.log("Issuer Identity:", validIssuer); 
      console.log("Document Verified:", verified);

      // data: Original data stored in the document, in a readable format.
      const data = getData(wrappedDocument as any);
      console.log(data);
      // issuer: Name of issuer extracted from document.
      const issuer = (data["issuers"][0]["identityProof"]?.location);
      console.log("Issuer:", issuer);
      
      // results: Results of the verification process to be returned.
      const results = {
        "integrity":integrity,
        "notRevoked":notRevoked,
        "validIssuer":validIssuer,
        "verified":verified,
        "issuer":issuer
      }

      // Returns results.
      return results
    } catch (e) {
      console.error(e);
      // Returns error if the verification process results in an error.
      return "Error"
    }
  };