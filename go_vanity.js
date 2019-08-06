/**
 * This script generates the Go Vanigy HTML for go.status.im.
 *
 * For details on this see:
 * - https://developers.cloudflare.com/workers/about/how-workers-work/
 * - https://developers.cloudflare.com/workers/recipes/vcl-conversion/delivering-custom-responses/
 * - https://developers.cloudflare.com/workers/writing-workers/handling-errors/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * - https://developer.mozilla.org/en-US/docs/Web/API/Request
 **/

/* main config, this is what decides what gets redirected to GitHub */
const PACKAGES = {
  'go.status.im/protocol': 'https://github.com/status-im/status-protocol-go',
  'go.status.im/status':   'https://github.com/status-im/status-go',
  'go.status.im/whisper':  'https://github.com/status-im/whisper',
}

/* I could use a fancy templating engine, but why bother? */
const htmlTemplate = ({meta, body}) => (`
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <title>Status.im Go Vanity</title>
    <meta name="description" content="This site hosts metadata for Status.im Go packages.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${meta || ''}
  </head>
  <body>
    ${body || ''}
  </body>
</html>
`)

const tableTemplate = ({rows}) => (`
<table>
  <thead>
    <tr>
      <th>Alias</th>
      <th>Origin</th>
    </tr>
  </thead>
  <tbody>
    ${rows.join('\n    ')}
  </tbody>
</table>
`)

const genMetaTag = (pkg) => {
  return `<meta name="go-import" content="${pkg} git ${PACKAGES[pkg]}">`
}

const genPkgLink = (pkg) => {
  return `<p>Redirect: <code>${pkg}</code> to <a href="${PACKAGES[pkg]}">${PACKAGES[pkg]}</a></p>`
}

const genTabRows = (pkgs) => {
  return Object.keys(pkgs).map(name => (
    `<tr><td>${name}</td><td><a href="${pkgs[name]}">${pkgs[name]}</a></td>`
  ))
}

const findMatchingPackage = (url) => {
  return Object.keys(PACKAGES).find((key) => url.endsWith(key))
}

/* fetch and modify request object */
const handleRequest = async (request) => {
  /* Redirect requests to specific repos to GitHub using meta tags */
  let pkg = findMatchingPackage(request.url)
  if (pkg != undefined) {
    return new Response(
      htmlTemplate({
        meta: genMetaTag(pkg),
        body: genPkgLink(pkg),
      }),
      { headers: {'Content-Type': 'text/html'} }
    )
  }

  /* All other paths should return a table with all redirects */
  return new Response(
    htmlTemplate({
      body: tableTemplate({rows: genTabRows(PACKAGES)})
    }),
    { headers: {'Content-Type': 'text/html'}
  })
}

/* wrapper for returning JS errors in response body */
const handleErrors = (func) => {
  try {
    return func()
  } catch (e) {
    return new Response(`Error:\n${e.stack}`)
  }
}

/* handle every new request */
addEventListener('fetch', (event) => {
  event.respondWith(
    handleErrors(
      handleRequest.bind(null, event.request)
    )
  )
})
