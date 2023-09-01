const documentStoreAddress  = "<DOCUMENT_STORE_ADDRESS>";

export const documentBase = 
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