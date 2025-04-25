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
    
    await page.goto("https://portaldatransparencia.gov.br/servidores/consulta?ordenarPor=nome&direcao=asc");

    await page.click("#btn-cpf-1");
    await page.waitForSelector("#cpf", { visible: true });

    await page.evaluate(() => {
        const input = document.querySelector("#cpf") as HTMLInputElement;
        if (input) {
            input.value = "41467272000"; // Substitua pelo CPF desejado
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
        }
    });
    console.log("CPF preenchido com sucesso!");

    await page.click('#id-box-filtro > div > div > ul > li:nth-child(2) > div > div > div > div.gaveta__corpo > button');
    await page.waitForSelector('.btn-consultar.br-button.primary.btn-filtros-aplicados-consultar', { visible: true });
    await page.locator('.btn-consultar.br-button.primary.btn-filtros-aplicados-consultar').click();

    const href = await page.evaluate(() => {
        const element = document.querySelector('#lista > tbody > tr > td:nth-child(1) > span > div > a');
        return element ? element.getAttribute('href') : null;
    });

    page.goto('https://portaldatransparencia.gov.br' + href);
    console.log("href: ", href);  
    // const botao = ; #lista > tbody > tr > td:nth-child(1) > span > div > a
    // console.log("Botão Consultar : ", botaoConsult != null);
    // botaoConsult.click();
})();