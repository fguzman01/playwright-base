// Clase que representa la página de login de SauceDemo
import { Page, Locator, expect } from '@playwright/test';
import { WebUtils } from '../utils/WebUtils';

export class LoginPage {

  
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.title = page.getByText('Swag Labs');
  }

  /**
   * Verifica que la página de login esté visible esperando los elementos clave
   */
  public async verifyLoginPageIsVisible(): Promise<void> {
    // Log: inicio de verificación
    console.log('[LOGIN] Verificando carga del login page');
    // Espera que los elementos principales estén visibles
    await WebUtils.waitForElement(this.page, this.usernameInput, 5000);
    await WebUtils.waitForElement(this.page, this.passwordInput, 5000);
    await WebUtils.waitForElement(this.page, this.loginButton, 5000);
    await WebUtils.waitForElement(this.page, this.title, 5000);
    await expect(this.title).toBeVisible();
    // Log: página cargada correctamente
    console.log('[LOGIN ✅] Página de login cargada correctamente');
  }

  /**
   * Ingresa el nombre de usuario en el campo correspondiente
   * @param username Nombre de usuario a ingresar
   */
  public async fillUsername(username: string): Promise<void> {
    console.log(`[LOGIN] Llenando campo usuario con: ${username}`);
    try {
      await WebUtils.fillInput(this.page, this.usernameInput, username);
    } catch (error) {
      console.error(`[LOGIN ❌] Error al llenar el campo usuario: ${error}`);
      throw new Error(`[LOGIN ❌] Error al llenar el campo usuario: ${error}`);
    }
  }

  /**
   * Ingresa la contraseña en el campo correspondiente
   * @param password Contraseña a ingresar
   */
  public async fillPassword(password: string): Promise<void> {
    console.log(`[LOGIN] Llenando campo contraseña.`);
    try {
      await WebUtils.fillInput(this.page, this.passwordInput, password);
    } catch (error) {
      console.error(`[LOGIN ❌] Error al llenar el campo contraseña: ${error}`)
      throw new Error(`[LOGIN ❌] Error al llenar el campo contraseña: ${error}`);
    }
  }

   /**
   * Hace clic en el botón de login de forma segura
   */
  public async clickLoginButton(): Promise<void> {
    // Log: inicio del clic
    console.log('[LOGIN] Haciendo clic en el botón de login');
    try {
      await WebUtils.safeClick(this.page, this.loginButton);
      // Log: clic exitoso
      console.log('[LOGIN ✅] Clic en botón de login exitoso');
    } catch (error) {
      // Log: error en el clic
      console.error('[LOGIN ❌] Error al hacer clic en el botón de login:', error);
      throw new Error('[LOGIN ❌] Falló el clic en el botón de login.');
    }
  }

  /**
   * Verifica si aparece el mensaje de error tras un login fallido, comparando contra el mensaje esperado
   * @param expectedMessage Mensaje de error esperado (de data/test)
   * @throws Error si el mensaje no coincide o no aparece
   * Nota: Para login exitoso no se llama este método
   */
  public async verifyLoginErrorMessage(expectedMessage: string): Promise<void> {
    const errorMessage = this.page.locator('[data-test="error"]');
    try {
      // Espera que el mensaje de error esté visible
      await WebUtils.waitForElement(this.page, errorMessage, 5000);
      // Obtiene el texto real del mensaje
      const actualText = (await errorMessage.innerText()).trim();
      // Compara el texto real contra el esperado
      if (actualText.includes(expectedMessage.trim())) {
        console.log('[LOGIN ✅] Mensaje de error detectado correctamente');
      } else {
        throw new Error(`Texto de error no coincide. Esperado: '${expectedMessage}', Obtenido: '${actualText}'`);
      }
    } catch (error) {
      console.error('[LOGIN ❌] Error al validar mensaje de error de login:', error);
      throw new Error(`[LOGIN ❌] Falló la validación del mensaje de error de login. Detalle: ${error}`);
    }
  }

  


}
