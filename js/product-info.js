let productID = localStorage.getItem('productID');
let INFO_PRODUCT = PRODUCT_INFO_URL + productID + EXT_TYPE;
let PRODUCT_COMMENTS = PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE;
let currentCommentsList = [];
let currentProductInfo = [];
let newArticleCart = [];

//FUNCION QUE AÑADE UN PRODUCTO AL CARRITO
function addCartProduct(array) {
  let article = {
    id: productID,
    name: array.name,
    count: 1,
    unitCost: array.cost,
    currency: array.currency,
    image: array.images[0],
  };
  newArticleCart.push(article);

  localStorage.setItem('myCart', JSON.stringify(newArticleCart));
}

//FUNCION PARA REDIRIGIR A UN PRODUCTO RELACIONADO
function setRelatedProductID(id) {
  localStorage.setItem('productID', id);
  window.location.reload();
}

//FUNCION QUE MUESTRA NOMBRE, PRECIO, DESCRIPCION, CANTIDAD DE VENDIDOS E IMAGENES DE CADA PRODUCTO
function showInfo(dataInfo) {
  let htmlContentToAppend = '';
  htmlContentToAppend += `<div class="container">
<div class="p-4 columns">

  <div class="mb-3">
  <a href="products.html"
  ><i class="fas fa-angle-left me-2"></i>Volver al
  lista de Productos</a
>
    <div class="d-flex flex-row justify-content-between">
      <h2 class="font-weight-bold mr-auto p-2">${dataInfo.name}</h2>
      <button type="button" class="btn btn-outline-warning btn-lg p-2 justify-content-end" onclick="addCartProduct(currentProductInfo)"><i class="fas fa-shopping-cart"></i> Añadir al carrito</button>
    </div>
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
  // AÑADE IMAGENES ILUSTRATIVAS
  let appendImage = `
  
    <div class="carousel slide" data-mdb-ride="carousel">
    <div id="carouselExampleControls" class="carousel slide container" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${dataInfo.images[0]}" class="d-block w-100">
                </div>
                <div class="carousel-item">
                    <img src="${dataInfo.images[1]}" class="d-block w-100">
                </div>
                <div class="carousel-item">
                    <img src="${dataInfo.images[2]}" class="d-block w-100">
                </div>
                <div class="carousel-item">
                    <img src="${dataInfo.images[3]}" class="d-block w-100">
                </div>
              
                <button style="color:black;" class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
                </button>
                         
            </div>
        </div>
  </div>
          `;
  // AÑADE PRODUCTOS RELACIONADOS
  let appendToRelatedProducts = '';
  for (let item = 0; item < dataInfo.relatedProducts.length; item++) {
    appendToRelatedProducts += `
    
                <div class="container p-2" onclick="setRelatedProductID(${dataInfo.relatedProducts[item].id})">
                    <img  src="${dataInfo.relatedProducts[item].image}"  class="w-40 img-thumbnail"  >
                    <h3 class="title">${dataInfo.relatedProducts[item].name}</h3>
                </div>

                `;
  }

  document.getElementById('imgCarousel').innerHTML = appendImage;
  document.getElementById('producto').innerHTML = htmlContentToAppend;
  document.getElementById('relatedProduct').innerHTML +=
    appendToRelatedProducts;
}

//FUNCION QUE MUESTRA NOMBRE DE USUARIO, CALIFICACION, FECHA Y UNA RESEÑA DE CADA PRODUCTO
function showComments(dataComments) {
  arrayComments = dataComments;
  let appendCommentsToHTML = '';

  for (let comentario = 0; comentario < arrayComments.length; comentario++) {
    //Muestro la puntuacion con estrellas
    let estrellas = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= arrayComments[comentario].score) {
        estrellas += '<i class="fas fa-star checked" ></i>'; //icono estrella llena
      } else {
        estrellas += '<i class="far fa-star checked"></i>'; //icono contorno estrella
      }
    }

    appendCommentsToHTML += `
      <div class="list-group-item container d-flex w-100 " >
            <span ><h3 class='font-weight-bold'>${arrayComments[comentario].user}</h3>           
              <p>${arrayComments[comentario].dateTime}</p><span>${estrellas}</span>
                <br>
              <p>${arrayComments[comentario].description}</p>
            </span>
      </div>`;

    document.getElementById('comentarios').innerHTML = appendCommentsToHTML;
  }
}
//Funcion que agrega comentarios
function addComment() {
  //obtiene la fecha actual
  const actualDate = new Date();
  const year = actualDate.getFullYear();
  const month = actualDate.getMonth() + 1;
  const day = actualDate.getDate();
  const hour = actualDate.getHours();
  const minute = actualDate.getMinutes();
  const second = actualDate.getSeconds();

  let myComment = {
    product: localStorage.getItem('productID'),
    score: document.getElementById('puntaje').value,
    description: document.getElementById('descripcion').value,
    user: localStorage.getItem('user'),
    dateTime: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
  };
  currentCommentsList.push(myComment);
}
document.addEventListener('DOMContentLoaded', () => {
  //PETICIÓN DE LA URL PARA MOSTRAR LOS PRODUCTOS
  getJSONData(INFO_PRODUCT).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      currentProductInfo = resultObj.data;
      showInfo(currentProductInfo);
    }
  });
  //PETICIÓN DE LA URL PARA MOSTRAR LOS COMENTARIOS DE CADA PRODUCTO
  getJSONData(PRODUCT_COMMENTS).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      currentCommentsList = resultObj.data;
      showComments(currentCommentsList);
    }
  });
  newArticleCart = JSON.parse(localStorage.getItem('myCart'));
  if (newArticleCart === null) {
    newArticleCart = [];
  }
});

//ENVIA LOS COMENTARIOS
document.getElementById('sendComment').addEventListener('click', () => {
  addComment();
  Swal.fire({
    icon: 'success',
    text: 'Comentario enviado con exito!',
  });
  showComments(currentCommentsList);
});
