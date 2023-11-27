# Test webhooks, ez

For testing the Vev Webhook, all that is needed is a file called `secret.ts` located in the root folder that exports (default) your secret.

[Read about Vev Webhooks here](https://help.vev.design/hosting/custom/webhook)

## Setting up a Hosting

* Go to the Hosting dashboard, click "+ Create Hosting"
* Fill in domain
* Select Webhook as the hosting type
* When you get to the hosting settings, fill in the "Webhook URL", this is the endpoint set up to receive events
* If you are running this example as is, enable the "Send full page" option, this makes the HTML include the `head` tag, not just the `body` contents
* (optional) This repo also supports hosting and serving all assets (the "Include asset URLs in payload" option) that would otherwise be served by the
  Vev CDN
* (optional) Webhook security
    * While we recommend *always* having security set up, for initial testing, this can be omitted
    * All requests from the Vev Webhook are sent from the same IP address (35.188.173.106), so whitelisting can be used as (additional) security
* With the setup complete, make sure your receiver is running, and click the "Test connection" button to send a ping event
* If the ping is successful, you can add your hosting as a publish destination in a project and publish

## Notes

Received files are stored in the `public` folder in the project, but there is no middleware for showing static files.

## Improvements

* Typing of payload
* Add middleware for serving static files to more easily see results
* Add steps to setting up a test Hosting in Vev
* Need better handling of Projects published to root
