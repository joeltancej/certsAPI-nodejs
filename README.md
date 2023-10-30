# OpenAttestation Blockchain Certificate Issuer API

### Description
This API was developed using OpenCerts technology and Node.js. All code in this project is written in TypeScript.
The API can be used to issue blockchain certificates to an existing document store, and can also verify the integrity of these certificates.

### Instructions
* Read the documentation at https://www.openattestation.com/ to understand how the framework works.
* Follow the OpenAttestation documentation to create a wallet, deploy a document store and create an INFURA API key.
* Download Node.js
* Install the required libraries with ```npm install```

### Using the API
Set the following request headers when issuing a POST request:
* document-store-address: Address of the previously deployed document store.
* public-wallet-address: Public address of the created wallet.
* private-wallet-key: Private key of the created wallet.
* infura-key: INFURA API key.
* priority: Value used to multiply the gas price when issuing certificates, increases priority and issuance speed.

The API is currently designed to issue blockchain certificates for the completion of online courses. Set the following fields in the request body when issuing a POST request to the /issue endpoint:
```
{
    "courseName": "Course Name",
    "certNo": "L123456",
    "learnerName": "Name",
    "orgName": "XXX Company",
    "issueDate": "MMM DD YYYY",
    "validUntil": "MMM DD YYYY"
}
```

When issuing a POST request to the /verify endpoint, simply use the wrappedDocument from the response body returned from issuing a certificate as the request body.
