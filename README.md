# Description

This repo defines the infrastructure necessary for https://go.status.im/.

# Details

This is achieved by use of [CloudFlare Workers](https://developers.cloudflare.com/workers/) which are a:

>serverless execution environment that allows you to create entirely new applications ... without configuring or maintaining infrastructure.

The whole scrip is [`go_vanity.js`](go_vanity.js) which simply generates some basic HTML which includes the necessary `<meta>` tags for Go Vanty imports which look like this:
```html
<meta name="go-import" content="go.status.im/whisper git https://github.com/status-im/whisper">
```

# Configuration

Just edit the `PACKAGES` variable in [`go_vanity.js`](go_vanity.js):
```javascript
const PACKAGES = {
  'go.status.im/something': 'https://github.com/status-im/status-something', /* added */
  'go.status.im/protocol':  'https://github.com/status-im/status-protocol-go',
}
```

# Todo

* Start using [wrangler](https://github.com/cloudflare/wrangler) if the JS script gets too complex
* Maybe use a templating engine like a civilized human being
* Make the index page more fancy?

# Links

* https://discuss.status.im/t/vanity-imports-for-our-go-repositories/1308
