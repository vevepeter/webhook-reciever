import _ from 'lodash';
import express from 'express';
import bodyParser from 'body-parser';
import { loggerMiddleware } from './loggerMiddleware.js';
import { storeVevPage } from './storeVevPage.js';
import { vevSignatureMiddleware } from './vevSignatureMiddleware.js';
import { errorMiddleware } from './errorMiddleware.js';

const logPayload = payload => {
  const use = _.cloneDeep(payload) || {};
  use.pages = use.pages || [];
  
  for (const page of use.pages) {
    page.html = (page.html || '123456789012345678901234567890').slice(0, 30) + '[... truncated]'
  }
  
  console.log('Payload:');
  console.log(use);
}

const app = express();
app.set("trust proxy", true);

app.post(
  "/webhook",
  errorMiddleware,
  bodyParser.json({
    limit: '200000kb',
  }),
  loggerMiddleware,
  vevSignatureMiddleware,
  async (req, res) => {
    const { payload, event } = req.body;
    const pages = (payload && payload.pages) || [];

    console.log("Event: ", event);
    logPayload(payload);

    if (event === "PUBLISH") {
      const projectDir = payload.dir;
 
      await Promise.all(pages.map(page => storeVevPage(page, projectDir)));
    } else if (event === "PING") {
      console.log("Webhook test ping received from: " + req.ip);
    } else if (event === 'UNPUBLISH') {
      console.log('UNPUBLISH page - not (yet) supported');
    } else {
      throw new Error(`Unsupported event [${ event }]`);
    }

    res.send({ message: "I received your webhook!!" });
  }
);

app.listen(8001, () => console.log(`Example app listening on port 8001!`));
