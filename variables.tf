/* CloudFlare Credentials --------------------------------*/

variable "cloudflare_token" {
  description = "Token for interacting with Cloudflare API."
  type        = string
}

variable "cloudflare_email" {
  description = "Email address of Cloudflare account."
  type        = string
}

variable "cloudflare_org_id" {
  description = "ID of the CloudFlare organization."
  type        = string
}

/* General -----------------------------------------------*/

variable "domain" {
  description = "Domain to be used for Go packages vanity."
  type        = string
  default     = "status.im"
}

variable "subdomain" {
  description = "Subdomain of the domain to be used for Go vanity."
  type        = string
  default     = "go"
}
