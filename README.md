# Example Vev Webhook Receiver

For testing the Vev Webhook, all that is needed is a file called `secret.ts` located in the root folder that exports (default) your secret.

[Read about Vev Webhooks here](https://help.vev.design/en/articles/6165061-webhook-integrations)

## Setting up a Hosting

* Go to the Hosting dashboard, click "+ Add Domain"
* Fill in domain
* Select Webhook as the hosting type, under "Advanced hosting options"
* When you get to the hosting settings, fill in the "Webhook URL", this is the endpoint set up to receive events. In this example, the receiver is listening on `/webhook`.
* If you are running this example as is, enable the "Send full page" option, this makes the HTML include the `head` tag, not just the `body` contents
* (optional) This repo also supports hosting and serving all assets (the "Include asset URLs in payload" option) that would otherwise be served by the
  Vev CDN
* (optional) Webhook security
    * While we recommend *always* having security set up, for initial testing, this can be omitted
    * All requests from the Vev Webhook are sent from the same IP address (34.72.55.20), so whitelisting can be used as (additional) security
* Enable the option to allow Vev to send ping events
* Under Signature, click the button to generate a new token, copy and paste into `secret.ts`
  * Example: `export default '[secret-token-here]'`
* With the setup complete, make sure your receiver is running, click "Save" and then the "Test connection" button to send a ping event
* If the ping is successful, you can add your hosting as a publish destination in a project and publish

## Notes

Received files are stored in the `public` folder in the project.
