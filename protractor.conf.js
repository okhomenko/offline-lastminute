//  execute 'protractor protractor.conf.js' in order to run tests
module.exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://kv-vm27:4444/wd/hub',

    //chromeOnly: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['e2e/**/*.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
