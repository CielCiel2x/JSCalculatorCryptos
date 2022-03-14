// C O N S T R U C T O R

class cryptomoneda {
    constructor(id, nombre, precio, compraUsd, compraCrypto) {
        this.id = id;
        this.nombre = nombre; // nombre de la cripto, a sacar por API
        this.precio = parseFloat(precio); // precio de la cripto, a sacar por API
        this.compraUsd = compraUsd;
        this.compraCrypto = compraCrypto;
    }
}


// A P I   O F   C R Y P T O P R I C E S

const Cryptos = [];

fetch("https://api.coingecko.com/api/v3/simple/price?ids=Bitcoin%2CEthereum%2CMonero%2CCardano%2CSolana%2CPolkadot%2CDogecoin&vs_currencies=USD&include_24hr_change=true")
    .then((response) => response.json())
    .then((data) => {
        var entriesKeys = Object.keys(data);
        var entriesValues = Object.values(data);


        for (let i = 0; i < entriesKeys.length; i++) {
            Cryptos.push(new cryptomoneda(undefined, entriesKeys[i], entriesValues[i].usd, 0, 0));
        }


        for (let i = 0; i < Cryptos.length; i++) {
            let selectCryptoMenu = document.querySelector('#selectCrypto');
            let option = document.createElement('option');
            option.value = i;

            option.innerHTML += `${Cryptos[i].nombre}`;
            selectCryptoMenu.appendChild(option);

        }
    });



// F I A T   C U R R E N C Y


const plataFiat = [];



class fiatCurrency {
    constructor(moneda, valorDolar) {
        this.moneda = moneda;
        this.valorDolar = parseFloat(valorDolar);
    }
}


fetch("https://api.currencyapi.com/v3/latest?apikey=bfa7e220-9b31-11ec-9e10-fb7b2f0f505f")
    .then((response) => response.json())
    .then((data) => {
        var entriesValues = Object.values(data.data);
        

        for (let i = 0; i < entriesValues.length; i++) {
            plataFiat.push(new fiatCurrency(entriesValues[i].code, entriesValues[i].value,));
        }


        for (let i = 0; i < plataFiat.length; i++) {
            let selectFiatMenu = document.querySelector('#monedaFiat');
            let option = document.createElement('option');
            option.value = i;

            option.innerHTML += `${plataFiat[i].moneda}`;
            selectFiatMenu.appendChild(option);

        }
    });



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



// C A L C U L A R   D O L A R E S

const fiatSelected = document.querySelector('#monedaFiat');

fiatSelected.addEventListener('change', (moneda) => {

    let valorDolar = plataFiat[moneda.target.value].valorDolar;
    let cantidadPesos = document.querySelector("#cantidadPesos").value;
    const cantidadDolares = dividir(cantidadPesos, valorDolar);
    const resultado = document.querySelector('.resultadoDolares');
    resultado.textContent = `${cantidadDolares.toFixed(2)}`;
});



// C A L C U L A D O R A

const nombreCrypto = document.querySelector('#selectCrypto').nombre;

const cryptoSelected = document.querySelector('#selectCrypto');

cryptoSelected.addEventListener('change', (seleccionCrypto) => {
    let precioCryptomoneda = Cryptos[seleccionCrypto.target.value].precio;
    document.querySelector("#precioCrypto").value = precioCryptomoneda;
})


const calcularCompra = () => {
    let precioCrypto = document.querySelector("#precioCrypto").value;
    var inversionEnDolares = document.querySelector("#usdCrypto").value;
    let cantidadComprada = dividir(inversionEnDolares, precioCrypto);
    document.querySelector("#tuCompra").value = cantidadComprada;

    Cryptos[cryptoSelected.value].compraUsd = inversionEnDolares;
    Cryptos[cryptoSelected.value].compraDeCrypto = cantidadComprada;
}

let calcularCrypto = document.getElementById('calcularCrypto');

calcularCrypto.addEventListener('click', () => {
    inversionEnDolares = document.querySelector("#usdCrypto").value;
    inversionEnDolares > 0 ? calcularCompra() :
        Swal.fire({
            title: 'Error!',
            text: 'tu inversion no puede ser menor a 1 usd o no elegiste una criptomoneda',
            icon: 'error',
            confirmButtonText: 'cerrar'
        })

})



// C R E A D O R    D E    C A R D S

let ShoppingCart = [];

