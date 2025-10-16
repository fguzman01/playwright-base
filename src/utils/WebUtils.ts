import { Page, Locator } from '@playwright/test';
import { ENV } from '../config/env.config';

export class WebUtils {

  /**
   * Realiza un clic seguro en un elemento, esperando visibilidad y logueando
   * @param page Instancia de Playwright Page
   * @param locator Locator del elemento a hacer clic
   * @param timeoutMs Tiempo máximo de espera en ms (opcional)
   */
  static async safeClick(page: Page, locator: Locator, timeoutMs?: number): Promise<void> {
    // Log: inicio del clic
    console.log(`[CLICK] Intentando hacer clic en: ${locator}`);
    try {
      // Espera a que el elemento sea visible
      await WebUtils.waitForElement(page, locator, timeoutMs);
      // Realiza el clic
      await locator.click();
      // Log: éxito
      console.log(`[CLICK ✅] Clic realizado en: ${locator}`);
    } catch (error) {
      // Log: error
      console.error(`[CLICK ❌] Error al hacer clic en: ${locator}`);
      throw new Error(`No se pudo hacer clic en el elemento '${locator}'. Detalle: ${error}`);
    }
  }
  /**
   * Rellena un campo de texto de forma segura, esperando visibilidad y con logs
   * @param page Instancia de Playwright Page
   * @param locator Locator del input a rellenar
   * @param value Valor a ingresar
   * @param clearFirst Si true, limpia el campo antes de escribir (default: true)
   * @param timeoutMs Tiempo máximo de espera en ms (opcional)
   */
  static async fillInput(page: Page, locator: Locator, value: string, clearFirst: boolean = true, timeoutMs?: number): Promise<void> {
    // Log: inicio del llenado
    console.log(`[FILL] Rellenando campo: ${locator} con valor: "${value}"`);
    try {
      // Espera a que el input sea visible
      await WebUtils.waitForElement(page, locator, timeoutMs);
      // Limpia el campo si se indica
      if (clearFirst) {
        await locator.fill('');
      }
      // Ingresa el valor
      await locator.fill(value);
      // Log: éxito
      console.log(`[FILL ✅] Campo rellenado: ${locator} con valor: "${value}"`);
    } catch (error) {
      // Log: error
      console.log(`[FILL ❌] Error al rellenar el campo: ${locator} con valor: "${value}"`);
      throw new Error(`No se pudo rellenar el campo '${locator}' con valor '${value}'. Detalle: ${error}`);
    }
  }
  
  
  
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
      await page.waitForLoadState('networkidle');
      console.log(`[NAVIGATE ✅] Página cargada correctamente`);
    } catch (error) {
      console.error(error);
      throw new Error(`[NAVIGATE ❌] Error al abrir la URL: ${url}`);
    }
  }
}
