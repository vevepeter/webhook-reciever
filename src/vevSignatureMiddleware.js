import crypto from 'crypto';
import secret from 'secret';

export function vevSignatureMiddleware(req, res, next) {
  const signatureHeader = req.get("X-Vev-Signature");
  if (!signatureHeader) return next("Missing signature");
  
  const [algorithm, signature] = signatureHeader.split("=");
  if (!algorithm || !signature) return next("Invalid signature");
  
  // Validating signature of request
  // Done by comparing the signature with HMAC (hash-based message authentication code)) using the secret key for hashing
  const hmac = crypto.createHmac(algorithm, secret);
  const generatedSignature = hmac
    .update(JSON.stringify(req.body))
    .digest("hex");
  
  // Comparing the request signature with the generated
  // This will validate that the sender knows the secret
  // and that the content was not tampered with and that the
  if (generatedSignature !== signature) {
    console.error("Webhook triggered with invalid signature");
    return next("Invalid signature");
  }
  
  next();
}
