import { getAccount } from "../services/account";
import { issueDocument } from "../services/document-store";
import { wrapDocument } from "@govtechsg/open-attestation";
import { signDocument, SUPPORTED_SIGNING_ALGORITHM } from "@govtechsg/open-attestation";

// Test function to test wrappedDocument output.
// export const testFunction = async() => {
//     const rawDocument = {...documentBase};
//     const wrappedDocument = await wrapDocument(rawDocument as any);
//     return wrappedDocument;
// }

export const issue = async (
  /*
    issue - Issues blockchain certificate.

    Arguments:
        courseName (string): Name of the course.
        certNo (string): ID of the certification (e.g., L9F3A02).
        learnerName (string): Name of the learner.
        orgName (string): Name of the organisation.
        validYears (string): Number of years for which certificate should be valid.
        documentStoreAddress (string): Document store address tied to and deployed using Polygon wallet.
        publicWalletAddress (string): Public address of the Polygon wallet.
        privateWalletKey (string): Private key of the Polygon wallet.

    Returns:
        wrappedDocument: Copy of wrapped document that has been issued.
  */
  {
  courseName,
  certNo,
  learnerName,
  orgName,
  issueDate,
  validUntil,
  documentStoreAddress,
  publicWalletAddress,
  privateWalletKey,
  infuraKey,
  priority
}:{
  courseName:string;
  certNo:string;
  learnerName:string;
  orgName:string;
  issueDate:string;
  validUntil:string;
  documentStoreAddress:string;
  publicWalletAddress:string;
  privateWalletKey:string;
  infuraKey:string;
  priority:number;
}) => {
  // now: Current date of creation
  const now: Date = new Date()
  // created: Date of creation in ISO format.
  const created: string = now.toISOString()
  
  // documentBase: Document base to be wrapped.
  const documentBase = 
  {
    "id": "53b75bbe",
    "name": "Childsafeguarding.com Certificate",
    "description": "Childsafeguarding.com Certificate",
    "$template": {
      "name": "GOVTECH_DEMO",
      "type": "EMBEDDED_RENDERER",
      "url": "https://demo-renderer.opencerts.io"
    },
    "issuers": [
      {
        "name": "Govtech",
        "url": "https://tech.gov.sg",
        "documentStore": documentStoreAddress,
        "identityProof": {
          "type": "DNS-TXT",
          "location": "eth.csawa.re"
        }
      }
    ],
    "network": {
      "chain": "MATIC",
      "chainId": "137"
    },
    "verification":{
      "verificationType": "SHA3MerkleProof",
      "dateCreated": created,
      // "verificationMethod": "did:key:0x<PUBLIC_WALLET_ADDRESS>#controller"
    },
    "transcript": [
      {
        "courseName": courseName,
        "certNo": certNo,
        "learnerName": learnerName,
        "issueDate": issueDate,
        "validUntil": validUntil,
        "orgName": orgName
      },
    ],
  }

    try {
        // Returns an object that contains the providerSigner property, which is a JsonRpcSigner object.
        const { providerSigner, providerNetwork } = await getAccount({privateWalletKey, infuraKey});

        // rawDocument: Converted raw document from documentBase.
        const rawDocument = {...documentBase}

        // wrappedDocument: Wrapped document returned from wrapping rawDocument. 
        const wrappedDocument = await wrapDocument(rawDocument as any)

        // Signs wrappedDocument using Secp256k1VerificationKey2018 algorithm and wallet keys.
        await signDocument(wrappedDocument, SUPPORTED_SIGNING_ALGORITHM.Secp256k1VerificationKey2018, {
          public: "did:ethr:" + publicWalletAddress + "#controller",
          private: privateWalletKey,
        });
        console.log(JSON.stringify(wrappedDocument, null, 2))
        
        console.log("Issuing...")

        // Issues wrappedDocument to documentStoreAddress using signer.
        await issueDocument({
            wrappedDocument,
            signer: providerSigner!,
            documentStoreAddress: documentStoreAddress!,
            priority
          });
        
          console.log("Issued!")

        // Returns wrappedDocument.
        return wrappedDocument
    } catch (e) {
        console.error(e);
        // Returns "not done" if error occurs.
        return "not done"
    }
};