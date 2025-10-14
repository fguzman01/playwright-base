import { Page, Locator } from '@playwright/test';
import { ENV } from '../config/env.config';

export class WebUtils {
  
  
  /**
   * Espera a que un elemento sea visible y lo resalta brevemente.
   * @param page Instancia de Playwright Page
   * @param locator Locator del elemento a esperar
   * @param timeoutMs Tiempo máximo de espera en ms (opcional)
   */
  static async waitForElement(page: Page, locator: Locator, timeoutMs: number = ENV.defaultTimeout): Promise<void> {
    // Log: esperando el elemento
    console.log(`[WAIT] Esperando elemento: ${locator} (timeout: ${timeoutMs ?? 'default'}ms)`);
    try {
      await locator.waitFor({ state: 'visible', timeout: timeoutMs });
      // Log: elemento visible
      console.log(`[WAIT ✅] Elemento visible: ${locator}`);
      // Resalta el elemento cambiando el fondo a amarillo brevemente
      const handle = await locator.elementHandle();
      if (handle) {
        await page.evaluate((el) => {
          if (!el) return;
          const original = el.style.backgroundColor;
          el.style.backgroundColor = 'yellow';
          setTimeout(() => { el.style.backgroundColor = original; }, 500);
        }, handle);
      }
    } catch (error) {
      // Log: error al esperar el elemento
      console.log(`[WAIT ❌] No se encontró el elemento: ${locator} (timeout: ${timeoutMs ?? 'default'}ms)`);
      throw new Error(`No se encontró el elemento '${locator}' visible tras ${timeoutMs ?? 'default'} ms.`);
    }
  }


  /**
   * Navega a una URL usando la baseUrl definida en ENV y un path opcional
   * @param page Instancia de Playwright Page
   * @param path Path adicional a la baseUrl (opcional)
   */
  static async navigateTo(page: Page, path?: string): Promise<void> {
    // Construye la URL completa
    const url = path ? `${ENV.baseUrl}${path}` : ENV.baseUrl;
    // Log: mostrando la URL que se va a abrir
    console.log(`[NAVIGATE] Abriendo URL: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
    } catch (error) {
      throw new Error(`[NAVIGATE ❌] Error al abrir la URL: ${url}`);
    }
  }
}
