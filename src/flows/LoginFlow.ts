import { Page } from '@playwright/test';
import { WebUtils } from '../utils/WebUtils';
import { LoginPage } from '../pages/LoginPage';
import { step, attachment } from "allure-js-commons";

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
}
