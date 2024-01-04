#!"C:\xampp\perl\bin\perl.exe"
use strict;
use warnings;
use CGI;
use DBI;
use JSON;

# Configuración de la base de datos
my $db_name = "polleria";
my $db_user = "root";
my $db_pass = "";
my $db_host = "localhost"; 

my $cgi = CGI->new;

my $usuario    = $cgi->param('usuario');
my $contrasena = $cgi->param('contrasena');
my $role       = $cgi->param('role');


# Conectar a la base de datos
my $dbh = DBI->connect("DBI:mysql:$db_name:$db_host", $db_user, $db_pass, { RaiseError => 1, AutoCommit => 1 });

# Preparar y ejecutar la consulta SQL
my $stmt = $dbh->prepare("SELECT * FROM users WHERE username = ? AND password = ? AND role = ?");
$stmt->execute($usuario, $contrasena, $role);

# Obtener los datos del usuario
my $user_data = $stmt->fetchrow_hashref;

# Verificar las credenciales y enviar la respuesta JSON
if ($user_data) {
    # Usuario autenticado
    my $response = {
        status => 'success',
        message => 'Inicio de sesión exitoso',
        user_data => $user_data,
    };
    print $cgi->header(-charset => 'utf-8', -type => 'application/json', -status => '200 OK');
    print to_json($response);
} else {
    # Credenciales incorrectas
    my $response = {    
        status => 'error',
        message => 'Credenciales incorrectas. Por favor, verifique su nombre de usuario y contraseña.',
    };
    print $cgi->header(-charset => 'utf-8', -type => 'application/json', -status => '401 Unauthorized');
    print to_json($response);
}

# Desconectar de la base de datos
$dbh->disconnect;


