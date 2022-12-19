const CATEGORIES_URL = 'https://japceibal.github.io/emercado-api/cats/cat.json';
//const CATEGORIES_URL = 'http://localhost:3000/cat'
const PUBLISH_PRODUCT_URL =
  'https://japceibal.github.io/emercado-api/sell/publish.json';
//const PUBLISH_PRODUCT_URL = 'http://locahost:3000/publish'
const PRODUCTS_URL = 'https://japceibal.github.io/emercado-api/cats_products/';
//const PRODUCTS_URL = 'http://localhost:3000/cats_products/';
const PRODUCT_INFO_URL = 'https://japceibal.github.io/emercado-api/products/';
//const PRODUCT_INFO_URL = 'http://localhost:3000/products/';
const PRODUCT_INFO_COMMENTS_URL =
  'https://japceibal.github.io/emercado-api/products_comments/';
//const PRODUCT_INFO_COMMENTS_URL = 'http://localhost:3000/products_comments/';
const CART_INFO_URL = 'https://japceibal.github.io/emercado-api/user_cart/';
//const CART_INFO_URL = 'http://localhost:3000/user_cart/';
const CART_BUY_URL = 'https://japceibal.github.io/emercado-api/cart/buy.json';
//const CART_BUY_URL = 'http://localhost:3000/buy'
const EXT_TYPE = '.json';

let showSpinner = function () {
  document.getElementById('spinner-wrapper').style.display = 'block';
};

let hideSpinner = function () {
  document.getElementById('spinner-wrapper').style.display = 'none';
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
};
/*COMPRUEBO SI HAY UNA SESION INICIADA*/

function inicioSesion() {
  let username = localStorage.getItem('user');

  if (username == null) {
    location.href = 'login.html';
  } else {
    /*SI HAY UNA CUENTA ABIERTA, MUESTRO EL NOMBRE 
    DE PERFIL EN LA BARRA DE NAVEGACION */

    document.querySelector('#Perfil').innerHTML = `${username}`;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  inicioSesion();
});

/*CIERRO LA SESION*/

document.getElementById('cerrarSesion').addEventListener('click', function () {
  localStorage.clear();
});
