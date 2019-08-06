/**
 * This script generates the Go Vanigy HTML for go.status.im.
 *
 * For details on this see:
 * - https://developers.cloudflare.com/workers/about/how-workers-work/
 * - https://developers.cloudflare.com/workers/recipes/vcl-conversion/delivering-custom-responses/
 * - https://developers.cloudflare.com/workers/writing-workers/handling-errors/
 **/

const PACKAGES = {
  'go.status.im/protocol': 'https://github.com/status-im/status-protocol-go',
  'go.status.im/status':   'https://github.com/status-im/status-go',
  'go.status.im/whisper':  'https://github.com/status-im/whisper',
}

const genMetaTags = (pkgs) => {
  return Object.keys(pkgs).map(name => (
    `<meta name="go-import" content="${name} git ${pkgs[name]}">`
  ))
}

const genTabRows = (pkgs) => {
  return Object.keys(pkgs).map(name => (
    `<tr><td>${name}</td><td><a href="${pkgs[name]}">${pkgs[name]}</a></td>`
  ))
}

const INDEX_HTML = `
<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <title>Status.im Go Vanity</title>
        <meta name="description" content="This site hosts metadata for Status.im Go packages.">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${genMetaTags(PACKAGES).join('\n        ')}
    </head>
    <body>
        <table>
            <tr>
                <th>Alias</th>
                <th>Origin</th>
            </tr>
            ${genTabRows(PACKAGES).join('\n            ')}
        </table>
    </body>
</html>
`

/* fetch and modify request object */
const handleRequest = async (request) => {
  return new Response(INDEX_HTML, {
    headers: {'Content-Type': 'text/html'}
  })
}

/* handle every new request */
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
