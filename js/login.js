function Loguearse() {
  let username = document.getElementById('user').value;
  let password = document.getElementById('password').value;

  if (username === '') {
    document.getElementById('user').classList.add('.error');
    alert('No se admiten campos vacios, Por favor ingrese el usuario.');
  } else if (password === '') {
    alert('No se admiten campos vacios, Por favor ingrese la contraseña.');
  } else {
    localStorage.setItem('user', username);
    location.href = 'index.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login').addEventListener('click', () => {
    Loguearse();
  });
});
