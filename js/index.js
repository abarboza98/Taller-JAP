document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('autos').addEventListener('click', function () {
    localStorage.setItem('catID', 101);
    window.location = 'products.html';
  });
  document.getElementById('juguetes').addEventListener('click', function () {
    localStorage.setItem('catID', 102);
    window.location = 'products.html';
  });
  document.getElementById('muebles').addEventListener('click', function () {
    localStorage.setItem('catID', 103);
    window.location = 'products.html';
  });

  /*COMPRUEBO SI HAY UNA SESION INICIADA*/

  function inicioSesion() {
    let username = localStorage.getItem('user');

    if (username == null) {
      location.href = 'login.html';
    }
  }
  inicioSesion();

  /*CIERRO LA SESION*/

  document
    .getElementById('cerrarSesion')
    .addEventListener('click', function () {
      localStorage.clear();
    });
});
