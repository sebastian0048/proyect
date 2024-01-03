const toggleSwitch = document.getElementById("dark-mode-toggle");

toggleSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

    // Obtener los valores del formulario
    var usuario = document.getElementById("usuario").value.trim();
    var contrasena = document.getElementById("contrasena").value.trim();

    // Validar que los campos no estén vacíos o solo contengan espacios
    if (usuario === "" || contrasena === "") {
      alert(
        "Todos los campos son obligatorios. Por favor, complete todos los campos."
      );
      return;
    }

    // Verificar si el usuario es administrador
    var isAdminCheckbox = document.getElementById("admin-checkbox");
    var isAdmin = isAdminCheckbox.checked;

    // Realizar la solicitud AJAX al script Perl
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../cgi-bin/login.pl", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        // Manejar la respuesta del servidor
        if (xhr.status == 200) {
          localStorage.setItem('userData', xhr.responseText);
          localStorage.setItem('isLoggedIn', 'true');
          window.location.href = "dashboard-user.html";
          // Redirigir a la página de dashboard (o la que desees)
          // window.location.href = "dashboard-user.html";
          alert(xhr.responseText);
        } else if (xhr.status == 401) {
          alert(xhr.responseText); // Mostrar mensaje de error en el inicio de sesión
        } else {
          alert(xhr.responseText);
          // alert("Error en la solicitud al servidor.");
        }
      }
    };
    xhr.send(
      "usuario=" +
        encodeURIComponent(usuario) +
        "&contrasena=" +
        encodeURIComponent(contrasena) +
        "&role=" +
        encodeURIComponent(isAdmin ? "admin" : "normal")
    );
  });


