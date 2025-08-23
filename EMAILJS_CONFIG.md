# Configuración de Variables de EmailJS

## Tu archivo .env actual:

```env
REACT_APP_SANITY_PROJECT_ID=m13c90dp
REACT_APP_SANITY_TOKEN=skj6F6DZhS7lWB6xAz96HaG3UT6HTmKrky5iOu4gDirY808tf1VCvnVv1ke0WnEYJJAVtM9NgzxCmoU7Tj7X8rUaN7zv9W3molqUh7wvNlfaFqgOZJYWXB4tk919DWpt6DpGSGO3QJAQ02g3epuecIu1TWGlx1wt1h5kfqQMuodNmvlle7KM

# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Pasos para obtener los valores de EmailJS:

### 1. Crear cuenta en EmailJS

- Ve a [EmailJS.com](https://www.emailjs.com/)
- Crea una cuenta gratuita
- Verifica tu email

### 2. Obtener Service ID

1. En EmailJS, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **"Gmail"**
4. Conecta tu cuenta de Gmail (mario@karajallo.com)
5. Guarda el servicio
6. **Copia el Service ID** (ejemplo: `service_abc123`)

### 3. Obtener Template ID

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Usa esta plantilla:

```html
Nuevo mensaje de contacto desde tu portfolio: Nombre: {{from_name}} Email:
{{from_email}} Mensaje: {{message}} --- Enviado desde tu portfolio web
```

4. Guarda la plantilla
5. **Copia el Template ID** (ejemplo: `template_xyz789`)

### 4. Obtener Public Key

1. Ve a **"Account"** → **"API Keys"**
2. **Copia tu Public Key** (ejemplo: `user_def456`)

## Reemplazar en el archivo .env:

Edita el archivo `.env` y reemplaza los valores:

```env
# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=service_abc123          # Tu Service ID real
REACT_APP_EMAILJS_TEMPLATE_ID=template_xyz789        # Tu Template ID real
REACT_APP_EMAILJS_PUBLIC_KEY=user_def456             # Tu Public Key real
```

## Ejemplo de archivo .env completo:

```env
REACT_APP_SANITY_PROJECT_ID=m13c90dp
REACT_APP_SANITY_TOKEN=skj6F6DZhS7lWB6xAz96HaG3UT6HTmKrky5iOu4gDirY808tf1VCvnVv1ke0WnEYJJAVtM9NgzxCmoU7Tj7X8rUaN7zv9W3molqUh7wvNlfaFqgOZJYWXB4tk919DWpt6DpGSGO3QJAQ02g3epuecIu1TWGlx1wt1h5kfqQMuodNmvlle7KM

# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=service_abc123
REACT_APP_EMAILJS_TEMPLATE_ID=template_xyz789
REACT_APP_EMAILJS_PUBLIC_KEY=user_def456
```

## Después de configurar:

1. **Reinicia tu servidor React:**

   ```bash
   npm start
   ```

2. **Prueba el formulario** enviando un mensaje de prueba

3. **Verifica** que recibas el email en tu Gmail

## Notas importantes:

- ✅ Los valores son sensibles, no los compartas
- ✅ El archivo `.env` ya está en `.gitignore` (seguro)
- ✅ El plan gratuito permite 200 emails/mes
- ✅ Los emails se envían desde tu Gmail
