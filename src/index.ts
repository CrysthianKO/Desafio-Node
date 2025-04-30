import {
  aceitarCookies,
  abrirBusca,
  preencherCPF,
  clicarBotaoConsultar,
  verificarLinkRef,
  coletarDados,
} from "./interacoes";
import { startBrowser, openPage, gotoPage } from "./navegar";
import { env } from "./utils/env";
import { saveJson } from "./utils/saveJson";

(async () => {
  const browser = await startBrowser();
  const page = await openPage(
    browser,
    "https://portaldatransparencia.gov.br/servidores/consulta?ordenarPor=nome&direcao=asc"
  );

  const listaCPF: string[] = [];
  listaCPF.push(...env.LISTA_CPF);
  console.log("Lista de CPFs:", listaCPF);

  await aceitarCookies(page);

  let linksServidores: string[] = [];

  for (const cpf of listaCPF) {
    await abrirBusca(page);
    await preencherCPF(page, cpf);
    await clicarBotaoConsultar(page);
    const href = await verificarLinkRef(page);
    linksServidores.push(href);
  }

  const dadosServidores: any[] = [];

  for (const link of linksServidores) {
    if (link === "") {
      console.log("CPF não encontrado.");
    } else {
      console.log("CPF encontrado:", link);
      await gotoPage(page, link);
      const dadosServidor = await coletarDados(page);
      dadosServidores.push(dadosServidor);
    }
  }
  saveJson(dadosServidores, "dadosServidores.json", "./tmp/")
})();
