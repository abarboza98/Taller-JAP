let productID = localStorage.getItem('productID');
let INFO_PRODUCT = PRODUCT_INFO_URL + productID + EXT_TYPE;
let PRODUCT_COMMENTS = PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE;

//FUNCION QUE MUESTRA NOMBRE, PRECIO, DESCRIPCION, CANTIDAD DE VENDIDOS E IMAGENES DE CADA PRODUCTO

function showInfo(dataInfo) {
  let htmlContentToAppend = '';
  htmlContentToAppend += `<div class="container">
<div class="p-4 columns">

  <div class="mb-3">
  <h2 class="font-weight-bold">${dataInfo.name}</h2>
  <hr>
  <h4 class="font-weight-bold">Precio</h4>
  <p>${dataInfo.currency + dataInfo.cost}
  <br>
  <h4 class="font-weight-bold">Descripcion</h4>

  <p>${dataInfo.description}</p>

  <br>
    <h4 class="font-weight-bold">Categoria</h4>
    <p>${dataInfo.category}</p>
  </div>
  <br>
  
    <h4 class="font-weight-bold">Cantidad de Vendidos</h4>
    <span>${dataInfo.soldCount}</span>
  
  <br>
  <br>
  
  <h2 class='font-weight-bold'> Imagenes Ilustrativas</h2>
  
  </div>
  
</div>
  `;

  for (let imagen = 0; imagen < dataInfo.images.length; imagen++) {
    htmlContentToAppend += `
    <div class="d-flex w-10 justify-content-center row" >
      <img src="${dataInfo.images[imagen]}" class="img-thumbnail img-responsive col-sm-4">
    </div>`;
  }
  document.getElementById('producto').innerHTML = htmlContentToAppend;
}

//FUNCION QUE MUESTRA NOMBRE DE USUARIO, CALIFICACION, FECHA Y UNA RESEÑA DE CADA PRODUCTO
function showComments(dataComments) {
  arrayComments = dataComments;
  let appendCommentsToHTML = '';
  for (let comentario = 0; comentario < arrayComments.length; comentario++) {
    appendCommentsToHTML += `
      <div class="list-group-item container d-flex w-100 " >
            <span ><h3 class='font-weight-bold'>${arrayComments[comentario].user}</h3>           
              <p>${arrayComments[comentario].dateTime}</p>
                <br>
              <p>${arrayComments[comentario].description}</p>
            </span>
      </div>`;
  }
  document.getElementById('comentarios').innerHTML += appendCommentsToHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  //PETICIÓN DE LA URL PARA MOSTRAR LOS PRODUCTOS
  getJSONData(INFO_PRODUCT).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      let currentProductInfo = resultObj.data;
      showInfo(currentProductInfo);
    }
  });
  //PETICIÓN DE LA URL PARA MOSTRAR LOS COMENTARIOS DE CADA PRODUCTO
  getJSONData(PRODUCT_COMMENTS).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      let currentCommentsProduct = resultObj.data;
      showComments(currentCommentsProduct);
    }
  });
});
