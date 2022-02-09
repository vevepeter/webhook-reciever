import _ from 'lodash';
import { storeVevPage } from './storeVevPage.js';

export const receiverMiddleware = async (req, res) => {
  const { payload, event } = req.body;
  const pages = (payload && payload.pages) || [];
  
  console.log("Event received [" + event + ']');
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
  
  console.log('Event handled [' + event + ']');
  res.send({ message: "I received your webhook!!" });
}

const logPayload = payload => {
  const use = _.cloneDeep(payload) || {};
  use.pages = use.pages || [];
  
  for (const page of use.pages) {
    page.html = (page.html || '123456789012345678901234567890').slice(0, 30) + '[... truncated]'
  }
  
  console.log('Payload:');
  console.log(use);
}
