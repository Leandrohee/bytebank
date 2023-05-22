const grafico = document.getElementById('GraficoDolar');

  const graficoDolar = new Chart(grafico, {
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

 async function conectaApi (){
    const respostaApi = await fetch ('https://economia.awesomeapi.com.br/last/USD-BRL');
    const respostaApiJson = await respostaApi.json()
    var precoDolar = respostaApiJson.USDBRL.ask
    const horarioAtual = pegaData();
    addData(graficoDolar,horarioAtual,precoDolar)
  }

setInterval(conectaApi,5000);

function pegaData(){
    const data = new Date();
    const horarioAtual = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
    return horarioAtual;
}

function addData(grafico, legenda, precoDolar) {
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(precoDolar);
    });
    grafico.update();
}
