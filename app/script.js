// import { listaCotacao } from "./ImprimeCotacao.js";
import { cotacaoMoeda } from "./ImprimeCotacao.js";
let workerDolar = new Worker("./app/workerDolar.js");                                    //inicializando um thread paralelo específico para pegar a cotação do dolar                          
let workerEuro = new Worker("./app/workerEuro.js");                                      //inicializando um thread paralelo específico para pegar a cotação do euro


// GRAFICO DO DOLAR

const graficoD = document.getElementById('GraficoDolar');                               //Localizando a tag html canvas referente ao gráfico dólar

  const graficoDolar = new Chart(graficoD, {                                            //Criando o gráfico com o uso da biblioteca Chart.js
    type: 'line',                                                                       //Tipo do gráfico
    data: {
      labels: [],                                                                       //Eixo x
      datasets: [{
        label: 'Preço do Dolar',                                                        //Legenda do eixo y
        data: [],                                                                       //Eixo y
        borderWidth: 1
      }]
    },
  });

// GRAFICO DO EURO

const graficoE = document.getElementById('GraficoEuro');                                //Localizando a tag html canvas referente ao gráfico Euro

  const graficoEuro = new Chart(graficoE, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Preço do Euro',
        data: [],
        borderWidth: 1
      }]
    },
  });

 // FUNCOES GENERICAS  

function pegaHorario(){                                                                            //Função que retorna o horario atual no formato hh:mm:ss
    const data = new Date();
    let horas = (data.getHours() < 10) ? (`0${data.getHours()}`) : (data.getHours());              //Formata as horas para 2 digitos sempre
    let minutos = (data.getMinutes() < 10) ? (`0${data.getMinutes()}`) : (data.getMinutes());      //Formata os minutos para 2 digitos sempre

    const horarioAtual = `${horas}:${minutos}:${data.getSeconds()}`
    return horarioAtual;
}

function addData(grafico, legenda, precoDolar) {                                                  //Função que adciona dados no gráfico. Parametros: (gráficoemquestão, eixo x, eixo y)
    grafico.data.labels.push(legenda);                                                            //Como labels é um arrey simples basta o push para acrescentar dados
    grafico.data.datasets.forEach((dataset) => {                                                  //o data está dentro de um objeto dataset então precisa separa o objeto com forEach
        dataset.data.push(precoDolar);                                                            //Com o objeto datasets separado consigo acessar o data
    });
    grafico.update();
}

//FUNCAO ESPECIFICA DOLAR

workerDolar.postMessage('usd');                                                                  //Envia uma mensagem para o worker para iniciar a Thread paralela
workerDolar.addEventListener('message',(event)=>{                                                //Aguarda uma mensagem de retorno da thread paralela
    var precoDolar = event.data                                                                  //O evento retorna a promessa que a thread resolveu
    const horarioAtual = pegaHorario();                                                          //Pega o exato horario que a resposta da thread  chegou
    addData(graficoDolar,horarioAtual,precoDolar)                                                //Chama a função addData com os 3 parametros requeridos: gráfico referente, horario da resposta, resposta da Api(cotação) 
    cotacaoMoeda('dolar',precoDolar);                                                            //Chama a funcao cotação para printar uma legenda com a conversão de dolar para real
})

//FUNCAO ESPECIFICA EURO

workerEuro.postMessage('eur');
workerEuro.addEventListener('message',(event)=>{
    var precoEuro = event.data
    const horarioAtual = pegaHorario();
    addData(graficoEuro,horarioAtual,precoEuro)
    cotacaoMoeda('euro',precoEuro);
})