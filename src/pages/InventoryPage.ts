import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryItems = page.locator(".inventory_item");
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.inventoryItems).toHaveCount(count);
  }
}
