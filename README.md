# Calculadora de Precios de Teléfonos

Una aplicación web moderna para ayudar a promotores de telefonía celular a calcular precios finales de teléfonos basándose en descuentos por operador.

## 🚀 Características

- **Carga de archivos Excel**: Sube archivos Excel con datos de promociones
- **Vista de modelos**: Lista todos los modelos de teléfonos disponibles
- **Búsqueda**: Filtra modelos por nombre
- **Vistas múltiples**: Modo lista y modo tarjetas
- **Calculadora de precios**: Calcula precios finales automáticamente
- **Interfaz moderna**: Diseño responsive con Tailwind CSS

## 📋 Requisitos

- Node.js 14 o superior
- npm o yarn

## 🛠️ Instalación

1. **Clona el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd irumi-app
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm start
   ```

4. **Abre tu navegador**:
   La aplicación estará disponible en `http://localhost:3000`

## 📊 Formato del Archivo Excel

El archivo Excel debe contener las siguientes columnas:

| Columna | Descripción | Ejemplo |
|---------|-------------|---------|
| INICIO | Fecha de inicio de la promoción | 1-ago |
| FIN | Fecha de fin de la promoción | 31-ago |
| OPERADOR | Nombre del operador | WOM, CLARO, ENTEL |
| SKU PLAN | Código SKU del plan | 225005999 |
| DESCRIPCION PLAN | Descripción del plan | PLAN MSM HONOR 400 512 WOM |
| DTO. | Descuento en dinero | 180.000 |
| MARCA | Marca del teléfono | HONOR |
| EQUIPO | Modelo del teléfono | HONOR 400 512GB |

## 🎯 Cómo Usar

### 1. Cargar Datos
- Al abrir la aplicación, verás la pantalla de carga
- Haz clic en "Seleccionar archivo" y elige tu archivo Excel
- La aplicación procesará automáticamente los datos

### 2. Explorar Modelos
- Una vez cargados los datos, verás la lista de modelos
- Usa la barra de búsqueda para filtrar modelos
- Cambia entre vista de lista y tarjetas con los botones

### 3. Calcular Precios
- Haz clic en cualquier modelo para ver su detalle
- Ingresa el precio base del teléfono
- Selecciona un operador de la lista
- El precio final se calculará automáticamente

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── App.tsx              # Componente principal
│   ├── ExcelUploader.tsx    # Carga de archivos Excel
│   ├── PhoneList.tsx        # Lista de modelos
│   └── PhoneDetail.tsx      # Detalle y calculadora
├── context/
│   └── DataContext.tsx      # Estado global de la aplicación
├── types/
│   └── index.ts             # Definiciones de tipos TypeScript
└── index.css                # Estilos globales
```

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework de JavaScript
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de CSS
- **React Router**: Navegación
- **XLSX**: Procesamiento de archivos Excel
- **Lucide React**: Iconos

## 📝 Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm test`: Ejecuta las pruebas
- `npm run eject`: Expone la configuración de webpack

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

## 🎉 Agradecimientos

- React Team por el framework
- Tailwind CSS por los estilos
- La comunidad de desarrolladores por las librerías utilizadas