const cardsCryptos = document.querySelector("#cryptoShoppingCart");



let id = 0;
const agregarCarrito = () => {
    ShoppingCart.push(new cryptomoneda(id += 1, Cryptos[cryptoSelected.value].nombre, Cryptos[cryptoSelected.value].precio, Cryptos[cryptoSelected.value].compraUsd, Cryptos[cryptoSelected.value].compraDeCrypto));

    var SelectCrypto = document.createElement("div");
    SelectCrypto.classList.add("customCard", "cardShadow");


    SelectCrypto.innerHTML += `
                                        <h5 class="card-title">${Cryptos[cryptoSelected.value].nombre}</h5>
                                        <ul>
                                            <li>
                                            precio: ${Cryptos[cryptoSelected.value].precio}
                                            </li>
                                            <li>
                                            tu compra en dolares: ${Cryptos[cryptoSelected.value].compraUsd}
                                            </li>
                                            <li>
                                            tendrias ${Cryptos[cryptoSelected.value].compraDeCrypto.toFixed(5)} ${Cryptos[cryptoSelected.value].nombre}
                                            </li>
                                        </ul>
    
                                        <input type="button" class="btn btn-danger" id="${id}" value="Eliminar"></input>
                                    `

    cardsCryptos.appendChild(SelectCrypto);



    let btnEliminar = document.getElementById(`${id}`)

    btnEliminar.addEventListener('click', () => {
        btnEliminar.parentElement.remove()

        ShoppingCart = ShoppingCart.filter(item => item.id != btnEliminar.id)

    })

    document.getElementById('addCryptoForm').reset();
}

let addPortfolio = document.getElementById('agregarCrypto');

addPortfolio.addEventListener('click', () => {
    agregarCarrito();
})

// A G R E G A R   A   P O R T F O L I O   P E R M A N E N T E
var today = new Date();
var date = `${today.getDate()}/${(today.getMonth() + 1)}/${today.getFullYear()} - ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;


const HistorialCompras = () => {
    localStorage.setItem(`${date}`, JSON.stringify(ShoppingCart));
}

let guardarHistorico = document.getElementById('guardarHistorico');

guardarHistorico.addEventListener('click', () => {
    HistorialCompras();

    ShoppingCart.length > 0 ?
        Swal.fire({
            title: 'Compra guardada!',
            text: 'Do you want to continue',
            icon: 'success',
            confirmButtonText: 'cerrar'
        })

        :

        Swal.fire({
            title: 'No agregaste ninguna compra!',
            text: 'calculá alguna moneda y agregala al carrito',
            icon: 'error',
            confirmButtonText: 'cerrar'
        })

    ShoppingCart = [];
    cardsCryptos.innerHTML = ``;
});

let borrarHistorial = document.getElementById("borrarHistorial");

borrarHistorial.addEventListener('click', () => {
    localStorage.clear();

    let modalBody = document.querySelector("#modalHistorialBody");
    modalBody.innerHTML = '';
});

// C O M P R A S   H I S T O R I C A S

const historialDeCompras = [];


const mostrarTodoHistorial = () => {
    var historialCompleto = [],
        keysHistorial = Object.keys(localStorage);
    i = keysHistorial.length;
    while (i--) {
        historialCompleto.push(JSON.parse(localStorage.getItem(keysHistorial[i])));
    }
    const modalHistorial = document.querySelector("#modalHistorialBody");

    modalHistorial.innerHTML = ``;

    historialCompleto.forEach(compra => {
        compra.forEach(monedaComprada => {

            let { nombre, compraUsd, compraCrypto } = monedaComprada;

            modalHistorial.innerHTML += `
                                        <div class="card cardShadow">
                                        <div class="card-body">
                                        <h5 class="card-title">${nombre}</h5>
                                        <p class="card-text">compraste ${compraCrypto} de ${nombre} que equivale a $${compraUsd} usd</p>
                                        </div>
                                        </div>`
        })
    })
}

const verHistorialCompleto = document.querySelector("#verComprasHistoricas");

verHistorialCompleto.addEventListener('click', () => {

    const hayHistorial = localStorage.length > 0;

    hayHistorial ? mostrarTodoHistorial() : Swal.fire({
        title: 'No tenes compras realizadas',
        text: 'Realizá compras para poder verlas acá',
        icon: 'error',
        confirmButtonText: 'cerrar'
    });

})