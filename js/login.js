function Loguearse() {
  let username = document.getElementById('user').value;
  let password = document.getElementById('password').value;

  if (username === '') {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'No se admiten campos vacios, por favor ingrese el usuario',
      showConfirmButton: true,
      timer: 3500,
    });
  } else if (password === '') {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'No se admiten campos vacios, por favor ingrese la contraseña',
      showConfirmButton: true,
      timer: 3500,
    });
  } else {
    localStorage.setItem('user', username);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logueado con exito',
      showConfirmButton: false,
      timer: 2500,
    }).then(function () {
      location.href = 'index.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginBtn').addEventListener('click', () => {
    Loguearse();
  });
});
