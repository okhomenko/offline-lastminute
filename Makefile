.PHONY: coverage e2e

init:
	npm install && ./node_modules/protractor/bin/webdriver-manager update --standalone
start:
	./node_modules/.bin/http-server app/ -p 8080

unit:
	./node_modules/karma/bin/karma start karma.conf.js --auto-watch true

e2e:
	./node_modules/.bin/protractor protractor.conf.js --chromeOnly 


coverage:
	./node_modules/karma/bin/karma start karma.conf.js --single-run --reporters coverage --port 9888
