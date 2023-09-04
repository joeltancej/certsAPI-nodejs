import { getAccount } from "../services/account";
import { issueDocument, issueMerkleRoot } from "../services/document-store";
// import { documentBase } from "../services/document-base";
import { wrapDocument } from "@govtechsg/open-attestation";
// import { useAccountContext } from "../contexts/AccountContext";

// const { signer, setSigner, setNetwork } = useAccountContext();
// polygon
const documentStoreAddress  = "0x63d690147B6374FC731C4eB1AD215E6483A9a41A";

const documentBase = 
      {
        "id": "53b75bbe",
        "name": "Childsafeguarding.com Certificate",
        "description": "Childsafeguarding.com Certificate",
        "issuedOn": "2019-05-29T00:00:00+08:00",
        "expiresOn": "2019-05-29T00:00:00+08:00",
        "admissionDate": "2017-08-01T00:00:00+08:00",
        "graduationDate": "2022-08-01T00:00:00+08:00",
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
        "transcript": [
          {
            "name": "Level 1 Course",
            "grade": "A+",
            "courseCredit": "3",
            "courseCode": "CS 1110",
            "examinationDate": "2017-12-01T00:00:00+08:00",
            "semester": "1"
          },
        ],
        "additionalData": {
          "merit": "Y",
          "studentId": "123456",
          "transcriptId": "001"
        }
      }

export const onConnect = async () => {
    try {
        // returns an object that contains the providerSigner property, which is a JsonRpcSigner object
        const { providerSigner, providerNetwork } = await getAccount();
        // sets the signer state variable to the providerSigner object
        const rawDocument = {...documentBase}
        const wrappedDocument = wrapDocument(rawDocument as any)
        await issueMerkleRoot({
            wrappedDocument,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            signer: providerSigner!,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            documentStoreAddress: documentStoreAddress!,
          });
        return wrappedDocument
        // setCurrentStep("certificate");
    } catch (e) {
        console.error(e);
        return "not done"
    }
};