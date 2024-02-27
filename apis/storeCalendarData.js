const puppeteer = require('puppeteer');
const calendar = require('../models/calendarSchema');

const storeCalendarData = async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: true, defaultViewport: null, args: ["--start-maximized"] });
        const page = await browser.newPage();
        await page.goto('https://www.moneycontrol.com/markets/earnings/results-calendar/');
        let data = await page.$$eval('table tbody tr', rows => {
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
        data = data.filter(item => Object.keys(item).length > 0);
        if (data.length > 0) {
            try {
                await calendar.insertMany(data);
                res.status(200).json({ message: "Calendar data stored in db successfully" });
            } catch (error) {
                res.status(500).json({ message: `Error in storing calendars in db: ${error}` });
            }
        } else {
            res.status(204).json({ message: "No results found" });
        }

    } catch (error) {
        res.status(500).json({ message: "Error in getting data", error: error.message });
    }
}

module.exports = storeCalendarData;
