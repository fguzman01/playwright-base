import { Page } from '@playwright/test';
import { WebUtils } from '../utils/WebUtils';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { step, attachment } from "allure-js-commons";

// Flow base para el proceso de login
export class LoginFlow {

  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly productsPage: ProductsPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.productsPage = new ProductsPage(page);
  }

  /**
 * Abre la página de login y verifica que esté cargada correctamente
 */
async openLoginPageAndVerify(): Promise<void> {
  await step("Abrir la página de login", async () => {
    await WebUtils.navigateTo(this.page);
  });

  await step("Verificar que la página de login esté visible", async () => {
    await this.loginPage.verifyLoginPageIsVisible();
    const screenshot = await this.page.screenshot();
    await attachment("Carga correcta de la pagina", screenshot, "image/png");
  });

  console.log('[FLOW] Login page abierta y verificada');
}


  /**
   * Realiza el llenado de credenciales y el clic en el botón de login
   * @param username Nombre de usuario
   * @param password Contraseña
   */
  async performLogin(username: string, password: string): Promise<void> {
    // Log: inicio del flujo de login
    console.log(`[FLOW] Realizando login con usuario: ${username}`);
    try {
      // Paso Allure: ingresar nombre de usuario
      await step('Ingresar nombre de usuario', async () => {
        await this.loginPage.fillUsername(username);
      });
      // Paso Allure: ingresar contraseña
      await step('Ingresar contraseña', async () => {
        await this.loginPage.fillPassword(password);
      });
      // Log: credenciales ingresadas correctamente
      console.log('[FLOW ✅] Credenciales ingresadas correctamente');
      // Paso Allure: hacer clic en el botón de login
      await step('Hacer clic en el botón de login', async () => {
        await this.loginPage.clickLoginButton();
      });
      // Log: clic realizado correctamente
      console.log('[FLOW ✅] Clic en botón de login realizado correctamente');
    } catch (error) {
      // Log: error en el flujo de login
      console.error('[FLOW ❌] Error durante el llenado de credenciales:', error);
      throw new Error('[FLOW ❌] Falló el llenado de credenciales del login.');
    }
  }


  /**
   * Valida el éxito del login verificando la carga de la página de productos
   */
  async verifyLoginSuccess(): Promise<void> {
    // Log: inicio de la verificación post-login
    console.log('[FLOW] Verificando login exitoso');
    try {
      // Verifica que la página de productos esté visible
      await this.productsPage.verifyProductsPageIsVisible();
      // Log: verificación exitosa
      console.log('[FLOW ✅] Login verificado correctamente: página de productos visible');
    } catch (error) {
      // Log: error en la verificación post-login
      console.error(`[FLOW ❌] Error al verificar el login: ${error}`);
      throw new Error('[FLOW ❌] Falló la validación post-login.');
    }
  }


  /**
   * Valida que el login haya fallado verificando el mensaje de error en la página de login
   */
  async verifyLoginFailed(expectedMessage: string): Promise<void> {
    // Log: inicio de la verificación de login fallido
    console.log('[FLOW] Verificando login fallido');
    try {
      await this.loginPage.verifyLoginErrorMessage(expectedMessage);
      // Log: verificación exitosa
      console.log('[FLOW ✅] Login fallido verificado correctamente (mensaje de error detectado)');
    } catch (error) {
      // Log: error en la verificación de login fallido
      console.error(`[FLOW ❌] Error al verificar el login fallido: ${error}`);
      throw new Error('[FLOW ❌] Falló la validación del login fallido.');
    }
  }
}
