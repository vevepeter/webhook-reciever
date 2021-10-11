/**
 * Vev Examples - Webhook Server
 *
 * A NodeJS + Express example server for receiving
 * PUBLISH events from Vev securely.
 *
 * [Read more here](https://help.vev.design/hosting/custom/webhook)
 */
import express from 'express';
import bodyParser from 'body-parser';
import { loggerMiddleware } from './loggerMiddleware.js';
import { storeVevPage } from './storeVevPage.js';
import { vevSignatureMiddleware } from './vevSignatureMiddleware.js';

const app = express();
app.set("trust proxy", true);

app.post(
  "/receiver",
  bodyParser.json(),
  loggerMiddleware,
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

app.listen(8001, () => console.log(`Example app listening on port 8001!`));
