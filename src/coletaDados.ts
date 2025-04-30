import { Page } from "puppeteer";

export const getDados = async (page: Page): Promise<any> => {
  const dados = await page.evaluate(() => {
    const elementVinculo = document.querySelector(
      "#main-content"
    ) as HTMLAnchorElement;

    const nome = elementVinculo.querySelector(
      "#main-content > div:nth-child(2) > section.dados-tabelados > div > div:nth-child(1) > span"
    )?.textContent;
    const uf = elementVinculo
      .querySelector(
        "#main-content > div:nth-child(2) > section.dados-tabelados > div > div:nth-child(3) > span"
      )
      ?.textContent?.trim();

    //Vinculos Vigentes > Aposentadoria
    const tipo = elementVinculo
      .querySelector("#collapse-1 > div > div:nth-child(2) > div > span")
      ?.textContent?.trim();
    const dataAposentadoria = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(4) > div > span"
    )?.textContent;
    const cargoEmpregoFuncao = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(7) > div > span"
    )?.textContent;
    const regimeJuridico = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(9) > div:nth-child(1) > span"
    )?.textContent;
    const situacaoVinculo = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(9) > div:nth-child(2) > span"
    )?.textContent;
    const jornadaTrabalho = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(11) > div:nth-child(1) > span"
    )?.textContent;
    const matricula = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(11) > div:nth-child(2) > span"
    )?.textContent;
    const dataIngressoCargo = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(13) > div:nth-child(1) > span"
    )?.textContent;
    const dataIngressoLotacao = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(13) > div:nth-child(2) > span"
    )?.textContent;
    const dataIngressoServico = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(15) > div:nth-child(1) > span"
    )?.textContent;
    const dataPubliDocIngresso = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(15) > div:nth-child(2) > span"
    )?.textContent;
    const formaIngresso = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(17) > div > span"
    )?.textContent;
    const orgaoSuperior = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(20) > div:nth-child(1) > span"
    )?.textContent;
    const orgao = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(20) > div:nth-child(2) > span"
    )?.textContent;
    const uorg = elementVinculo.querySelector(
      "#collapse-1 > div > div:nth-child(22) > div > span"
    )?.textContent;

    const vinculosAposentadoria = {
      nome,
      uf,
      tipo,
      dataAposentadoria,
      cargoEmpregoFuncao,
      regimeJuridico,
      situacaoVinculo,
      jornadaTrabalho,
      matricula,
      dataIngressoCargo,
      dataIngressoLotacao,
      dataIngressoServico,
      dataPubliDocIngresso,
      formaIngresso,
      orgaoSuperior,
      orgao,
      uorg,
    };

    
    const elementRemuneracao = document.querySelector(
      "#box-remuneracao-aposentado-civil"
    ) as HTMLAnchorElement;

    const mesAno = Array.from(
      elementRemuneracao.querySelectorAll("button")
    ).map((el) => {
      return el?.textContent;
    });

    const retornaDescValor = (indicetabela:number) => {
      const tabela = elementRemuneracao.querySelector("#tab-remuneracoesServidor-"+ indicetabela +"-aposentado-civil") as HTMLAnchorElement;

      const descricoes = Array.from(tabela.querySelectorAll(".col-xs-6.col-sm-6 span, .col-xs-6.col-sm-6 strong")).map((el) => {
        return el?.textContent;
      })
      const valores = Array.from(tabela.querySelectorAll(".col-xs-3.col-sm-3.pull-right span, .col-xs-3.col-sm-3.pull-right strong")).map((el) => {
        return el?.textContent;
      })

      console.log("Descricao: ", descricoes);
      console.log("Valor: ", valores);

      const dadosDoMes: Record<string,string> = {};
      
      for (let i = 1; i < descricoes.length; i++) {
        const descricao = (descricoes[i] ?? '').replace(/:$/, '');
        const valor = valores[i];
        dadosDoMes[descricao!] = valor!;
      }
      return { dadosDoMes };
    }

    const fichaRemuneracao: Record<string, Record<string, string>> = {};

    for (let i = 1; i <= mesAno.length; i++) {
      console.log("Mes ano: ", mesAno[i-1]);
      const dadosDoMes = retornaDescValor(i);
      console.log("Dados do mes: ", dadosDoMes);
      fichaRemuneracao[mesAno[i-1]!] = dadosDoMes.dadosDoMes;
    }


    //
    const elementVinculos = document.querySelector(
      "#tabela-historico-poder-executivo"
    ) as HTMLAnchorElement;
    const valoresVinculos = Array.from(
      elementVinculos.querySelectorAll("td"),
      (td) => td.textContent?.trim() || ""
    );

    const dadosServidor = {
      vinculosAposentadoria: vinculosAposentadoria,
      fichaRemuneracao: fichaRemuneracao,
      valoresVinculo: valoresVinculos,
    }

    return { dadosServidor };
  });

  return dados;
};
