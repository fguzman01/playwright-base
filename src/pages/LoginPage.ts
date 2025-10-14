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

  


}
