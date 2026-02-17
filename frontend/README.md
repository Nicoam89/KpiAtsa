# 📊 KpiAtsa

**KpiAtsa** es una aplicación web full-stack para gestión y visualización de KPIs (Indicadores Clave de Rendimiento) construida con el stack **MERN** y desplegada en **Vercel**, con autenticación y servicios adicionales provistos por **Firebase**.

---

## 🧠 Tecnologías

Esta aplicación utiliza las siguientes tecnologías:

| Capa | Tecnología |
|------|------------|
| Frontend | React |
| Backend | Node.js + Express |
| Base de datos | MongoDB |
| Autenticación y servicios | Firebase (Auth, Firestore/Realtime) |
| Despliegue | Vercel |
| Lenguaje principal | JavaScript |

---

## 🚀 Características principales

✔ Gestión de KPIs  
✔ Registro y login de usuarios (Firebase Auth)  
✔ Dashboard interactivo  
✔ API REST construida con Express  
✔ UI responsiva y amigable  
✔ Despliegue automático mediante Vercel

---

## 🧱 Estructura del proyecto

KpiAtsa/
├─ backend/ # API de Node + Express
├─ frontend/ # React app
├─ .gitignore
├─ package.json
└─ vercel.json # Configuración de despliegue en Vercel


---

## 🛠️ Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Nicoam89/KpiAtsa.git
cd KpiAtsa

2. Instalar dependencias
Backend

cd backend
npm install

Frontend

cd ../frontend
npm install

3. Variables de entorno

Crea un archivo .env en /backend y /frontend con tus variables:

Backend (/backend/.env)

PORT=5000
MONGO_URI=tu_mongodb_uri

Frontend (/frontend/.env)

REACT_APP_FIREBASE_API_KEY=tu_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...

    Asegúrate de obtener estas configuraciones desde la consola de Firebase.

4. Ejecutar localmente
Backend

npm run dev

Frontend

npm start

La app se ejecutará en:

    Frontend → http://localhost:3000

    Backend → http://localhost:5000

📦 Despliegue

Este proyecto está configurado para desplegar en Vercel:

    Conecta tu repositorio en Vercel.

    Configura las variables de entorno en el panel de Vercel.

    Asegúrate de tener un vercel.json configurado para tus rutas del backend y frontend.

    Cada push a main desplegará automáticamente.

Frontend y API se manejan desde Vercel en un solo proyecto.
🧪 Testing

Actualmente no hay tests automatizados configurados, pero puedes probar manualmente las rutas del API con herramientas como Postman o Insomnia.
🤝 Cómo contribuir

    Haz un fork de este repositorio

    Crea una rama con tu feature (git checkout -b feature/nueva-funcion)

    Haz commit (git commit -m "feat: agregar algo nuevo")

    Push a la rama (git push origin feature/nueva-funcion)

    Crea un Pull Request

📄 Licencia

Este proyecto está abierto bajo la licencia MIT.
🙌 Contacto

📧 Si tenés preguntas o sugerencias, podés contactarme a través de GitHub o a mi mail personal: nico.am89@gmail.com