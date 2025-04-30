import puppeteer, { Browser, Page } from "puppeteer";

export const startBrowser = async (): Promise<Browser> => {
  return puppeteer.launch({
    headless: false,
    args: [
      "--start-maximized",
      "--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure",
      "--disable-blink-features=AutomationControlled",
      "--disable-web-security",
    ],
    defaultViewport: null,
  });
};

export const openPage = async (
  browser: Browser,
  url: string
): Promise<Page> => {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  return page;
};

export const gotoPage = async (page: Page, url: string): Promise<void> => {
  await page.goto("https://portaldatransparencia.gov.br" + url, {
    waitUntil: "networkidle2",
  });
};
