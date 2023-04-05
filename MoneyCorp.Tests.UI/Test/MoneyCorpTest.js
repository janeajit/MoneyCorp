const expect = require('chai').expect;

const BrowserFactory = require('./Base/BrowserFactory');
const HomePage = require('./Pages/HomePage');

describe('MoneyCorp Search Function In US Market', function() {
    this.timeout(600000);
    it('Verify the results of the search contains en-us attribute in the URl', async () => {
        let driver = await new BrowserFactory().startBrowser();
        let homepage = new HomePage(driver);

        try {
                await homepage.loadMoneyCorpHomePage();
                let countryChange = await homepage.countryChangeToUS();
                expect(countryChange).to.be.true;
                await homepage.EnterForeignExchangeSolutions();
                ///checking the tests with href attribute of the results which contain en-us
                let noOfInternationalPaymentHaveENUSAttribute = await homepage.EnterTheInternationalPaymentsTextAndSearch();
                let expectedValue = await homepage.expectValue();
                expect(noOfInternationalPaymentHaveENUSAttribute).equal(expectedValue);
        } 
        finally {
                await driver.quit();
        }
    });
});
