let CART_URL = CART_INFO_URL + 25801 + EXT_TYPE;
currentCartArticles = [];
function totalPriceXAmount(articlePosition) {
  let cantidad =
    document.getElementsByClassName('quantity')[articlePosition].value;
  let actualArticle = currentCartArticles[articlePosition];
  let valorTotal = cantidad * actualArticle.unitCost;

  document.getElementById(
    'valorTotal'
  ).innerHTML = `${actualArticle.currency} ${valorTotal}`;
}

function showCart(articleCart) {
  let htmlContentToAppend = '';
  for (let nroArticulo = 0; nroArticulo < articleCart.length; nroArticulo++) {
    let articulo = articleCart[nroArticulo];
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
    
                            <div class="d-flex align-items-center">
                              <p class="fw-bold mb-0 me-5 pe-3">${articulo.currency}${articulo.unitCost}</p>
                              <div class="d-flex flex-row">
                              <button class="btn btn-link px-2"
                                onclick="this.parentNode.querySelector('input[type=number]').stepDown(), totalPriceXAmount(${nroArticulo})">
                                <i class="fas fa-minus"></i>
                              </button>
          
                              <input id="form1" min="0" name="quantity" value="1" type="number"
                                class="form-control form-control-sm quantity" style="width: 50px;" 
                                onchange="totalPriceXAmount(${nroArticulo})" />
          
                              <button class="btn btn-link px-2"
                                onclick="this.parentNode.querySelector('input[type=number]').stepUp(), totalPriceXAmount(${nroArticulo})"
                                 >
                                <i class="fas fa-plus"></i>
                                
                              </button>
                            </div>
                            </div>
                          </div>
      </div>
      
      `;
    document.getElementById('valorTotal').innerHTML += articulo.unitCost;
  }

  document.getElementById('agregarArticulo').innerHTML += htmlContentToAppend;
}

document.addEventListener('DOMContentLoaded', () => {
  getJSONData(CART_URL).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      // currentCartArticles = resultObj.data.articles;
      currentCartArticles = JSON.parse(localStorage.getItem('myCart'));
      showCart(currentCartArticles);
      console.log(currentCartArticles);
    }
  });
});
