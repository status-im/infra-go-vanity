/* Providers ---------------------------------------------*/

provider "cloudflare" {
  email  = var.cloudflare_email
  token  = var.cloudflare_token
  org_id = var.cloudflare_org_id
}

/* Locals ------------------------------------------------*/

locals {
  fqdn = "${var.subdomain}.${var.domain}"
}

/* Resources ---------------------------------------------*/

/* This JS script generats the Website from list of repos */
resource "cloudflare_worker_script" "vanity" {
  name    = "go-status-im-vanity"
  content = "${file("go_vanity.js")}"
}

/* Handle all requests to configured subdomain with the script */
resource "cloudflare_worker_route" "vanity" {
  zone    = var.domain
  pattern = "${local.fqdn}/*"

  script_name = cloudflare_worker_script.vanity.name
  depends_on  = [cloudflare_worker_script.vanity]
}

/* DNS Entry */
resource "cloudflare_record" "vanity" {
  domain  = var.domain
  name    = var.subdomain
  type    = "CNAME"
  proxied = true
  /* value doesn't matter, worker handles it */
  value   = "golang.org" 
}
