# 🧪 Prueba de EmailJS

## Pasos para probar EmailJS:

### 1. Reiniciar el servidor React

```bash
npm start
```

### 2. Abrir la aplicación

- Ve a `http://localhost:3000`
- Navega a la sección de contacto (Footer)

### 3. Probar EmailJS

- Verás un botón azul "🧪 Probar EmailJS"
- Haz clic en el botón
- Se abrirá la consola del navegador (F12)
- Verás los logs de verificación

### 4. Verificar en la consola

Deberías ver algo como:

```
🔧 Verificando configuración de EmailJS...
Service ID: service_gz2yvtg
Template ID: template_vomeg48
Public Key: YhsHRcZuEhWdweoCU
✅ Todas las variables de EmailJS están configuradas
🚀 Iniciando prueba de EmailJS...
📧 Enviando email de prueba...
✅ Email enviado exitosamente!
```

### 5. Revisar tu Gmail

- Abre tu Gmail (mario@karajallo.com)
- Busca un email con asunto relacionado con EmailJS
- El email debería contener el mensaje de prueba

## 🔍 Si hay errores:

### Error común 1: "Service not found"

- Verifica que el Service ID sea correcto
- Asegúrate de que Gmail esté conectado en EmailJS

### Error común 2: "Template not found"

- Verifica que el Template ID sea correcto
- Asegúrate de que la plantilla esté guardada

### Error común 3: "Invalid API key"

- Verifica que el Public Key sea correcto
- Asegúrate de que la cuenta esté verificada

## ✅ Si funciona correctamente:

1. **Elimina el botón de prueba** del Footer
2. **Prueba el formulario real** enviando un mensaje
3. **Verifica** que recibas el email en Gmail
4. **Confirma** que se guarde en Sanity

## 🗑️ Limpiar después de la prueba:

Una vez que confirmes que funciona, elimina estos archivos:

- `src/testEmailJS.js`
- `TEST_EMAILJS.md`

Y elimina el botón de prueba del Footer.

## 📧 Email de prueba esperado:

Deberías recibir un email con:

- **Asunto**: Relacionado con EmailJS
- **Contenido**: "Este es un mensaje de prueba para verificar que EmailJS funciona correctamente."
- **Remitente**: Tu cuenta de Gmail
