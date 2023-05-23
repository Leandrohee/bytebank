const listasMoedas = document.querySelectorAll('[data-lista]');
var moedaF

export function cotacaoMoeda(moeda,valor){ 

    listasMoedas.forEach(element => {
       if(element.id == moeda){
        element.innerHTML= ''
        
        for(let mult = 1; mult <= 1000; mult *= 10 ){
            
            if(mult === 1 && moeda == 'dolar'){moedaF = moeda}
            else if (mult >= 1 && moeda == 'dolar'){(moedaF = `${moeda}es`)}

            if(mult === 1 && moeda == 'euro'){moedaF = moeda}
            else if (mult >= 1 && moeda == 'euro'){(moedaF = `${moeda}s`)}

            const liMoeda = document.createElement('li');
            liMoeda.innerHTML = `${mult} ${moedaF}: R$ ${(mult * valor).toFixed(2)}`
            element.appendChild(liMoeda);
        }
       }
    })

}