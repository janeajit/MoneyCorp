const { expect } = require('chai');
const { By } = require('selenium-webdriver');

const seleniumActions = require('../Base/DriverActions');

class HomePage {   
    //locators
    moneyCorp=By.css(".c-header__logo");
    moneyCorpText="Moneycorp";
    flagLanguage =By.css(".nav-inner-languages");
    selectUSFlagLanguage =By.css("img[alt^='USA'");
    menuIcon =By.css(".c-hamburger.c-hamburger--spin.js-hamburger.navigation-menu.icon");
    searchIcon =By.css("#nav_search");
    submitSearchIcon =By.css("input[type='submit']");
    bigSearchBar =By.css(".chosen-select");
    noOfResultsInAView = By.css(".showing");
    resultTitleListofInternationalPayments=By.css("a.title.u-m-b2");
   
    //constant Texts for search
    foreignExchangeSolutionsText = 'Foreign exchange solutions';
    internationalPaymentsText = 'international payments';
    hrefTextForUS='en-us';

    constructor(driver) {
        this.seleniumactions = new seleniumActions(driver);
    }

//load the url
    async loadMoneyCorpHomePage() {
        const url = 'https://www.moneycorp.com/en-gb/';
        await this.seleniumactions.loadUrl(url);
       
    }

///changing country
    async countryChangeToUS() {
        await this.seleniumactions.ClickValue(this.flagLanguage);
       let countryChangedToUs = await this.seleniumactions.ClickValue(this.selectUSFlagLanguage);
       return countryChangedToUs;
      
    }

    ///search for foreign exchange solutions
    async EnterForeignExchangeSolutions(){
        await this.seleniumactions.ClickValue(this.menuIcon);
        await this.seleniumactions.enterTextAndPressEnterKey(this.searchIcon, this.foreignExchangeSolutionsText,this.submitSearchIcon);       
    }

    ///search for international payments and return the count of list of results
    async EnterTheInternationalPaymentsTextAndSearch(){       
        await this.seleniumactions.clearTextAndAddNewSearch(this.bigSearchBar, this.internationalPaymentsText);
        let actualValueOfCountOfResults= await this.seleniumactions.addingListOfResults(this.resultTitleListofInternationalPayments,this.hrefTextForUS,this.locatorSourceTextToTranslate8,this.locatorSourceTextToTranslate9);
        return actualValueOfCountOfResults;
    }

    ///return the count of results from header
    async expectValue(){        
        let expectedValueOfCountOfResults= await this.seleniumactions.GetResults(this.noOfResultsInAView);
        return expectedValueOfCountOfResults;
    }
}

module.exports = HomePage;
