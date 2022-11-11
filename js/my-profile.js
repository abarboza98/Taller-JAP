let primerNombre = document.getElementById('firstName');
let segundoNombre = document.getElementById('secondName');
let primerApellido = document.getElementById('primerApellido');
let segundoApellido = document.getElementById('segundoApellido');
let email = document.getElementById('email');
let usuario = document.getElementById('usuario');
let numeroContacto = document.getElementById('numeroContacto');
let imagenUser = document.getElementById('imagenPerfil');

function verifiedProfile() {
  let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  let isValid = true;

  if (emailRegex.test(campo.value)) {
    email.setCustomValidity('');
  } else {
    email.setCustomValidity(false);
    isValid = false;
  }
}

function editProfile() {
  localStorage.setItem('pNombre', primerNombre.value);
  localStorage.setItem('sNombre', segundoNombre.value);
  localStorage.setItem('pApellido', primerApellido.value);
  localStorage.setItem('sApellido', segundoApellido.value);
  localStorage.setItem('email', email.value);
  localStorage.setItem('nroContacto', numeroContacto.value);
  localStorage.setItem('imgUser', imagenUser.value);
}

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('formProfile')
    .addEventListener('submit', function (e) {
      if (!verifiedProfile() || !this.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      document.body.classList.add('was-validated');
    });

  document.getElementById('guardarPerfil').addEventListener('click', () => {
    if (document.getElementById('formProfile').checkValidity()) {
      editProfile();

      primerNombre.innerHTML = localStorage.getItem('pNombre');
      segundoNombre.innerHTML = localStorage.getItem('sNombre');
      primerApellido.innerHTML = localStorage.getItem('pApellido');
      segundoApellido.innerHTML = localStorage.getItem('sApellido');
      email.innerHTML = localStorage.getItem('email');

      numeroContacto.innerHTML = localStorage.getItem('nroContacto');
      imagenUser.innerHTML = localStorage.getItem('imgUser');

      window.location = 'my-profile.html';
    }
  });
});
