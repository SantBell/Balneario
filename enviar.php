<?php
/**
 * PROCESADOR DE ENVÍOS - CLUB CAMPESTRE EL EDÉN
 */

// Comprobar que el acceso provenga estrictamente por método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. FILTRADO Y SANITIZACIÓN DE ENTRADAS (Protección básica de datos)
    $nombre   = strip_tags(trim($_POST["nombre"]));
    $nombre   = str_replace(array("\r","\n"), array(" "," "), $nombre);
    $correo   = filter_var(trim($_POST["correo"]), FILTER_SANITIZE_EMAIL);
    $telefono = strip_tags(trim($_POST["telefono"]));
    $asunto   = strip_tags(trim($_POST["asunto"]));
    $mensaje  = trim($_POST["mensaje"]);

    // 2. VALIDACIÓN DE CAMPOS CRÍTICOS
    if (empty($nombre) || empty($mensaje) || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        // Si hay un error, redireccionar con un código de fallo
        header("Location: index.html?status=error");
        exit;
    }

    // 3. CONFIGURACIÓN DEL CORREO DESTINATARIO
    // Cambia este correo por el email real donde deseas recibir los mensajes de los clientes
    $destinatario = "informes@clubcampestreeden.com"; 
    
    // Asunto que verás en tu bandeja de entrada
    $asunto_correo = "Nueva solicitud web [El Edén]: " . $asunto;

    // 4. CONSTRUCCIÓN DEL CUERPO DEL MENSAJE (Estructura Limpia)
    $contenido_email = "Has recibido un nuevo mensaje desde el formulario de contacto web.\n\n";
    $contenido_email .= "Nombre: $nombre\n";
    $contenido_email .= "Correo: $correo\n";
    $contenido_email .= "Teléfono: $telefono\n";
    $contenido_email .= "Interés de Servicio: $asunto\n\n";
    $contenido_email .= "Mensaje:\n$mensaje\n";

    // 5. CABECERAS DEL CORREO (Headers para evitar caer en Spam)
    $cabeceras = "From: Formulario Web <no-reply@clubcampestreeden.com>\r\n";
    $cabeceras .= "Reply-To: $correo\r\n";
    $cabeceras .= "X-Mailer: PHP/" . phpversion();

    // 6. EJECUCIÓN DEL ENVÍO
    if (mail($destinatario, $asunto_correo, $contenido_email, $cabeceras)) {
        // Redirección exitosa si el servidor procesó el mail
        echo "<script>
                alert('¡Mensaje enviado con éxito! Nos comunicaremos contigo a la brevedad.');
                window.location.href='index.html';
              </script>";
    } else {
        // Fallo en la función nativa del servidor
        echo "<script>
                alert('Lo sentimos, hubo un problema interno en el servidor. Por favor, intenta más tarde.');
                window.location.href='index.html';
              </script>";
    }

} else {
    // Si alguien intenta entrar directo escribiendo 'enviar.php' en la barra de direcciones, lo rebota
    header("Location: index.html");
    exit;
}
?>