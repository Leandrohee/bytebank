async function conectaApi (){
    const respostaApi = await fetch ('https://economia.awesomeapi.com.br/last/EUR-BRL');
    const respostaApiJson = await respostaApi.json()
    postMessage(respostaApiJson.EURBRL.ask)
  }

  addEventListener('message', () => {
    conectaApi();
    setInterval(conectaApi,30000);
  })
