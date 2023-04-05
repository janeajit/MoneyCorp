const { Builder } = require('selenium-webdriver');
require('chromedriver');

class BrowserFactory {

    async startBrowser(browser = 'chrome') {
        return await new Builder().forBrowser(browser).build();
    }
}

module.exports = BrowserFactory;
