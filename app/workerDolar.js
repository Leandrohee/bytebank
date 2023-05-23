async function conectaApi (){
    const respostaApi = await fetch ('https://economia.awesomeapi.com.br/last/USD-BRL');
    const respostaApiJson = await respostaApi.json()
    postMessage(respostaApiJson.USDBRL.ask)
  }

  addEventListener('message', () => {
    conectaApi();
    setInterval(conectaApi,5000);
  })
