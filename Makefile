.PHONY: coverage

start:
	./node_modules/.bin/http-server app/ -p 8080

unit:
	./node_modules/karma/bin/karma start karma.conf.js --auto-watch true

coverage:
	./node_modules/karma/bin/karma start karma.conf.js --single-run --reporters coverage --port 9888
