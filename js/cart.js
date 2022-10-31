let CART_URL = CART_INFO_URL + 25801 + EXT_TYPE;
currentCartArticles = [];
let envio = document.getElementById('tipEnvio');
const dollarPrice = 41;

//FUNCION QUE CALCULA EL PRECIO TOTAL
function totalPrice() {
  let amount = document.getElementsByClassName('quantity');
  let currencyPrice = document.getElementsByClassName('currencyPrice');
  let price = document.getElementsByClassName('subtotales');
  let subtotal = 0;
  let total = 0;
  let costoEnvio = 0;

  //RECORRE TODOS LOS PRECIOS DE CADA PRODUCTO
  for (let i = 0; i < price.length; i++) {
    //SI EL PRECIO ESTA EN MONEDA URUGUAYA LO CONVIERTE A DOLAR DE LO CONTRARIO LO SUMA AL SUBTOTAl
    if (currencyPrice[i].innerHTML === 'UYU') {
      subtotal +=
        (parseInt(price[i].innerHTML) / dollarPrice) * amount[i].value;
    } else {
      subtotal += parseInt(price[i].innerHTML) * amount[i].value;
    }
  }
  //CALCULO EL COSTO DE ENVIO
  costoEnvio = subtotal * parseFloat(envio.value);
  //CALCULA EL TOTAL DEL ENVIO MAS EL SUBTOTAL DE CADA PRODUCTO Y SU CANTIDAD
  total = subtotal + costoEnvio;

  document.getElementById('valorSubtotal').innerHTML = `USD ${subtotal.toFixed(
    2
  )}`;
  document.getElementById('costoEnvio').innerHTML = `USD ${costoEnvio.toFixed(
    2
  )}`;
  document.getElementById('totalPrice').innerHTML = `USD ${total.toFixed(2)}`;
}
//FUNCION QUE MUESTRA LOS ARTICULOS DEL CARRITO
function showCart(articleCart) {
  let htmlContentToAppend = '';
  let subtotal = 0;
  for (let nroItem = 0; nroItem < articleCart.length; nroItem++) {
    let articulo = articleCart[nroItem];
    subtotal = subtotal + articulo.unitCost;
    htmlContentToAppend += `
      
      <div class="d-flex align-items-center mb-5">
                          <div class="flex-shrink-0">
                            <img
                              src="${articulo.image}"
                              class="img-fluid img-thumbnail"
                              style="width: 150px"
                              alt="Generic placeholder image"
                            />
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <a href="#!" class="float-end text-black"
                              ><i class="fas fa-times"></i
                            ></a>
                            <h5 class="text-primary">${articulo.name}</h5>
                            <div class="row">
                              <div class="container col-sm-12">
                                <p class="fw-bold mb-0 me-5 pe-3 "><span class='currencyPrice'>${articulo.currency}</span><span class="subtotales">${articulo.unitCost}</span></p>
                                <div class="d-flex flex-row">
                                  <button class="btn btn-link px-2"
                                    onclick="this.parentNode.querySelector('input[type=number]').stepDown(), totalPrice()">
                                    <i class="fas fa-minus"></i>
                                  </button>
          
                                  <input id="form1" min="1" name="quantity" value="1" type="number"
                                  class="form-control form-control-sm quantity" style="width: 50px;" 
                                  onchange="totalPrice()" />
          
                                  <button class="btn btn-link px-2"
                                    onclick="this.parentNode.querySelector('input[type=number]').stepUp(), totalPrice()"
                                    >
                                    <i class="fas fa-plus"></i>
                                
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
      </div>
      
      `;
  }

  document.getElementById('agregarArticulo').innerHTML += htmlContentToAppend;
  totalPrice();
}

function validation() {
  let calle = document.getElementById('calle');
  let nroPuerta = document.getElementById('nroPuerta');
  let esquina = document.getElementById('esquina');
  let intputTransferencia = document.getElementById('transferenciaBanco');
  let numeroTarjeta = document.getElementById('nTarjeta');
  let fechaVenc = document.getElementById('fecNam');
  let dateRegExpression = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  let codigoSeguridad = document.getElementById('CVV');
  let isValidate = true;

  if (dateRegExpression.test(fechaVenc.value)) {
    fechaVenc.setCustomValidity('');
  } else {
    fechaVenc.setCustomValidity(false);
    isValidate = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getJSONData(CART_URL).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      // currentCartArticles = resultObj.data.articles;
      currentCartArticles = JSON.parse(localStorage.getItem('myCart'));
      showCart(currentCartArticles);
    }
  });
});
envio.addEventListener('change', () => {
  totalPrice();
});

document.getElementById('btnTarjeta').addEventListener('click', () => {
  document.getElementById('nTarjeta').disabled = false;
  document.getElementById('fecNam').disabled = false;
  document.getElementById('CVV').disabled = false;
  document.getElementById('transferenciaBanco').disabled = true;
  document.getElementById('nTarjeta').required = true;
  document.getElementById('fecNam').required = true;
  document.getElementById('CVV').required = true;
  document.getElementById('transferenciaBanco').required = false;
});

document.getElementById('btnTransferencia').addEventListener('click', () => {
  document.getElementById('transferenciaBanco').disabled = false;
  document.getElementById('nTarjeta').disabled = true;
  document.getElementById('fecNam').disabled = true;
  document.getElementById('CVV').disabled = true;
  document.getElementById('nTarjeta').required = false;
  document.getElementById('fecNam').required = false;
  document.getElementById('CVV').required = false;
  document.getElementById('transferenciaBanco').required = true;
});

document.getElementById('formulario').addEventListener('submit', function (e) {
  if (!validation() || !this.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
  } else {
    e.preventDefault();
    e.stopPropagation();
    Swal.fire({
      title: 'Registro Correcto',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      window.location = 'cart.html';
    });
  }

  document.body.classList.add('was-validated');
});
