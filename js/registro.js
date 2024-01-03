const toggleSwitch = document.getElementById("dark-mode-toggle");

toggleSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});

document
  .getElementById("registroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

    // Obtener los valores del formulario
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;
    var nombre = document.getElementById("firstname").value;
    var apellido = document.getElementById("lastname").value;

    // Verificar si el usuario es administrador
    var isAdminCheckbox = document.getElementById("admin-checkbox");
    var isAdmin = isAdminCheckbox.checked;

    // Realizar validaciones en el lado del cliente
    if (!usuario || !contrasena || !nombre || !apellido) {
      alert(
        "Todos los campos son obligatorios. Por favor,asd complete todos los campos."
      );
      return;
    }
    console.log(
      usuario +
        ":" +
        contrasena +
        ": " +
        nombre +
        ":" +
        apellido +
        ", Es administrador: " +
        isAdmin
    );
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../cgi-bin/registro.pl", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        // Manejar la respuesta del servidor
        // if (xhr.status == 200) {
          alert(xhr.responseText);
        // }else if(xhr.status == 400) {
          // alert("Hola");
        // } 
        // else {
          // alert("Error en la solicitud al servidor.");
        // }
      }
    };
    xhr.send(
      "usuario=" +
        encodeURIComponent(usuario) +
        "&contrasena=" +
        encodeURIComponent(contrasena) +
        "&nombre=" +
        encodeURIComponent(nombre) +
        "&apellido=" +
        encodeURIComponent(apellido) +
        "&role=" +
        encodeURIComponent(isAdmin ? "admin" : "normal")
    );
  });
