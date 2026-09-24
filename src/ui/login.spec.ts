import { test } from "../../src/fixtures/page-fixtures";

test.describe("Login", () => {
  test("gecerli kullanici ile giris yapar ve urun listesini gorur", async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(
      process.env.SAUCE_USERNAME!,
      process.env.SAUCE_PASSWORD!
    );
    await inventoryPage.expectItemCount(6);
  });

  test("gecersiz sifre ile hata mesaji gorunur", async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(process.env.SAUCE_USERNAME!, "yanlis_sifre");
    await loginPage.expectErrorVisible();
  });
});