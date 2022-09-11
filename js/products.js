//OBTIENE EL ID DE DEL PRODUCTO AL QUE PERTENECEN
categorieID = localStorage.getItem('catID');
const ORDER_BY_MAX_COST = '9-0';
const ORDER_BY_MIN_COST = '0-9';
const ORDER_BY_SOLD_COUNT = 'Cant.';
let currentProductsArray = [];
const PRODUCT_LIST_URL = PRODUCTS_URL + categorieID + EXT_TYPE;
currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;

function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_BY_MAX_COST) {
    result = array.sort(function (a, b) {
      return b.cost - a.cost;
    });
  } else if (criteria === ORDER_BY_MIN_COST) {
    result = array.sort(function (a, b) {
      return a.cost - b.cost;
    });
  } else if (criteria === ORDER_BY_SOLD_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      return bCount - aCount;
    });
  }

  return result;
}
function sortAndShowProducts(sortCriteria) {
  currentSortCriteria = sortCriteria;

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );

  //Muestro las categorías ordenadas
  showProductsList(currentProductsArray);
}
function setProductID(id) {
  localStorage.setItem('productID', id);
  window.location = 'product-info.html';
}

//MUESTRA LA LISTA DE PRODUCTOS
function showProductsList(dataProducts) {
  let htmlContentToAppend = '';

  //TITULO DE LA CATEGORIA AL QUE PERTENECEN
  //document.getElementById('titleProduct').innerHTML = resultObj.data.catName;
  for (let i = 0; i < dataProducts.length; i++) {
    let product = dataProducts[i];
    if (
      (minCost == undefined ||
        (minCost != undefined && parseInt(product.cost) >= minCost)) &&
      (maxCost == undefined ||
        (maxCost != undefined && parseInt(product.cost) <= maxCost))
    ) {
      htmlContentToAppend +=
        `
      <div onclick="setProductID(${product.id})" class='list-group-item list-group-item-action cursor-active'>
          <div class='row'>
                <div class='col-3'>
                      <img src='` +
        product.image +
        `' alt='product image' class= 'img-thumbnail'>
                </div>
                <div class='col'>
                    <div class='d-flex w-100 justify-content-between'>
                        <div class='mb-1'>
                            <h4> ` +
        product.name +
        ' -' +
        product.currency +
        ' ' +
        product.cost +
        ` </h4>
                                    <p> ` +
        product.description +
        `</p>           
        </div>
        <small class='text-muted'>` +
        product.soldCount +
        ' ' +
        'vendidos' +
        ` </small>
      </div>               
      </div>
        </div>
        </div>          
        `;
      document.getElementById('listado').innerHTML = htmlContentToAppend;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getJSONData(PRODUCT_LIST_URL).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      currentProductsArray = resultObj.data.products;
      showProductsList(currentProductsArray);
      document.getElementById('titleProduct').innerHTML =
        resultObj.data.catName;
    }
  });

  document.getElementById('sortMinCost').addEventListener('click', function () {
    sortAndShowProducts(ORDER_BY_MIN_COST);
  });

  document.getElementById('sortMaxCost').addEventListener('click', function () {
    sortAndShowProducts(ORDER_BY_MAX_COST);
  });

  document
    .getElementById('sortBySoldCount')
    .addEventListener('click', function () {
      sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

  document
    .getElementById('clearRangeFilter')
    .addEventListener('click', function () {
      document.getElementById('rangeFilterCostMin').value = '';
      document.getElementById('rangeFilterCostMax').value = '';

      minCost = undefined;
      maxCost = undefined;

      showProductsList(currentProductsArray);
    });

  document
    .getElementById('rangeFilterCount')
    .addEventListener('click', function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //vendida de cada producto
      minCost = document.getElementById('rangeFilterCostMin').value;
      maxCost = document.getElementById('rangeFilterCostMax').value;

      if (minCost != undefined && minCost != '' && parseInt(minCost) >= 0) {
        minCost = parseInt(minCost);
      } else {
        minCost = undefined;
      }

      if (maxCost != undefined && maxCost != '' && parseInt(maxCost) >= 0) {
        maxCost = parseInt(maxCost);
      } else {
        maxCost = undefined;
      }

      showProductsList(currentProductsArray);
    });
});
