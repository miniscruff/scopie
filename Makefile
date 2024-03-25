.ONESHELL:
.DEFAULT: help

.PHONY: help
help:
	@grep -E '^[a-z-]+:.*#' Makefile | \
		sort | \
		while read -r l; do printf "\033[1;32m$$(echo $$l | \
		cut -d':' -f1)\033[00m:$$(echo $$l | cut -d'#' -f2-)\n"; \
	done

.PHONY: serve
serve: # Serve documentation locally with hot reloading
	mkdocs serve

.PHONY: pip-install
pip-install: # Install python dependencies
	pip install -r requirements.txt

.PHONY: pip-freeze
pip-freeze: # Save mkdocs deps to requirements.txt
	pip freeze > requirements.txt
