# 🔍 Diagnóstico de EmailJS

## Problema: Error "undefined" al enviar email

### Pasos para diagnosticar:

#### 1. Reiniciar el servidor React

```bash
npm start
```

#### 2. Abrir la aplicación

- Ve a `http://localhost:3000`
- Navega a la sección de contacto (Footer)

#### 3. Verificar variables de entorno

- Haz clic en el botón verde **"🔍 Verificar Variables"**
- Abre la consola del navegador (F12)
- Verifica que todas las variables estén presentes

**Deberías ver:**

```
🔍 Verificación simple de variables de entorno:
==============================================
📊 Sanity:
- Project ID: m13c90dp
- Token presente: true
📧 EmailJS:
- Service ID: service_gz2yvtg
- Template ID: template_vomeg48
- Public Key: YhsHRcZuEhWdweoCU
✅ Sanity configurado: true
✅ EmailJS configurado: true
```

#### 4. Si las variables están OK, probar EmailJS

- Haz clic en el botón azul **"🧪 Probar EmailJS"**
- Revisa la consola para ver logs detallados

## 🔧 Posibles problemas y soluciones:

### Problema 1: Variables no se cargan

**Síntomas:** Variables aparecen como `undefined`
**Solución:**

1. Verifica que el archivo `.env` esté en la raíz del proyecto
2. Reinicia el servidor React
3. Asegúrate de que las variables empiecen con `REACT_APP_`

### Problema 2: Service ID incorrecto

**Síntomas:** Error "Service not found"
**Solución:**

1. Verifica el Service ID en EmailJS
2. Asegúrate de que Gmail esté conectado

### Problema 3: Template ID incorrecto

**Síntomas:** Error "Template not found"
**Solución:**

1. Verifica el Template ID en EmailJS
2. Asegúrate de que la plantilla esté guardada

### Problema 4: Public Key incorrecto

**Síntomas:** Error "Invalid API key"
**Solución:**

1. Verifica el Public Key en EmailJS
2. Asegúrate de que la cuenta esté verificada

### Problema 5: Error "undefined"

**Síntomas:** Error es undefined
**Solución:**

1. Verifica que EmailJS esté instalado: `npm install @emailjs/browser`
2. Verifica que las variables estén correctamente formateadas
3. Revisa la consola para más detalles

## 📋 Checklist de verificación:

- [ ] Archivo `.env` en la raíz del proyecto
- [ ] Variables empiezan con `REACT_APP_`
- [ ] Servidor React reiniciado
- [ ] EmailJS instalado
- [ ] Service ID correcto
- [ ] Template ID correcto
- [ ] Public Key correcto
- [ ] Gmail conectado en EmailJS
- [ ] Plantilla guardada en EmailJS

## 🆘 Si nada funciona:

1. **Verifica EmailJS manualmente:**

   - Ve a [EmailJS.com](https://www.emailjs.com/)
   - Verifica que tu cuenta esté activa
   - Verifica que Gmail esté conectado

2. **Prueba con valores hardcodeados temporalmente:**

   - Reemplaza las variables por valores directos
   - Si funciona, el problema es con las variables de entorno

3. **Verifica la plantilla:**
   - Asegúrate de que use las variables correctas: `{{from_name}}`, `{{from_email}}`, `{{message}}`
