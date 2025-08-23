# Configuración de EmailJS para Redireccionar Correos a Gmail

## Paso 1: Crear cuenta en EmailJS

1. Ve a [EmailJS.com](https://www.emailjs.com/) y crea una cuenta gratuita
2. Verifica tu email

## Paso 2: Configurar Gmail como servicio de email

1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona "Gmail"
4. Conecta tu cuenta de Gmail (mario@karajallo.com)
5. Guarda el servicio y copia el **Service ID**

## Paso 3: Crear una plantilla de email

1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa esta plantilla:

```html
Nuevo mensaje de contacto desde tu portfolio: Nombre: {{from_name}} Email:
{{from_email}} Mensaje: {{message}} --- Enviado desde tu portfolio web
```

4. Guarda la plantilla y copia el **Template ID**

## Paso 4: Obtener tu Public Key

1. Ve a "Account" → "API Keys"
2. Copia tu **Public Key**

## Paso 5: Configurar variables de entorno

Crea un archivo `.env` en la raíz de tu proyecto frontend_react:

```env
# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=tu_service_id_aqui
REACT_APP_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
REACT_APP_EMAILJS_PUBLIC_KEY=tu_public_key_aqui

# Sanity Configuration (ya existente)
REACT_APP_SANITY_PROJECT_ID=m13c90dp
REACT_APP_SANITY_TOKEN=tu_sanity_token_aqui
```

## Paso 6: Reiniciar el servidor

```bash
cd frontend_react
npm start
```

## ¿Cómo funciona?

1. Cuando alguien envía un mensaje desde tu portfolio:

   - Se guarda en Sanity (como antes)
   - Se envía un email a tu Gmail usando EmailJS
   - El usuario recibe confirmación

2. Los emails llegarán a tu Gmail con:
   - Nombre del remitente
   - Email del remitente
   - Mensaje completo
   - Asunto personalizado

## Notas importantes:

- El plan gratuito de EmailJS permite 200 emails por mes
- Los emails se envían desde tu cuenta de Gmail
- Puedes personalizar la plantilla de email como quieras
- El sistema funciona tanto en desarrollo como en producción

## Solución de problemas:

- Si no recibes emails, verifica que las variables de entorno estén correctas
- Asegúrate de que tu Gmail esté conectado correctamente en EmailJS
- Revisa la consola del navegador para errores
