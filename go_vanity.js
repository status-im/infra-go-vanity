/**
 * This script generates the Go Vanigy HTML for go.status.im.
 *
 * For details on this see:
 * - https://developers.cloudflare.com/workers/about/how-workers-work/
 * - https://developers.cloudflare.com/workers/writing-workers/handling-errors/
 **/

const PACKAGES = {
  'go.status.im/protocol': 'github.com/status-im/status-protocol-go',
  'go.status.im/status':   'github.com/status-im/status-go',
  'go.status.im/whisper':  'github.com/status-im/whisper ',
}

const INDEX_HTML = `
<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <title>Status.im Go Vanity</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="manifest" href="site.webmanifest">
        <link rel="apple-touch-icon" href="icon.png">
        <!-- Place favicon.ico in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">

        <meta name="theme-color" content="#fafafa">
    </head>

    <body>
        <p>Nothing here yet...</p>
    </body>
</html>
`

/* handle every new request */
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/* fetch and modify request object */
async function handleRequest(request) {
  return new Response( INDEX_HTML, {
    headers: { 'Content-Type': 'text/html' }
  })
}
