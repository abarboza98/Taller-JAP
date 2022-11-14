//DECLARACION DE VARIABLES
let primerNombre = document.getElementById('firstName');
let segundoNombre = document.getElementById('secondName');
let primerApellido = document.getElementById('primerApellido');
let segundoApellido = document.getElementById('segundoApellido');
let email = document.getElementById('email');
let usuario = document.getElementById('usuario');
let numeroContacto = document.getElementById('numeroContacto');
let imagenUser = document.getElementById('imagenPerfil');

//FUNCION QUE VERIFICA QUE EL EMAIL SEA VALIDO
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

//FUNCION QUE GUARDA LOS DATOS EN LOCAL STORAGE
function editProfile() {
  let imgSelected = imagenUser.files;
  localStorage.setItem('pNombre', primerNombre.value);
  localStorage.setItem('sNombre', segundoNombre.value);
  localStorage.setItem('pApellido', primerApellido.value);
  localStorage.setItem('sApellido', segundoApellido.value);
  localStorage.setItem('email', email.value);
  localStorage.setItem('nroContacto', numeroContacto.value);

  //CONVIERTE IMAGEN A BASE 64
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

  //SI NO ESTA VACIO Y SI EL USUARIO CAMBIO SU NOMBRE  DE USUARIO ES REMPLAZADO
  if (usuario.value != '' && usuario.value != localStorage.getItem('user')) {
    localStorage.setItem('user', usuario.value);
  }
}

//OBTENGO LOS DATOS DEL LOCAL STORAGE PARA MOSTRAR
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

  //SI EL USUARIO AUN NO CAMBIO LA IMAGEN DE PERFIL MUESTRO UNA POR DEFECTO
  if (localStorage.getItem('imgUser') === null) {
    document.getElementById('img-perfil').src = '/img/img_perfil.png';
  } else {
    document.getElementById('img-perfil').src = localStorage.getItem('imgUser');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getProfile();

  //ME VALIDA QUE EL USUARIO HAYA LLENADO LOS CAMPOS OBLIGATORIOS (*) AL DARLE EDITAR PERFIL
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
    // SI LA VALIDACION FUE BUENA HACE LOS CAMBIOS
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
