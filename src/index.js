/**
 * Vev Examples - Webhook Server
 *
 * A NodeJS + Express example server for receiving
 * PUBLISH events from Vev securely.
 *
 * [Read more here](https://help.vev.design/hosting/custom/webhook)
 */
import express from 'express';
import fs from 'fs';
import crypto from 'crypto';
import bodyParser from 'body-parser';
import path from 'path';
import secret from '../secret.js';

const app = express();
// Add this to get IP information (no required, just an additional layer of security)
app.set("trust proxy", true);

// Since the large full websites can be sent over the web
const LargeJSONBodyParser = bodyParser.json({
  limit: "750mb"
});

// Creating a post route to handle the the webhook call
// Adding json body parser middleware
// Also Adding vev signature validator (you find the implementation at the bottom)
app.post(
  "/receiver",
  LargeJSONBodyParser,
  vevSignatureMiddleware,
  async (req, res) => {
    const { payload, event } = req.body;
    console.log("event: ", event);
    console.log("payload: ", payload);
    if (event === "PUBLISH") {
      await Promise.all(payload.pages.map(storeVevPage));
    } else if (event === "PING") {
      console.log("Webhook test ping received from: " + req.ip);
    }

    res.send({ message: "I received your webhook!!" });
  }
);

async function storeVevPage(page) {
  // Putting the files in the public dir
  // if page is index page then set the path to be public/index.html
  let pagePath = path.join("./public", page.index ? "index.html" : page.path);

  // Page path can have file extension
  if (!path.extname(pagePath)) pagePath = path.join(pagePath, "index.html");

  // Creating the dir to put the file in
  // Remember that in vev the page path can be nested (example dir1/dir2/index.html)
  // So important to create dir recursive
  const dir = path.dirname(pagePath);
  
  try {
    await fs.promises.access(dir);
  } catch (e) {
    await fs.promises.mkdir(dir, { recursive: true });
  }

  //Writing the file to the page path
  await fs.promises.writeFile(pagePath, page.html);
}

function vevSignatureMiddleware(req, res, next) {
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

app.listen(8001, () => console.log(`Example app listening on port 8001!`));
