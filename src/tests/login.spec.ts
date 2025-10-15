
import { test } from '@playwright/test';
import { LoginFlow } from '../flows/LoginFlow';
import "../hooks/globalHooks";


// Variable para el flujo de login
let loginFlow: LoginFlow;

// beforeEach se ejecuta antes de cada test para inicializar los objetos comunes
test.beforeEach(async ({ page }) => {
  loginFlow = new LoginFlow(page);
});

// Test para validar que la página de login se carga correctamente
test('La página de login se carga correctamente', async () => {
  // Abre la página de login y verifica que los elementos estén visibles
  await loginFlow.openLoginPageAndVerify();
  // Log: resultado exitoso
  console.log('[TEST] La página de login fue verificada exitosamente');
});
