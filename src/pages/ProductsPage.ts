// Clase que representa la página de productos de SauceDemo
import { Page, Locator, expect } from '@playwright/test';
import { WebUtils } from '../utils/WebUtils';

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    // Locator para el título "Products"
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    // Locator para el icono del carrito
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
  }

  /**
   * Verifica que la página de productos se haya cargado correctamente
   */
  public async verifyProductsPageIsVisible(): Promise<void> {
    try {
      // Espera que el título esté visible
      await WebUtils.waitForElement(this.page, this.title, 5000);
      // Verifica que el texto del título sea "Products"
      const titleText = await this.title.innerText();
      if (titleText.trim() !== 'Products') {
        throw new Error(`Texto de título inesperado: '${titleText}'`);
      }
      // Espera que el icono del carrito esté visible
      await WebUtils.waitForElement(this.page, this.cartIcon, 5000);
      // Valida que la URL sea la esperada
      const url = this.page.url();
      if (!url.includes('/inventory.html')) {
        throw new Error(`URL inesperada: ${url}`);
      }
      // Log: página verificada correctamente
      console.log('[PRODUCTS ✅] Página de productos verificada correctamente');
    } catch (error) {
      // Log: error en la verificación
      console.error('[PRODUCTS ❌] Error al verificar la página de productos:', error);
      throw new Error(`[PRODUCTS ❌] Falló la verificación de la página de productos. Detalle: ${error}`);
    }
  }
}
