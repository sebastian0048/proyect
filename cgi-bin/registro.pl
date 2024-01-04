#!"C:\xampp\perl\bin\perl.exe"
use strict;
use warnings;
use CGI;
use DBI;

# Configuración de la base de datos
my $db_name = "polleria";
my $db_user = "root";
my $db_pass = "";
my $db_host = "localhost"; 

# Crear objetoCGI
my $cgi = CGI->new;

# Obtener datos del formulario
my $usuario = $cgi->param('usuario');
my $contrasena = $cgi->param('contrasena');
my $nombre = $cgi->param('nombre');
my $apellido = $cgi->param('apellido');
my $role = $cgi->param('role');

print $cgi->header(-charset=>'utf-8');

# if (!$usuario || !$contrasena || !$nombre || !$apellido || !$role) {
#     print $cgi->header(-status => '400 Bad Request');
#     print "Todos los campos son obligatorios. Por favor, complete todos los campos.";
#     exit;
# }

# my $dbh = DBI->connect("DBI:mysql:database=$db_name;host=$db_host", $db_user, $db_pass) or die "Couldn't connect to the database";

# my $stmt_check_user = $dbh->prepare("SELECT * FROM users WHERE username = ?");
# $stmt_check_user->execute($usuario);

# if ($stmt_check_user->fetchrow_array) {
#     print $cgi->header(-status => '400 Bad Request');
#     print "El nombre de usuario ya está en uso. Por favor, elija otro nombre de usuario.";
#     $dbh->disconnect;
#     exit;
# }

# my $stmt = $dbh->prepare("INSERT INTO users (username, password, role, firstname, lastname) VALUES (?, ?, ?, ?, ?)");


# $stmt->execute($usuario, $contrasena, $role, $nombre, $apellido);

# print $cgi->header(-type => 'text/plain', -status => '200 OK');

# print "¡Registro exitoso!";

# $dbh->disconnect;
