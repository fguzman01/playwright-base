import { test } from "@playwright/test";
import { attachment } from "allure-js-commons";

/**
 * Hook global: captura automáticamente una screenshot cuando un test falla
 */
test.afterEach(async ({ page }, testInfo) => {
  // Solo captura si el test falla
  if (testInfo.status !== testInfo.expectedStatus) {
    try {
      const screenshot = await page.screenshot();
      await attachment(
        `Error Screenshot - ${testInfo.title}`,
        screenshot,
        "image/png"
      );
      console.log(`[ALLURE] 📸 Screenshot capturada por fallo: ${testInfo.title}`);
    } catch (error) {
      console.error("[ALLURE ❌] Error al capturar screenshot global:", error);
    }
  }
});
