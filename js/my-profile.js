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
    isValid = false;
    email.setCustomValidity(false);
  }
  return isValid;
}

function editProfile() {
  let imgSelected = imagenUser.files;
  localStorage.setItem('pNombre', primerNombre.value);
  localStorage.setItem('sNombre', segundoNombre.value);
  localStorage.setItem('pApellido', primerApellido.value);
  localStorage.setItem('sApellido', segundoApellido.value);
  localStorage.setItem('email', email.value);
  localStorage.setItem('nroContacto', numeroContacto.value);

  if (imgSelected.length > 0) {
    let imgToB64 = imgSelected[0];
    let fileReader = new FileReader();

    fileReader.onload = function (event) {
      let b64Data = event.target.result;

      document.getElementById('img-perfil').src = b64Data;
      localStorage.setItem('imgUser', b64Data);
    };

    fileReader.readAsDataURL(imgToB64);
  }

  if (usuario.value != '' && usuario.value != localStorage.getItem('user')) {
    localStorage.setItem('user', usuario.value);
  }
}

function getProfile() {
  document.getElementById('primerNombreValue').innerHTML =
    localStorage.getItem('pNombre');
  document.getElementById('segundoNombreValue').innerHTML =
    localStorage.getItem('sNombre');
  document.getElementById('primerApellidoValue').innerHTML =
    localStorage.getItem('pApellido');
  document.getElementById('segundoApellidoValue').innerHTML =
    localStorage.getItem('sApellido');
  document.getElementById('emailValue').innerHTML =
    localStorage.getItem('email');

  document.getElementById('nroContactoValue').innerHTML =
    localStorage.getItem('nroContacto');

  document.getElementById('nameUser').innerHTML = localStorage.getItem('user');

  if (localStorage.getItem('imgUser') === null) {
    document.getElementById('img-perfil').src = '/img/img_perfil.png';
  } else {
    document.getElementById('img-perfil').src = localStorage.getItem('imgUser');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getProfile();

  imagenUser.addEventListener('change', () => {});

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
      getProfile();
      Swal.fire({
        title: 'Cambios guardados',
        icon: 'success',
        timer: 2500,
        showConfirmButton: false,
      });
    }
  });
});
