.SILENT:
.DEFAULT_GOAL := help

.PHONY: help
help:
	$(info Available Commands:)
	$(info -> setup                   install dependencies)
	$(info -> format                  formats source)
	$(info -> test                    executes tests)
	$(info -> run                     starts server)

.PHONY: setup
setup:
	npm install

.PHONY: format
format:
	npm run format

.PHONY: test
test:
	npm run test

.PHONY: run
run:
	npm run start
