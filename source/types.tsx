import { JsonRpcSigner, Network } from "@ethersproject/providers";
import { WrappedDocument } from "@govtechsg/open-attestation/dist/types/2.0/types";

export type signer = null | JsonRpcSigner;
export type dns = null | string;
export type network = null | Network;
export type documentStoreAddress = null | string;
export type wrappedDocument = null | WrappedDocument;