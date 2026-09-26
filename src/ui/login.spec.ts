import { test } from "../../src/fixtures/page-fixtures";
import { invalidLoginCases } from "../test-data/login-cases";

test.describe("Login", () => {
  test("gecerli kullanici ile giris yapar ve ürün listesini gorur", async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(
      process.env.SAUCE_USERNAME!,
      process.env.SAUCE_PASSWORD!
    );
    await inventoryPage.expectItemCount(6);
  });

  for(const {username, password, label} of invalidLoginCases){
  test(`basarisiz giris: ${label}`, async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(username, password);
    await loginPage.expectErrorVisible();
  });
}
});