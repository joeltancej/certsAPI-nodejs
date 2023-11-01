import express from 'express';
import controller from '../controllers/certs';

// Create an Express router
const router = express.Router();

// Create a POST endpoint for issuing certificates
router.post('/issue', controller.issueCert);
// Create a POST endpoint for verifying certificates
router.post('/verify', controller.verifyCert);

export = router;