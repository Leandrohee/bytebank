const listasMoedas = document.querySelectorAll('[data-lista]');

export function cotacaoMoeda(moeda,valor){ 

    listasMoedas.forEach(element => {
       if(element.id == moeda){
        element.innerHTML= ''

        for(let mult = 1; mult <= 1000; mult *= 10 ){
            const liMoeda = document.createElement('li');
            liMoeda.innerHTML = `${mult} ${moeda}: R$ ${(mult * valor).toFixed(2)}`
            element.appendChild(liMoeda);
        }
       }
    })

}