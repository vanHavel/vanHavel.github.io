# Configuration
DOCKER_IMAGE = jekyll/jekyll:3.8
PORT = 4000

# Default target
help:
	@echo "Available commands:"
	@echo "  make serve - Run the Jekyll site locally"
	@echo "  make build - Build the Jekyll site"
	@echo "  make clean - Clean generated files"

# Run the Jekyll site locally
serve:
	docker run --rm \
		--volume="$(PWD):/srv/jekyll" \
		--entrypoint jekyll \
		-p $(PORT):$(PORT) \
		-it $(DOCKER_IMAGE) \
		serve --livereload --force_polling

# Build the Jekyll site
build:
	docker run --rm \
		--volume="$(PWD):/srv/jekyll" \
		--entrypoint jekyll \
		-it $(DOCKER_IMAGE) \
		build

# Clean generated files
clean:
	rm -rf _site .jekyll-cache .jekyll-metadata

