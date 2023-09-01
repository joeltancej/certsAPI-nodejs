import { getAccount } from "../services/account";
import { issueDocument } from "../services/document-store";
import { documentBase } from "../services/document-base";
import { wrapDocument } from "@govtechsg/open-attestation";
// import { useAccountContext } from "../contexts/AccountContext";

// const { signer, setSigner, setNetwork } = useAccountContext();
// polygon
const documentStoreAddress  = "<DOCUMENT_STORE_ADDRESS>";

export const onConnect = async () => {
    try {
        // returns an object that contains the providerSigner property, which is a JsonRpcSigner object
        const { providerSigner, providerNetwork } = await getAccount();
        // sets the signer state variable to the providerSigner object
        const rawDocument = {...documentBase}
        const wrappedDocument = wrapDocument(rawDocument as any)
        await issueDocument({
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