let CART_URL = CART_INFO_URL + 25801 + EXT_TYPE;

function showCart(articleCart) {
  let htmlContentToAppend = '';
  for (let nroArticulo = 0; nroArticulo < articleCart.length; nroArticulo++) {
    let articulo = articleCart[nroArticulo];
    htmlContentToAppend = `
      
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
                              <div
                                class="def-number-input number-input safari_only"
                              >
                                <button
                                  onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                  class="minus"
                                ></button>
                                <input
                                  class="quantity fw-bold text-black"
                                  min="0"
                                  name="quantity"
                                  value="1"
                                  type="number"
                                />
                                <button
                                  onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                  class="plus"
                                ></button>
                              </div>
                            </div>
                          </div>
      </div>
      
      `;
  }
  document.getElementById('agregarArticulo').innerHTML += htmlContentToAppend;
}

document.addEventListener('DOMContentLoaded', () => {
  getJSONData(CART_URL).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      let currentCartArticles = resultObj.data.articles;
      console.log(currentCartArticles[0].image);
      showCart(currentCartArticles);
    }
  });
});
