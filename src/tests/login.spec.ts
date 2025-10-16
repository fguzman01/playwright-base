import { test } from '@playwright/test';
import { LoginFlow } from '../flows/LoginFlow';
import { LoginDataProvider } from '../data/providers/loginDataProvider';
import "../hooks/globalHooks";
import { step, attachment } from "allure-js-commons";


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


// Test para validar el ingreso de credenciales usando datos del provider
test('Login - Ingreso de credenciales desde data', async () => {
  await step('Flujo de ingreso de credenciales desde data', async () => {
    console.log('[TEST] Iniciando prueba de login con datos del provider');
    
    // Obtiene un usuario válido desde el provider
    const user = LoginDataProvider.getUserByType('valid');
    
    // Abre la página de login y verifica que los elementos estén visibles
    await loginFlow.openLoginPageAndVerify();
    
    // Ingresa las credenciales usando el flujo
    await loginFlow.performLogin(user.username, user.password);

    // Verifica que el login fue exitoso
    await loginFlow.verifyLoginSuccess();

    // Log: credenciales ingresadas correctamente
    console.log('[TEST ✅] Credenciales ingresadas correctamente');
  });
});

// Test para validar el login fallido con credenciales inválidas
test('Login - Credenciales inválidas muestra mensaje de error', async () => {
  await step('Flujo de login fallido con credenciales inválidas', async () => {
    // Log: inicio de la prueba
    console.log('[TEST] Iniciando prueba de login con credenciales inválidas');

    // Obtiene un usuario inválido desde el provider
    const user = LoginDataProvider.getUserByType('invalid');
    // Log: muestra el mensaje esperado para depuración
    console.log(`[TEST] Mensaje esperado: ${user.expectedError}`);

    // Abre la página de login y verifica que los elementos estén visibles
    await loginFlow.openLoginPageAndVerify();

    // Intenta iniciar sesión con credenciales inválidas
    await loginFlow.performLogin(user.username, user.password);

    // Verifica que se muestre el mensaje de error esperado
    await loginFlow.verifyLoginFailed(user.expectedError);

    // Log: verificación exitosa
    console.log('[TEST ✅] Login fallido verificado correctamente (mensaje de error mostrado)');
    // (Preparado para agregar más steps de Allure en el futuro)
  });
});





