# Test webhooks, ez

For testing the Vev Webhook, all that is needed is a file called `secret.js` located in the root folder that exports (default) your secret.

[Read about Vev Webhooks here](https://help.vev.design/hosting/custom/webhook)

## Notes

Received files are stored in the `public` folder in the project, but there is no middleware for showing static files.

## Improvements

* Typing of payload
* Add middleware for serving static files to more easily see results
* Add steps to setting up a test Hosting in Vev
