start:
	./node_modules/.bin/http-server app/ -p 8080

unit:
	./node_modules/karma/bin/karma start karma.conf.js --auto-watch true