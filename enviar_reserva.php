<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Recoger y limpiar los datos (Sanitización)
    $nombre = strip_tags(trim($_POST["nombre"]));
    $email  = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $fecha  = $_POST["fecha"];
    $personas = $_POST["personas"];

    // 2. Configuración del correo
    $destinatario = "tu-correo@tu-balneario.com"; // <-- Cambia esto por tu email real
    $asunto = "Nueva reserva desde el sitio web de: $nombre";

    // 3. Construir el cuerpo del mensaje
    $contenido = "Detalles de la reservación:\n\n";
    $contenido .= "Nombre: $nombre\n";
    $contenido .= "Email: $email\n";
    $contenido .= "Fecha solicitada: $fecha\n";
    $contenido .= "Cantidad de personas: $personas\n";

    // 4. Cabeceras del correo (Headers)
    $headers = "From: Reservas Web <no-reply@tu-balneario.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 5. Enviar el correo
    if (mail($destinatario, $asunto, $contenido, $headers)) {
        // Redirigir a una página de éxito o mostrar mensaje
        echo "<script>
                alert('Gracias, $nombre. Tu solicitud ha sido enviada correctamente.');
                window.location.href = 'index.html';
              </script>";
    } else {
        echo "Lo sentimos, hubo un error al enviar tu mensaje. Inténtalo más tarde.";
    }
} else {
    // Si alguien intenta acceder al archivo directamente, lo mandamos al inicio
    header("Location: index.html");
}
?>