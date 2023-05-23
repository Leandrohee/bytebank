// import { listaCotacao } from "./ImprimeCotacao.js";
import { cotacaoMoeda } from "./ImprimeCotacao.js";
let workerDolar = new Worker("./app/workerDolar.js");
let workerEuro = new Worker("./app/workerEuro.js");


// GRAFICO DO DOLAR

const graficoD = document.getElementById('GraficoDolar');

  const graficoDolar = new Chart(graficoD, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Preço do Dolar',
        data: [],
        borderWidth: 1
      }]
    },
  });

// GRAFICO DO EURO

const graficoE = document.getElementById('GraficoEuro');

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

function pegaData(){
    const data = new Date();
    let horas = (data.getHours() < 10) ? (`0${data.getHours()}`) : (data.getHours());
    let minutos = (data.getMinutes() < 10) ? (`0${data.getMinutes()}`) : (data.getMinutes());

    const horarioAtual = `${horas}:${minutos}:${data.getSeconds()}`
    return horarioAtual;
}

function addData(grafico, legenda, precoDolar) {
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(precoDolar);
    });
    grafico.update();
}

//FUNCAO ESPECIFICA DOLAR

workerDolar.postMessage('usd');
workerDolar.addEventListener('message',(event)=>{
    var precoDolar = event.data
    const horarioAtual = pegaData();
    addData(graficoDolar,horarioAtual,precoDolar)
    // listaCotacao('Dolar',precoDolar);
    cotacaoMoeda('dolar',precoDolar);
})

//FUNCAO ESPECIFICA EURO

workerEuro.postMessage('eur');
workerEuro.addEventListener('message',(event)=>{
    var precoEuro = event.data
    const horarioAtual = pegaData();
    addData(graficoEuro,horarioAtual,precoEuro)
    // listaCotacao('Euro',precoEuro);
    cotacaoMoeda('euro',precoEuro);
})