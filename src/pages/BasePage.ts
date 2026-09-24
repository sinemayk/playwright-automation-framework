import { Page } from "@playwright/test";
export class BasePage {
    //you can reach this parameter from here or any class extenden from BasePage
  constructor(protected page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: "domcontentloaded" });
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
