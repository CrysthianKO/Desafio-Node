import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
        args: [
            '--start-maximized',
            '--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure',
            '--disable-blink-features=AutomationControlled',
            '--disable-web-security'
        ],
        defaultViewport: null,
   });
  const page = await browser.newPage();
  await page.goto("https://portaldatransparencia.gov.br/servidores/2191717");


})();