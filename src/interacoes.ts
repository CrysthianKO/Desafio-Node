import { Page } from "puppeteer";
import { getDados } from "./coletaDados";

export const aceitarCookies = async (page: Page): Promise<void> => {
  try {
    await page.waitForSelector("#accept-all-btn");
    await page.click("#accept-all-btn");
  } catch (error) {
    console.log(error);
  }
};

export const abrirBusca = async (page: Page): Promise<void> => {
  await page.waitForSelector("#btn-cpf-1");
  await page.click("#btn-cpf-1");
};

export const preencherCPF = async (page: Page, cpf: string): Promise<void> => {
  await page.waitForSelector("#cpf", { visible: true });
  await page.evaluate((cpf) => {
    const input = document.querySelector("#cpf") as HTMLInputElement;
    if (input) {
      input.value = cpf;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, cpf);

  console.log("CPF preenchido com sucesso!");
};

export const clicarBotaoConsultar = async (page: Page): Promise<void> => {
  try {
    await page
      .locator(
        "#id-box-filtro > div > div > ul > li:nth-child(2) > div > div > div > div.gaveta__corpo > button"
      )
      .click();
    await page
      .locator(
        "#id9 > div.d-flex.justify-content-end.pb-2 > div:nth-child(1) > button"
      )
      .click();
  } catch (error) {
    console.error(error);
  }
};

export const verificarLinkRef = async (page: Page): Promise<string> => {
  try {
    const href = await page.evaluate(() => {
      const element = document.querySelector(
        "#lista > tbody > tr > td:nth-child(1) > span > div > a"
      );
      return element ? element.getAttribute("href") : null;
    });
    if (!href) {
      // console.log("Link não encontrado.");
      return "";
    } else {
      // console.log("Link encontrado:", href);
      return href;
    }
  } catch (error) {
    throw error;
  }
};

export const coletarDados = async (page: Page): Promise<any> => {
  try {
    const vinculosAposentadoria = await getDados(page);
    return vinculosAposentadoria;
  } catch (error) {
    console.error(error);
  }
};
