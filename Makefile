all: deps secrets init-terraform
	@echo "Success!"

deps:
	yarn install

init-terraform:
	terraform init -upgrade=true

secrets:
	echo "Saving secrets to: terraform.tfvars"
	@echo "\
# secrets extracted from password-store\n\
cloudflare_email  = \"$(shell pass cloud/Cloudflare/email)\"\n\
cloudflare_token  = \"$(shell pass cloud/Cloudflare/token)\"\n\
cloudflare_org_id = \"$(shell pass cloud/Cloudflare/org_id)\"\n\
" > terraform.tfvars

cleanup:
	rm -r $(PLUGIN_DIR)/$(ARCHIVE)
