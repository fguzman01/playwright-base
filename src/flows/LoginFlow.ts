import { Page } from '@playwright/test';
import { WebUtils } from '../utils/WebUtils';
import { LoginPage } from '../pages/LoginPage';

// Flow base para el proceso de login
export class LoginFlow {
  readonly page: Page;
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  /**
   * Abre la página de login y verifica que esté cargada correctamente
   */
  async openLoginPageAndVerify(): Promise<void> {
    // Navega a la URL base
    await WebUtils.navigateTo(this.page);
    // Verifica que la página de login esté visible
    await this.loginPage.verifyLoginPageIsVisible();
    // Log: flujo completado
    console.log('[FLOW] Login page abierta y verificada');
  }
}
