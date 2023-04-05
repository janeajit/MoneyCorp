const { expect } = require('chai');
const { until, Key, WebElement, By } = require('selenium-webdriver');
const { throwDecodedError } = require('selenium-webdriver/lib/error');

class SeleniumActions {
    constructor(driver) {
        this.driver = driver;
    }

    async loadUrl(url) {
       await this.driver.get(url).catch(error => { throw(error) });        
    }

    async enterTextAndPressEnterKey(locator, text,locator2) {
        await this.driver.wait(until.elementLocated(locator), 8000)
            .sendKeys(text)
            .catch(error =>  { throw(error) });
            await this.driver.findElement(locator2).submit();
    }

    async clearTextAndAddNewSearch(locator, text) {
        await this.driver.wait(until.elementLocated(locator), 8000).clear().catch(error =>  { throw(error) });
        await this.driver.wait(until.elementLocated(locator)).sendKeys(text)
            .catch(error =>  { throw(error) });    
        
       await this.driver.findElement(locator).submit();
    }


    ///done until search for international payments
    async addingListOfResults(locator, text) {
        var show =[];
        var countOfResults =0;
        show = await this.driver.wait(until.elementsLocated(locator)).catch(error =>{throw(error)});
       var showTheResults =  await this.driver.findElements(locator)
       ///counter will increment accroding to the result contain the en-us in href tag
       for(var element of showTheResults)
       {
        var hrefValue = await element.getAttribute("href");
        var hrefString = String(hrefValue);
        if(hrefString.includes(text)>0){
            countOfResults++;
        }       
       }
       return countOfResults;
    }

    async ClickValue(locator) {
        await this.driver.wait(until.elementLocated(locator), 8000).click()
            .catch(error =>  { throw(error);});
            return true;
        }
    async SubmitValue(locator) {
        await this.driver.wait(until.elementLocated(locator), 8000).submit()
            .catch(error =>  { throw(error) });
    }
    async ClearValue(locator) {
        await this.driver.wait(until.elementLocated(locator), 8000).clear()
            .catch(error =>  { throw(error) });
    }
   
    async GetResults(locator) {

       var results = await this.driver.wait(until.elementLocated(locator), 4000)
             .catch(error => { throw(error) });
             var countResults = await results.getText();
             return parseInt(countResults);
     }

}

module.exports = SeleniumActions;
