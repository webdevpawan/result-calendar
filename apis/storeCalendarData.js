const puppeteer = require('puppeteer');
const calendar = require('../models/calendarSchema')


const storeCalendarData = async () => {
    try {
        const browser = await puppeteer.launch({ headless: true, defaultViewport: null, args: ["--start-maximized"] });
        const page = await browser.newPage();
        await page.goto('https://www.moneycontrol.com/markets/earnings/results-calendar/');
        const data = await page.$$eval('table tbody tr', rows => {
            return rows.slice(1).map(row => {
                const cells = [...row.querySelectorAll('td')];
                return {
                    companyName: cells[1]?.innerText.trim(),
                    resultType: cells[2]?.innerText.trim(),
                    time: cells[3]?.innerText.trim(),
                    ltp: cells[4]?.innerText.trim(),
                    percentChg: cells[5]?.innerText.trim(),
                };
            });
        });
        console.log(data)
        try {
            if (data) {
                await calendar.insertMany(data);
                console.log("Calendar data stored in db successfully");
            }
            else {
                console.log("No results")
            }
        } catch (error) {
            console.log(`Error in storing calendars in db: ${error}`);
        }


    } catch (error) {
        console.log("error in getting data", error)
    }
}



module.exports = storeCalendarData;
