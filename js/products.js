const CARLIST_URL =
  'https://japceibal.github.io/emercado-api/cats_products/101.json';

function showProductsList(data) {
  let htmlContentToAppend = '';

  for (let i = 0; i < data.products.length; i++) {
    let product = data.products[i];

    htmlContentToAppend +=
      `
      <div class='list-group-item list-group-item-action'>
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
document.addEventListener('DOMContentLoaded', () => {
  getJSONData(CARLIST_URL).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      const data = resultObj.data;
      showProductsList(data);
    }
  });
});