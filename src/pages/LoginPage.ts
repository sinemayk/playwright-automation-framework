import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.userNameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test = "error"]');
  }
  async open(): Promise<void> {
    await this.goto(process.env.BASE_URL ?? "https://www.saucedemo.com");
  }
  async login(username: string, password: string): Promise<void> {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectErrorVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
}
