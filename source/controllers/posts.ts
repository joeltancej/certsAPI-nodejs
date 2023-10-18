/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import { issue } from '../opencerts/issueCert';
import { verify } from '../opencerts/verifyCert';
import { WrappedDocument } from '@govtechsg/open-attestation/dist/types/2.0/types';

const issueCert = async (req: Request, res: Response) => {
    /*
    issueCert - Handles post request sent to /issue

    Arguments:
        req (Request): Request body and headers.
        res (Response): Response to be returned.

    Returns:
        wrappedDocument: Copy of wrapped document that has been issued.
    */

    // courseName: Name of the course.
    let courseName: string = req.body.courseName ?? null;

    // certNo: ID of the certification (e.g., L9F3A02).
    let certNo: string = req.body.certNo ?? null;

    // learnerName: Name of the learner.
    let learnerName: string = req.body.learnerName ?? null;

    // orgName: Name of the organisation.
    let orgName: string = req.body.orgName ?? null;

    // issueDate: Date of issue of the certificate.
    let issueDate: string = req.body.issueDate ?? null;

    // validUntil: Date till which certificate is valid, and after which the certificate expires.
    let validUntil: string = req.body.validUntil ?? null;

    // documentStoreAddress: Document store address tied to and deployed using Polygon wallet.
    let documentStoreAddress: any = req.headers["document-store-address"] ?? null

    // publicWalletAddress: Public address of the Polygon wallet.
    let publicWalletAddress: any = req.headers["public-wallet-address"] ?? null

    // privateWalletKey: Private key of the Polygon wallet.
    let privateWalletKey: any = req.headers["private-wallet-key"] ?? null

    // infuraKey: Infura API key.
    let infuraKey: any = req.headers["infura-key"]

    // Issues blockchain certificate with all field in the request body included.
    let wrappedDocument: any = await issue({courseName, certNo, learnerName, orgName, issueDate, validUntil, 
                                        documentStoreAddress, publicWalletAddress, privateWalletKey, infuraKey})
    console.log(wrappedDocument)

    if(wrappedDocument == "not done"){
        return res.status(500).send(
            "Internal server error."
        )
    }

    // Returns wrappedDocument after issuance is complete.
    return res.status(200).send({
        wrappedDocument
    });
}

const verifyCert = async (req: Request, res: Response) => {
    /*
    verifyCert - Handles post request sent to /verify

    Arguments:
        req (Request): Request body and headers.
        res (Response): Response to be returned.

    Returns:
        results: Verification results of wrapped document.
    */

    // wrappedDocument: Wrapped document to be verified.
    let wrappedDocument: WrappedDocument = req.body.wrappedDocument ?? null;
    console.log(wrappedDocument)
    
    let docJSON: { data: any } = wrappedDocument ?? null;

    // infuraKey: Infura API key.
    let infuraKey: any = req.headers["infura-key"]

    // results: Verification results of wrapped document.
    let results = await verify({wrappedDocument, infuraKey, docJSON})
    console.log(results)

    // Returns results after verification is complete.
    return res.status(200).send({
        results
    });
}

export default { issueCert, verifyCert };