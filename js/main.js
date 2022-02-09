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

// C O N S T R U C T O R

class cryptomoneda {
    constructor(nombre, precio, compraUsd, compraCrypto) {
        this.nombre = nombre; // nombre de la cripto, a sacar por API
        this.precio = parseFloat(precio); // precio de la cripto, a sacar por API
        this.compraUsd = compraUsd;
        this.compraCrypto = compraCrypto;
    }
}

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

cryptoSelected.addEventListener('change', (seleccionCrypto) => {
    var precioCryptomoneda = Cryptos[seleccionCrypto.target.value].precio;
    document.querySelector("#precioCrypto").value = precioCryptomoneda;
})

const calcularCompra = () => {
    let precioCrypto = document.querySelector("#precioCrypto").value;
    let inversionEnDolares = document.querySelector("#usdCrypto").value;
    let cantidadComprada = dividir(inversionEnDolares, precioCrypto);
    document.querySelector("#tuCompra").value = cantidadComprada;

    Cryptos[cryptoSelected.value].compraUsd = inversionEnDolares;
    Cryptos[cryptoSelected.value].compraDeCrypto = cantidadComprada;
    console.log(Cryptos[cryptoSelected.value])
}


// C R E A D O R    D E    C A R D S

const agregarPortfolio = () => {
    const divCrypto = document.createElement("div");
        divCrypto.classList.add("customCard", "cardShadow");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");


        divCrypto.innerHTML += `<div class="card-body">
                                    <h5 class="card-title">${Cryptos[cryptoSelected.value].nombre}</h5>
                                    <ul>
                                        <li>
                                        precio: ${Cryptos[cryptoSelected.value].precio}
                                        </li>
                                        <li>
                                        tu compra en dolares: ${Cryptos[cryptoSelected.value].compraUsd}
                                        </li>
                                        <li>
                                        tendrias ${Cryptos[cryptoSelected.value].compraDeCrypto} ${Cryptos[cryptoSelected.value].nombre}
                                        </li>
                                    </ul>
                                </div>`

        cardsCryptos.appendChild(divCrypto);

}