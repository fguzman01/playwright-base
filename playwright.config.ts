import { defineConfig, devices } from '@playwright/test';
// Importa la configuración de entorno personalizada
import { ENV } from './src/config/env.config';

// Configuración principal de Playwright
export default defineConfig({
  // Ruta donde se encuentran los tests
  testDir: 'src/tests',

  // Timeout global para cada test
  timeout: ENV.defaultTimeout,

  // Número de reintentos si una prueba falla
  retries: 0,

  // Reporters para mostrar resultados y generar reportes Allure
  reporter: [['list'], ['allure-playwright']],

  // Configuración global para todos los tests
  use: {
    baseURL: ENV.baseUrl, // URL base tomada de la configuración personalizada
    trace: 'on-first-retry', // Trazas solo en el primer reintento
  },

  // Proyectos para ejecutar pruebas en diferentes navegadores
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Puedes habilitar otros navegadores si lo necesitas
    /*{
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],
});
