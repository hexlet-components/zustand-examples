.PHONY: install start build lint test

EXAMPLE ?= starter

install:
	pnpm install --frozen-lockfile

start:
	pnpm --dir $(EXAMPLE) dev

build:
	pnpm build

lint:
	pnpm lint

test:
	pnpm test
