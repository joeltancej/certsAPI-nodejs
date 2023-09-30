/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import { issue } from '../opencerts/issueCert';
import { verify } from '../opencerts/verifyCert';
import { WrappedDocument } from '@govtechsg/open-attestation/dist/types/2.0/types';

const issueCert = async (req: Request, res: Response) => {
    /*
    issueCert - Handles post request sent to /issue

    Arguments:
        req (Request): Request body.
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

    // validYears: Number of years for which certificate should be valid.
    let validYears: number = req.body.validYears ?? null;

    // Returns Error 400 code with message if validYears is not an integer.
    if(!Number.isInteger(validYears)){
        return res.status(400).send("The parameter validYears must be an integer.")
    }

    // Issues blockchain certificate with all field in the request body included.
    let wrappedDocument: any = await issue({courseName, certNo, learnerName, orgName, validYears})
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
        req (Request): Request body.
        res (Response): Response to be returned.

    Returns:
        results: Verification results of wrapped document.
    */

    // wrappedDocument: Wrapped document to be verified.
    let wrappedDocument: WrappedDocument = req.body ?? null;
    console.log(wrappedDocument)

    // results: Verification results of wrapped document.
    let results = await verify({wrappedDocument})
    console.log(results)

    // Returns results after verification is complete.
    return res.status(200).send({
        results
    });
}

export default { issueCert, verifyCert };