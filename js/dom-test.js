const Cryptos = [{ nombre: "Ethereum", precio: 2712.37, compraUsd: 0, compraDeCrypto: 0 },
{ nombre: "Bitcoin", precio: 37651.36, compraUsd: 0, compraDeCrypto: 0 },
{ nombre: "Solana", precio: 111.44, compraUsd: 0, compraDeCrypto: 0 },
{ nombre: "Cardano", precio: 1.06, compraUsd: 0, compraDeCrypto: 0 },
{ nombre: "XMR", precio: 0.75, compraUsd: 0, compraDeCrypto: 0 },
{ nombre: "BNB", precio: 376.73, compraUsd: 0, compraDeCrypto: 0 }];


const plataFiat = [{ pais: "Argentina", moneda: "ARS", valorDolar: 200 },
{ pais: "Chile", moneda: "CLP", valorDolar: 813 },
{ pais: "Brasil", moneda: "BRL", valorDolar: 5 },
{ pais: "Colombia", moneda: "COP", valorDolar: 3933 },]


const ShoppingCart = [];


const cardsCryptos = document.querySelector("#cryptoShoppingCart");


//funciones

// F U N C I O N E S   B A S I C A S

const dividir = (num1, num2) => {
    let resultadoDivision;
    resultadoDivision = num1 / num2;
    return resultadoDivision; // DIVIDIR
}

const restar = (num1, num2) => {
    let resultadoResta;
    resultadoResta = num1 - num2;
    return resultadoResta; // RESTAR
}

// C R E A D O R   D E   C A R D S

crearCards();

function crearCards() {
    Cryptos.forEach((crypto) => {
        const divCrypto = document.createElement("div");
        divCrypto.classList.add("card", "cardShadow");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");


        divCrypto.innerHTML += `<div class="card-body>
                                    <h5 class="card-title">${crypto.nombre}</h5>
                                    <ul>
                                        <li>
                                        precio: ${crypto.precio}
                                        </li>
                                        <li>
                                        precio: ${crypto.compraUsd}
                                        </li>
                                        <li>
                                        precio: ${crypto.compraDeCrypto}
                                        </li>
                                    </ul>
                                </div>`

        cardsCryptos.appendChild(divCrypto);

        divCrypto.appendChild(cardBody);
    })
}


//F U N C I O N   S E A R C H

const search = (term) => {
    term = prompt(`Qué criptomoneda desea buscar?`);
    let resultadoBusqueda = Cryptos.filter((elementos) => elementos.nombre.includes(term));

    if (resultadoBusqueda.length == 0) {
        console.log(`no existe la moneda que buscas`);
    } else if (resultadoBusqueda.length >= 1) {
        console.log(resultadoBusqueda);
    } else {
        console.log(`Ingrese un termino de busqueda`);
    }
}


// C A L C U L A R   D O L A R E S

const fiatSelected = document.querySelector('#monedaFiat');

fiatSelected.addEventListener('change', (moneda) => {
    var valorDolar = plataFiat[moneda.target.value].valorDolar;
    var cantidadPesos = document.querySelector("#cantidadPesos").value;
    const cantidadDolares = dividir(cantidadPesos, valorDolar);
    const resultado = document.querySelector('.resultadoDolares');
    resultado.textContent = `${cantidadDolares.toFixed(2)}`;
});


// C A L C U L A D O R A

const cryptoSelected = document.querySelector('#selectCrypto');

cryptoSelected.addEventListener('change', (cryptoSelect) => {

})

















/*     let fiatElegida = prompt(`Ingrese su moneda:\n ARS (ingrese 1)\n CLP (ingrese 2) \n BRL (ingrese 3)\n COP (ingrese 4)`),
    cantidadPesos = parseFloat(prompt(`Ingrese cuantos pesos tiene.`)),

    cantidadDolar = dividir(cantidadPesos, plataFiat[fiatElegida - 1].valorDolar),
    compraCrypto;

alert(`usted tiene ${cantidadDolar} dolares`);


// P R O G R A M A

if (cantidadDolar <= 0) {
    console.log(`Usted no posee capital de inversión`); // por si no tiene ni 1 dolar para invertir
} else {

    let inicio = prompt(`Desea calcular cuanto podria comprar de una criptomoneda? escriba "si" o "no"`);

    if (inicio == `no` || inicio == `NO` || inicio == null) {
        console.log(`Que tenga un buen dia`);
    } else if (inicio == `si` || inicio == `SI`) {

        do {
            let cryptoElegida = prompt(`qué criptomoneda desea comprar?:\n Ethereum (ingrese 1)\n Bitcoin (ingrese 2) \n Solana (ingrese 3)\n Cardano (ingrese 4)\n XMR (ingrese 5) \n BNB (Ingrese 6)`);

            compraCryptoUsd = prompt(`Cuantos dolares desea comprar de ${Cryptos[cryptoElegida - 1].nombre}?`);

            Cryptos[cryptoElegida - 1].compraUsd = compraCryptoUsd;

            Cryptos[cryptoElegida - 1].compraDeCrypto = compraCryptoUsd / Cryptos[cryptoElegida - 1].precio; // calcular cuanto va a comprar de la coin

            cantidadDolar = restar(cantidadDolar, compraCryptoUsd); // cuantos dolares le quedan

            console.log(`vas a comprar ${Cryptos[cryptoElegida - 1].compraDeCrypto} de ${Cryptos[cryptoElegida - 1].nombre} que son ${Cryptos[cryptoElegida - 1].compraUsd} dolares`); // confirmacion de lo que va a comprar

            inicio = prompt(`desea comprar otra crypto? ingrese "si" o "no"`);




        } while ((inicio != null) && (inicio != `no`) && (inicio != `NO`)) {
            console.log(`Te van a quedar ${cantidadDolar} dolares`);

            const compraFinal = Cryptos.filter((crypto) => crypto.compraUsd > 0); // para visualizar todas las compras que va a realizar sin mostrar las que no compra)

            console.log(compraFinal);
        }
    }
} */